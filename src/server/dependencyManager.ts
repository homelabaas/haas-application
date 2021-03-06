import * as bunyan from "bunyan";
import * as config from "config";
import * as Docker from "dockerode";
import * as http from "http";
import * as pg from "pg";
import { IApplicationSettings } from "../common/models/IApplicationSettings";
import { IMiniDNSSettings } from "../common/models/IMiniDNSSettings";
import { IMinioSettings } from "../common/models/IMinioSettings";
import { IStatus } from "../common/models/IStatus";
import { IVCenterSettings } from "../common/models/IVcenterSettings";
import { BuildThread, IBuildContainerDefinition } from "./builder/buildThread";
import { EnvironmentMonitor } from "./builder/environmentMonitor";
import { SgMonitor } from "./builder/sgMonitor";
import { VmCleanupManager } from "./builder/vmCleanupManager";
import { VmManager } from "./builder/vmManager";
import { VmProvisionMonitor } from "./builder/vmProvisionMonitor";
import { VmTerminateMonitor } from "./builder/vmTerminateMonitor";
import { sequelize } from "./data";
import { PostgresStore } from "./data/postgresStore";
import { DefaultApi, Zone } from "./dns/api";
import { isTestApiMode } from "./runtimeModes";
import { SocketManager } from "./socketio/socketManager";
import { MinioManager } from "./utils/minioManager";
import { FakeVCenter } from "./vmware/fakeVcenter";
import { IVcenter } from "./vmware/IVcenter";
import { VMWare } from "./vmware/vmware";

export interface ISettings {
    VCenterSettings?: IVCenterSettings;
    MiniDnsSettings?: IMiniDNSSettings;
    ApplicationSettings?: IApplicationSettings;
    MinioSettings?: IMinioSettings;
}

export interface IDockerAuth {
    username: string;
    password: string;
    serveraddress: string;
}

const VCenterSettingsKey: string = "vcenter";
const MiniDNSSettingsKey: string = "minidns";
const ApplicationSettingsKey: string = "application";
const MinioSettingsKey: string = "minio";

class DependencyManager {

