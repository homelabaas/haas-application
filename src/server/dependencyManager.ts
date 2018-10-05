import * as bunyan from "bunyan";
import * as config from "config";
import * as Docker from "dockerode";
import * as http from "http";
import * as pg from "pg";
import { IApplicationSettings } from "../common/models/IApplicationSettings";
import { IPowerDnsSettings } from "../common/models/IPowerDnsSettings";
import { IStatus } from "../common/models/IStatus";
import { IVCenterSettings } from "../common/models/IVcenterSettings";
import { BuildThread, IBuildContainerDefinition } from "./builder/buildThread";
import { EnvironmentMonitor } from "./builder/environmentMonitor";
import { SgMonitor } from "./builder/sgMonitor";
import { VmProvisionMonitor } from "./builder/vmProvisionMonitor";
import { VmTerminateMonitor } from "./builder/vmTerminateMonitor";
import { sequelize } from "./data";
import { PostgresStore } from "./data/postgresStore";
import { FakePowerdns } from "./dns/FakePowerdns";
import { IPowerDNS } from "./dns/IPowerDns";
import { PowerDNS } from "./dns/powerdns";
import { isTestApiMode } from "./runtimeModes";
import { SocketManager } from "./socketio/socketManager";
import { MinioManager } from "./utils/minioManager";
import { FakeVCenter } from "./vmware/fakeVcenter";
import { IVcenter } from "./vmware/IVcenter";
import { VMWare } from "./vmware/vmware";

export interface ISettings {
    VCenterSettings?: IVCenterSettings;
    PowerDnsSettings?: IPowerDnsSettings;
    ApplicationSettings?: IApplicationSettings;
}

export interface IDockerAuth {
    username: string;
    password: string;
    serveraddress: string;
}

export interface IMinioConfig {
    URL: string;
    AccessKey: string;
    SecretKey: string;
    ContentBucket: string;
    Port: number;
    Secure: boolean;
}
const VCenterSettingsKey: string = "vcenter";
const PowerDNSSettingsKey: string = "powerdns";
const ApplicationSettingsKey: string = "application";

class DependencyManager {

    public PostgresStore: PostgresStore;
    public SocketManager: SocketManager;
    public Settings: ISettings;
    public ServerStatus: IStatus;
    public VCenter: IVcenter;
    public Docker: Docker;
    public BuildThread: BuildThread;
    public VmProvisionMonitor: VmProvisionMonitor;
    public VmTerminateMonitor: VmTerminateMonitor;
    public EnvironmentMonitor: EnvironmentMonitor;
    public LogFolder: string;
    public Logger: bunyan;
    public DockerAuth: IDockerAuth;
    public Minio: MinioManager;
    public MinioConfig: IMinioConfig;
    public PowerDNS: IPowerDNS;
    public SgMonitor: SgMonitor;
    public FirstRun: boolean;

    public Initialise = async (server: http.Server,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
        this.FirstRun = firstRun;
        this.Logger = logger;
        this.LogFolder = logFilePath;
        this.ServerStatus = {
            VcenterConnected: false,
            DockerConnected: false,
            DockerRegistryAuth: false,
            MinioBucketExists: false,
            MinioConnected: false,
            BuilderThreadRunning: false,
            PowerDNS: false,
            PostgresConnected: false,
            VmProvisionManager: false
        };
        this.Settings = {};
        this.PostgresStore = new PostgresStore();
        this.SocketManager = new SocketManager(server, this.LogFolder);
        if (isTestApiMode) {
            this.VCenter = new FakeVCenter();
        } else {
            this.VCenter = new VMWare();
        }

        await this.InitPostgres();

        if (this.ServerStatus.PostgresConnected) {
            const vcenterSettings = await this.PostgresStore.GetSettings(VCenterSettingsKey) as IVCenterSettings;
            const powerDnsSettings = await this.PostgresStore.GetSettings(PowerDNSSettingsKey) as IPowerDnsSettings;
            const applicationSettings = await this.PostgresStore.GetSettings(ApplicationSettingsKey) as IApplicationSettings;
            this.Settings = {
                VCenterSettings: vcenterSettings,
                PowerDnsSettings: powerDnsSettings,
                ApplicationSettings: applicationSettings
            };
            if (vcenterSettings) {
                await this.InitVCenter(vcenterSettings);
            }
            if (powerDnsSettings) {
                await this.InitPowerDNS(powerDnsSettings);
            }
        }

        this.SocketManager.Initialize();
        await this.InitMinio();
        await this.InitDocker();
        await this.InitBuilder();
        await this.InitManagers();
    }

    public ConnectVcenter = async (connectSettings: IVCenterSettings) => {
        if (this.ServerStatus.VcenterConnected) {
            this.VCenter.Disconnect();
        }
        await this.VCenter.Connect(connectSettings.URL, connectSettings.Username, connectSettings.Password);
        this.ServerStatus.VcenterConnected = true;
        this.Settings.VCenterSettings = connectSettings;
    }