    public PostgresStore: PostgresStore;
    public SocketManager: SocketManager;
    public VMManager: VmManager;
    public Settings: ISettings;
    public ServerStatus: IStatus;
    public VCenter: IVcenter;
    public Docker: Docker;
    public BuildThread: BuildThread;
    public VmProvisionMonitor: VmProvisionMonitor;
    public VmTerminateMonitor: VmTerminateMonitor;
    public EnvironmentMonitor: EnvironmentMonitor;
    public VmCleanupManager: VmCleanupManager;
    public LogFolder: string;
    public Logger: bunyan;
    public DockerAuth: IDockerAuth;
    public Minio: MinioManager;
    public SgMonitor: SgMonitor;
    public FirstRun: boolean;
    public MiniDNS: DefaultApi;

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
            MiniDNS: false,
            PostgresConnected: false,
            VmProvisionManager: false,
            VmTerminateManager: false,
            SgManager: false,
            EnvironmentManager: false,
            VmCleanupManager: false
        };
        this.Settings = {};
        this.PostgresStore = new PostgresStore();
        this.SocketManager = new SocketManager(server, this.LogFolder);
        this.VMManager = new VmManager(this.SocketManager, this.Logger, this.PostgresStore);
        if (isTestApiMode) {
            this.VCenter = new FakeVCenter();
        } else {
            this.VCenter = new VMWare();
        }

        await this.InitPostgres();

        if (this.ServerStatus.PostgresConnected) {
            const vcenterSettings = await this.PostgresStore.GetSettings(VCenterSettingsKey) as IVCenterSettings;
            const miniDnsSettings = await this.PostgresStore.GetSettings(MiniDNSSettingsKey) as IMiniDNSSettings;
            const applicationSettings = await
                this.PostgresStore.GetSettings(ApplicationSettingsKey) as IApplicationSettings;
            const minioSettings = await this.PostgresStore.GetSettings(MinioSettingsKey) as IMinioSettings;
            this.Settings = {
                VCenterSettings: vcenterSettings,
                MiniDnsSettings: miniDnsSettings,
                ApplicationSettings: applicationSettings,
                MinioSettings: minioSettings
            };
            if (vcenterSettings) {
                await this.InitVCenter(vcenterSettings);
            }
            if (miniDnsSettings) {
                await this.InitMiniDNS(miniDnsSettings);
            }
            if (minioSettings) {
                await this.InitMinio(minioSettings);
            }
        }

        this.SocketManager.Initialize();
        await this.InitDocker();
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

    public SetMinioSettings = async (minioSettings: IMinioSettings) => {
        this.Settings.MinioSettings = minioSettings;
    }

    public SetMiniDnsSettings = async (miniDnsSettings: IMiniDNSSettings) => {
        this.Settings.MiniDnsSettings = miniDnsSettings;
    }

    public SetApplicationSettings = async (applicationSettings: IApplicationSettings) => {
        this.Settings.ApplicationSettings = applicationSettings;
    }

    public GetStatus = (): IStatus => {
        return this.ServerStatus;
    }

    public InitMiniDNS = async (miniDnsSettings: IMiniDNSSettings, rethrowException: boolean = false) => {
        try {
            // Attempt to connect and call
            this.MiniDNS = new DefaultApi(miniDnsSettings.url);
            let foundDomain = false;
            const { response, body } = await this.MiniDNS.getAllZones();
            (body as Zone[]).forEach((p) => {
                if (p.name === miniDnsSettings.defaultDomain) {
                    foundDomain = true;
                }
            });
            if (!foundDomain) {
                await this.MiniDNS.addZone({
                    TTL: 60,
                    adminEmail: "test@test.com",
                    name: miniDnsSettings.defaultDomain,
                    nsaddress: miniDnsSettings.address
                });
            }
            this.ServerStatus.MiniDNS = true;
        } catch (err) {
            this.Logger.error("Error connecting to MiniDNS.");
            this.Logger.error(err);
            this.ServerStatus.MiniDNS = false;
            if (rethrowException) {
                throw err;
            }
        }
    }

    public InitMinio = async (minioSettings: IMinioSettings, rethrowException: boolean = false) => {
        try {
            this.Minio = new MinioManager(minioSettings, this.PostgresStore,
                this.Logger, this.Settings.MinioSettings.ContentBucket);
            await this.Minio.SetUpEventRegistration();
            this.ServerStatus.MinioConnected = true;
            const bucketOk = await this.Minio.MinioClient.bucketExists(this.Settings.MinioSettings.ContentBucket);
            this.Logger.info("Successfully connected to minio.");
            if (bucketOk) {
                this.ServerStatus.MinioBucketExists = true;
                this.Logger.info(
                    `Minio bucket ${this.Settings.MinioSettings.ContentBucket} exists. Loading .builder.yml files.`);
                await this.Minio.ReloadBuilderYamlFiles();
            } else {
                this.Logger.error(`Minio bucket ${this.Settings.MinioSettings.ContentBucket} does not exist.`);
                this.ServerStatus.MinioBucketExists = false;
            }
        } catch (err) {
            this.Logger.error("Error connecting to minio.");
            this.Logger.error(err);
            this.ServerStatus.MinioConnected = false;
            if (rethrowException) {
                throw err;
            }
        }
    }

    public InitManagers = async () => {
        if (this.ServerStatus.MinioConnected && this.ServerStatus.PostgresConnected
          && this.ServerStatus.VcenterConnected) {
            if (!this.ServerStatus.VmProvisionManager) {
                this.VmProvisionMonitor = new VmProvisionMonitor(
                    this.PostgresStore,
                    this.SocketManager,
                    this.Logger,
                    this.Settings.MinioSettings,
                    this.VMManager
                );
                this.ServerStatus.VmProvisionManager = true;
                setTimeout(() => { this.VmProvisionMonitor.Run(); }, 10000);
                this.Logger.info("VM Provision Manager polling every 10 seconds.");
            }
            if (!this.ServerStatus.VmTerminateManager) {
                this.VmTerminateMonitor = new VmTerminateMonitor(
                    this.PostgresStore,
                    this.SocketManager,
                    this.Logger,
                    this.VMManager
                );
                setTimeout(() => { this.VmTerminateMonitor.Run(); }, 11000);
                this.ServerStatus.VmTerminateManager = true;
                this.Logger.info("VM Termination Manager polling every 11 seconds.");
            }
            if (!this.ServerStatus.VmCleanupManager) {
                this.VmCleanupManager = new VmCleanupManager(
                    this.PostgresStore,
                    this.SocketManager,
                    this.Logger,
                    this.VMManager
                );
                setTimeout(() => { this.VmCleanupManager.Run(); }, 60000);
                this.ServerStatus.VmCleanupManager = true;
                this.Logger.info("VM Cleanup Manager polling every 1 minute.");
            }
            if (!this.ServerStatus.SgManager) {
                this.SgMonitor = new SgMonitor(
                    this.PostgresStore,
                    this.SocketManager,
                    this.Logger
                );
                setTimeout(() => { this.SgMonitor.Run(); }, 12000);
                this.ServerStatus.SgManager = true;
                this.Logger.info("Scaling Group Manager polling every 12 seconds.");
            }
            if (!this.ServerStatus.EnvironmentManager) {
                this.EnvironmentMonitor = new EnvironmentMonitor(
                    this.PostgresStore,
                    this.SocketManager,
                    this.Minio,
                    this.Settings.MinioSettings,
                    this.Logger
                );
                setTimeout(() => { this.EnvironmentMonitor.Run(); }, 13000);
                this.ServerStatus.EnvironmentManager = true;
                this.Logger.info("Environment Manager polling every 13 seconds.");
            }
            if (!this.ServerStatus.BuilderThreadRunning) {
                if (this.ServerStatus.DockerConnected) {
                    const containers = config.get<IBuildContainerDefinition[]>("Containers");
                    this.BuildThread = new BuildThread(this.Docker,
                        this.PostgresStore,
                        this.LogFolder,
                        containers,
                        this.DockerAuth,
                        this.Settings.MinioSettings,
                        this.SocketManager,
                        config.get<string>("Docker.Socket"));
                    this.ServerStatus.BuilderThreadRunning = true;
                    setTimeout(() => { this.BuildThread.Run(); }, 10000);
                    this.Logger.info("VM Builder polling every 10 seconds.");
                }
            }
        }
    }

    private InitPostgres = async () => {

        const database = config.get<string>("Database.DbName");
        const connectionString = config.get<string>("Database.ConnectionString");

        try {
            // Create the database automatically if it doesn't exist
            const client = new pg.Client(connectionString + "postgres");
            await client.connect();
            try {
                await client.query(`CREATE DATABASE ${database}`);
            } catch (err) {
                // ignore the error if the database already exists
            }
            await client.end();
            // Only force sync when we are running the api test suite
            const forceSync = isTestApiMode;
            await sequelize(connectionString + database, this.LogFolder).sync({force: forceSync});
            this.ServerStatus.PostgresConnected = true;
        } catch (err) {
            this.ServerStatus.PostgresConnected = false;
            this.Logger.error("Error connecting to postgres.");
            this.Logger.error(err);
        }
    }

    private CheckDockerAuth = async () => {
        if (config.has("Docker.AuthUsername") && config.has("Docker.AuthPassword")
          && config.has("Docker.AuthRegistry")) {
            try {
                this.DockerAuth = {
                    username: config.get<string>("Docker.AuthUsername"),
                    password: config.get<string>("Docker.AuthPassword"),
                    serveraddress: config.get<string>("Docker.AuthRegistry"),
                };
                const authAttempt = await this.Docker.checkAuth(this.DockerAuth);
                this.ServerStatus.DockerRegistryAuth = true;
            } catch (e) {
                this.ServerStatus.DockerRegistryAuth = false;
            }
        } else {
            this.Logger.info("No docker registry authentication specified. Not attempting to validate.");
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
            } else if (config.get<string>("Docker.ConnectionType") === "http") {
                const dockerHost = config.get<string>("Docker.Host");
                const dockerPort = config.get<number>("Docker.Port");
                this.Docker = new Docker({ host: dockerHost, port: dockerPort });
            }
            const dockerList = await this.Docker.listContainers();
            this.ServerStatus.DockerConnected = true;
            await this.CheckDockerAuth();
        } catch (err) {
            this.Logger.error("Error connecting to docker.");
            this.Logger.error(err);
        }
    }

    private InitVCenter = async (settings: IVCenterSettings) => {
        try {
            await this.VCenter.Connect(settings.URL, settings.Username, settings.Password);
            // relog back in every 30 minutes as the session will expire
            setInterval(async () => {
                try {
                    try {
                        await this.VCenter.Disconnect();
                    } catch (e) {
                        // We can ignore errors when disconnecting.
                        this.Logger.warn(e);
                    }
                    await this.VCenter.Connect(settings.URL, settings.Username, settings.Password);
                    this.ServerStatus.VcenterConnected = true;
                } catch (e) {
                    this.Logger.error("Error re-logging back into vcenter.");
                    this.Logger.error(e);
                    this.ServerStatus.VcenterConnected = false;
                }
            }, 30 * 60 * 1000);
            this.ServerStatus.VcenterConnected = true;
        } catch (err) {
            this.Logger.error("Error connecting to vcenter.");
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