    public DisconnectVcenter = async () => {
        if (this.ServerStatus.VcenterConnected) {
            this.VCenter.Disconnect();
            this.ServerStatus.VcenterConnected = false;
        } else {
            throw Error("Vcenter is not connected.");
        }
    }

    public ValidatePowerDnsSettings = async (powerDnsSettings: IPowerDnsSettings) => {
        let powerDnsAttempt: IPowerDNS;
        if (isTestApiMode) {
            powerDnsAttempt = new FakePowerdns(powerDnsSettings.Url, powerDnsSettings.APIKey);
        } else {
            powerDnsAttempt = new PowerDNS(powerDnsSettings.Url, powerDnsSettings.APIKey);
        }
        // Attempt to call power dns.
        await powerDnsAttempt.getZones();
        // If successful, keep the sttings.
        this.PowerDNS = powerDnsAttempt;
        this.ServerStatus.PowerDNS = true;
    }

    public SetPowerDnsSettings = async (powerDnsSettings: IPowerDnsSettings) => {
        this.Settings.PowerDnsSettings = powerDnsSettings;
    }

    public SetApplicationSettings = async (applicationSettings: IApplicationSettings) => {
        this.Settings.ApplicationSettings = applicationSettings;
    }

    public GetStatus = (): IStatus => {
        return this.ServerStatus;
    }

    private InitBuilder = async () => {
        this.ServerStatus.BuilderThreadRunning = false;
        const containers = config.get<IBuildContainerDefinition[]>("Containers");
        if (this.ServerStatus.DockerConnected && this.ServerStatus.MinioConnected &&
            this.ServerStatus.PostgresConnected) {
            this.BuildThread = new BuildThread(this.Docker,
                this.PostgresStore,
                this.LogFolder,
                containers,
                this.DockerAuth,
                this.MinioConfig,
                this.SocketManager,
                config.get<string>("Docker.Socket"));
            this.ServerStatus.BuilderThreadRunning = true;
            setTimeout(() => { this.BuildThread.Run(); }, 10000);
        }
    }

    private InitManagers = async () => {
        this.ServerStatus.VmProvisionManager = false;
        if (this.ServerStatus.MinioConnected && this.ServerStatus.PostgresConnected
          && this.ServerStatus.VcenterConnected) {
            this.VmProvisionMonitor = new VmProvisionMonitor(
                this.PostgresStore,
                this.SocketManager,
                this.Logger,
                this.MinioConfig
            );
            this.ServerStatus.VmProvisionManager = true;
            setTimeout(() => { this.VmProvisionMonitor.Run(); }, 10000);
        }
        if (this.ServerStatus.MinioConnected && this.ServerStatus.PostgresConnected
            && this.ServerStatus.VcenterConnected) {
              this.VmTerminateMonitor = new VmTerminateMonitor(
                  this.PostgresStore,
                  this.SocketManager,
                  this.Logger,
                  this.MinioConfig
              );
              setTimeout(() => { this.VmTerminateMonitor.Run(); }, 11000);
        }
        if (this.ServerStatus.PostgresConnected
            && this.ServerStatus.VcenterConnected) {
              this.SgMonitor = new SgMonitor(
                  this.PostgresStore,
                  this.SocketManager,
                  this.Logger
              );
              setTimeout(() => { this.SgMonitor.Run(); }, 12000);
        }
        if (this.ServerStatus.MinioConnected && this.ServerStatus.PostgresConnected) {
              this.EnvironmentMonitor = new EnvironmentMonitor(
                  this.PostgresStore,
                  this.SocketManager,
                  this.Minio,
                  this.MinioConfig,
                  this.Logger
              );
              setTimeout(() => { this.EnvironmentMonitor.Run(); }, 13000);
        }
    }

    private InitPostgres = async () => {
        const username = config.get<string>("Database.Username");
        const password = config.get<string>("Database.Password");
        const database = config.get<string>("Database.DbName");
        const host = config.get<string>("Database.Host");
        const port = config.get<number>("Database.Port");

        try {
            // Create the database automatically if it doesn't exist
            const conStringPri = "postgres://" + username + ":" + password + "@" + host + ":" + port + "/postgres";
            const client = new pg.Client(conStringPri);
            await client.connect();
            try {
                await client.query(`CREATE DATABASE ${database}`);
            } catch (err) {
                // ignore the error if the database already exists
            }
            await client.end();
            // Only force sync when we are running the api test suite
            const forceSync = isTestApiMode;
            await sequelize(username, password, database, host, port).sync({force: forceSync});
            this.ServerStatus.PostgresConnected = true;
        } catch (err) {
            this.ServerStatus.PostgresConnected = false;
            this.Logger.error("Error connecting to postgres.");
            this.Logger.error(err.message);
            this.Logger.error(err);
        }
    }

    private InitDocker = async () => {
        // Docker
        try {
            this.ServerStatus.DockerConnected = false;
            this.ServerStatus.DockerRegistryAuth = false;

            if (config.get<string>("Docker.ConnectionType") === "socket") {
                const socket = config.get<string>("Docker.Socket");
                this.Docker = new Docker({ socketPath: socket });
                // Run list containers to make sure docker is actually working
                const dockerList = await this.Docker.listContainers();
                this.ServerStatus.DockerConnected = true;
                this.DockerAuth = {
                    username: config.get<string>("Docker.AuthUsername"),
                    password: config.get<string>("Docker.AuthPassword"),
                    serveraddress: config.get<string>("Docker.AuthRegistry"),
                };
                const authAttempt = await this.Docker.checkAuth(this.DockerAuth);
                this.ServerStatus.DockerRegistryAuth = true;
            } else if (config.get<string>("Docker.ConnectionType") === "http") {
                const dockerHost = config.get<string>("Docker.Host");
                const dockerPort = config.get<number>("Docker.Port");
                this.Docker = new Docker({ host: dockerHost, port: dockerPort });
                // Run list containers to make sure docker is actually working
                const dockerList = await this.Docker.listContainers();
                this.ServerStatus.DockerConnected = true;
                this.DockerAuth = {
                    username: config.get<string>("Docker.AuthUsername"),
                    password: config.get<string>("Docker.AuthPassword"),
                    serveraddress: config.get<string>("Docker.AuthRegistry"),
                };
                const authAttempt = await this.Docker.checkAuth(this.DockerAuth);
                this.ServerStatus.DockerRegistryAuth = true;
            }
        } catch (err) {
            this.Logger.error("Error connecting to docker. Build thread will not run.");
            this.Logger.error(err.message);
            this.Logger.error(err);
        }
    }

    private InitPowerDNS = async (powerDnsSettings: IPowerDnsSettings) => {
        try {
            if (isTestApiMode) {
                this.PowerDNS = new FakePowerdns(powerDnsSettings.Url, powerDnsSettings.APIKey);
            } else {
                this.PowerDNS = new PowerDNS(powerDnsSettings.Url, powerDnsSettings.APIKey);
            }
            const zoneList = await this.PowerDNS.getZones();
            this.ServerStatus.PowerDNS = true;
        } catch (err) {
            this.Logger.error("Error connecting to PowerDNS.");
            this.Logger.error(err.message);
            this.Logger.error(err);
            this.ServerStatus.PowerDNS = false;
        }
    }

    private InitMinio = async () => {
        this.MinioConfig = {
            URL: config.get<string>("Minio.URL"),
            AccessKey: config.get<string>("Minio.AccessKey"),
            SecretKey: config.get<string>("Minio.SecretKey"),
            ContentBucket: config.get<string>("Minio.ContentBucket"),
            Port: config.get<number>("Minio.Port"),
            Secure: config.get<boolean>("Minio.Secure")
        };
        try {
            this.Minio = new MinioManager(this.MinioConfig);
            this.ServerStatus.MinioConnected = true;
            this.Logger.info("Successfully connected to minio.");
            const bucketOk = await this.Minio.MinioClient.bucketExists(this.MinioConfig.ContentBucket);
            if (bucketOk) {
                this.ServerStatus.MinioBucketExists = true;
                this.Logger.info(`Minio bucket ${this.MinioConfig.ContentBucket} exists. Loading .builder.yml files.`);
                await this.ReloadBuilderYamlFiles();
            } else {
                this.Logger.error(`Minio bucket ${this.MinioConfig.ContentBucket} does not exist.`);
                this.ServerStatus.MinioBucketExists = false;
            }
        } catch (err) {
            this.Logger.error("Error connecting to minio.");
            this.Logger.error(err.message);
            this.Logger.error(err);
            this.ServerStatus.MinioConnected = false;
        }
    }

    private ReloadBuilderYamlFiles = async () => {
        const buildTypes = await this.Minio.GetMinioBuildTypes(this.MinioConfig.ContentBucket);
        await this.PostgresStore.SaveBuildTypes(buildTypes);
        this.Logger.info("Loaded contents of minio bucket. Total items loaded: "
            + buildTypes.length.toString());
    }

    private InitVCenter = async (settings: IVCenterSettings) => {
        try {
            await this.VCenter.Connect(settings.URL, settings.Username, settings.Password);
            // relog back in every 30 minutes as the session will expire
            setInterval(async () => {
                try {
                    await this.VCenter.Disconnect();
                    await this.VCenter.Connect(settings.URL, settings.Username, settings.Password);
                    this.ServerStatus.VcenterConnected = true;
                } catch (e) {
                    this.Logger.error("Error re-logging back into vcenter.");
                    this.Logger.error(e.message);
                    this.Logger.error(e);
                    this.ServerStatus.VcenterConnected = false;
                }
            }, 30 * 60 * 1000);
            this.ServerStatus.VcenterConnected = true;
        } catch (err) {
            this.Logger.error("Error connecting to vcenter.");
            this.Logger.error(err.message);
            this.Logger.error(err);
            this.ServerStatus.VcenterConnected = false;
        }
    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}
