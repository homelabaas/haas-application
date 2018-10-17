import * as bunyan from "bunyan";
import * as seq from "bunyan-seq";
import * as config from "config";
import * as Docker from "dockerode";
import * as path from "path";
import { IMinioSettings } from "../../common/models/IMinioSettings";
import { FindLastArtifactForBuildConfig } from "../data/artifacts";
import Artifact from "../data/models/Artifact";
import { Dependencies } from "../dependencyManager";
import { isTestApiMode } from "../runtimeModes";
import { SocketManager } from "../socketio/socketManager";
import { DbAppendStderrStream } from "../utils/DbAppendStderrStream";
import { DbAppendStdoutStream } from "../utils/DbAppendStdoutStream";
import { Liner } from "../utils/liner";
import { PullImage } from "../utils/pullDockerImage";
import { BuildItemStatus } from "./../../common/models/BuildItemStatus";
import { IBuildType } from "./../../common/models/IBuildType";
import { PostgresStore } from "./../data/postgresStore";
import { IDockerAuth } from "./../dependencyManager";
import { FakeDocker } from "./fakeDockerRunner";

export interface IBuildContainerDefinition {
    [Type: string]: string;
}

export class BuildThread {
    private Docker: Docker;
    private PostgresStore: PostgresStore;
    private KeepRunning: boolean;
    private Logger: bunyan;
    private LogFolder: string;
    private Containers: IBuildContainerDefinition[];
    private AuthConfig: IDockerAuth;
    private MinioConfig: IMinioSettings;
    private SocketManager: SocketManager;
    private DockerSocket: string;

    constructor(docker: Docker,
                postgresStore: PostgresStore,
                logFolder: string,
                containers: IBuildContainerDefinition[],
                authConfig: IDockerAuth,
                minioConfig: IMinioSettings,
                socketManager: SocketManager,
                dockerSocket: string) {
        this.Docker = docker;
        this.KeepRunning = true;
        this.LogFolder = logFolder;
        this.Containers = containers;
        this.AuthConfig = authConfig;
        this.MinioConfig = minioConfig;
        this.SocketManager = socketManager;
        this.DockerSocket = dockerSocket;
        this.PostgresStore = postgresStore;

        this.Logger = bunyan.createLogger({
            name: "builderthread",
            streams: [
                {
                    level: "info",
                    path: path.join(this.LogFolder, "builderthread.log")
                },
                seq.createStream({serverUrl: config.get("Logfiles.SeqUrl")})
            ]
        });
        this.Logger.info("Inititalise Builder Processor");
    }

    public Run = () => {
        this.CheckBuild().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 5000);
            }
        });
    }

    private GetContainerSettings = async (buildConfigId: number):
        Promise<{ envSettings: string[], builderType: IBuildType }> => {
        const buildConfig = await this.PostgresStore.GetBuildConfig(buildConfigId);
        const buildType = await this.PostgresStore.GetBuildType(buildConfig.BuilderDefinitionId);
        let vmName = buildConfig.VMName;
        if (buildConfig.AppendBuildNumber) {
            vmName = vmName + "-" + buildConfig.LastBuildNumber.toString();
        }
        const folder = path.dirname(buildType.Id);
        const minioUrl = this.MinioConfig.Secure === "true" ?
            `https://${this.MinioConfig.Address}:${this.MinioConfig.Port}` :
            `http://${this.MinioConfig.Address}:${this.MinioConfig.Port}`;
        const envSettings = [
            `USERNAME=${Dependencies().Settings.VCenterSettings.Username}`,
            `PASSWORD=${Dependencies().Settings.VCenterSettings.Password}`,
            `SERVER=${Dependencies().Settings.VCenterSettings.URL}`,
            `DATASTORE=${buildConfig.Datastore}`,
            `NETWORK=${buildConfig.Network}`,
            `HOST=${buildConfig.Host}`,
            `VMNAME=${vmName}`,
            `SSH_USERNAME=${buildConfig.SSHUsername}`,
            `SSH_PASSWORD=${buildConfig.SSHPassword}`,
            `BUCKET=${this.MinioConfig.ContentBucket}`,
            `MINIO_ACCESS_KEY=${this.MinioConfig.AccessKey}`,
            `MINIO_SECRET_KEY=${this.MinioConfig.SecretKey}`,
            `MINIO_URL=${minioUrl}`,
            `BUILDFOLDER=${folder}`,
            `PACKERJSONFILE=${buildType.File}`,
            `FOLDER=${Dependencies().Settings.VCenterSettings.DefaultFolder}`
        ];
        if (buildConfig.ISO) {
            envSettings.push(`ISO=${buildConfig.ISO}`);
        }
        if (buildConfig.TemplatePackerBuildId) {
            const baseTemplateArtifact = await FindLastArtifactForBuildConfig(buildConfig.TemplatePackerBuildId);
            if (baseTemplateArtifact) {
                this.Logger.info(`Using base template ${baseTemplateArtifact.Name}`);
                envSettings.push(`TEMPLATE=${baseTemplateArtifact.Name}`);
            } else {
                throw new Error("There are no artifacts to use for this build. The selected source"
                    + " packer build has no artifacts.");
            }
        }
        this.Logger.info("Env settings:");
        this.Logger.info(envSettings.join("\n"));
        const builderType = buildType;
        return {
            envSettings,
            builderType
        };
    }

    private SetBuildToStarted = async (buildId: number) => {
        const startedBuild = await this.PostgresStore.GetBuild(buildId);
        startedBuild.BuildStatus = BuildItemStatus.Starting;
        startedBuild.StartTime = new Date();
        await this.PostgresStore.SaveBuild(startedBuild);
        Dependencies().SocketManager.SendBuildChanges(buildId);
    }

    private SetBuildToProcessing = async (buildId: number) => {
        const build = await this.PostgresStore.GetBuild(buildId);
        build.BuildStatus = BuildItemStatus.Processing;
        await this.PostgresStore.SaveBuild(build);
        Dependencies().SocketManager.SendBuildChanges(buildId);
    }

    private CreateWriteStreams = (buildId: number):
        {stderr: NodeJS.WritableStream, stdout: NodeJS.WritableStream,
            dbstdout: DbAppendStdoutStream, dbstderr: DbAppendStderrStream} => {
        const stdout = new Liner(buildId, this.SocketManager.SendBuildLogMessage);
        const stderr = new Liner(buildId);
        const dbstdout = new DbAppendStdoutStream();
        const dbstderr = new DbAppendStderrStream();
        stdout.pipe(dbstdout);
        stderr.pipe(dbstderr);
        return {
            stderr,
            stdout,
            dbstdout,
            dbstderr
        };
    }

    private MarkBuildAsSuccessful = async (buildId: number, builderType: IBuildType) => {
        const build = await this.PostgresStore.GetBuild(buildId);
        build.BuildStatus = BuildItemStatus.Success;
        build.FinishTime = new Date();
        let artifactCount = 0;
        if (builderType.Type === "Packer") {
            const artifact = await Artifact.findAll({
                where: {
                    PackerBuildId: build.Id
                }
            });
            if (artifact.length === 1) {
                if (builderType.Feature) {
                    // Just need to set the feature on the artifact if required
                    artifact[0].Feature = builderType.Feature;
                }
                artifactCount++;
                await artifact[0].save();
                build.ArtifactId = artifact[0].Id;
            }
        }
        if (artifactCount === 0) {
            build.BuildStatus = BuildItemStatus.Errors;
            build.ErrorMessage = "No artifacts found after build.";
        }
        await this.PostgresStore.SaveBuild(build);
        Dependencies().SocketManager.SendBuildChanges(buildId);
    }

    private MarkBuildAsErrorStarting = async (buildId: number, errorMessage: string) => {
        const errorBuild = await this.PostgresStore.GetBuild(buildId);
        errorBuild.BuildStatus = BuildItemStatus.ErrorStarting;
        errorBuild.FinishTime = new Date();
        errorBuild.ErrorMessage = errorMessage;
        await this.PostgresStore.SaveBuild(errorBuild);
        Dependencies().SocketManager.SendBuildChanges(buildId);
    }

    private MarkBuildAsErrored = async (buildId: number, errorMessage: string) => {
        const errorBuild = await this.PostgresStore.GetBuild(buildId);
        errorBuild.BuildStatus = BuildItemStatus.Errors;
        errorBuild.FinishTime = new Date();
        errorBuild.ErrorMessage = errorMessage;
        await this.PostgresStore.SaveBuild(errorBuild);
        Dependencies().SocketManager.SendBuildChanges(buildId);
    }

    private GetBuildContainer = async (containerName: string) => {
        this.Logger.info(`Pulling container ${containerName}`);
        await PullImage(containerName, this.DockerSocket, this.AuthConfig);
        this.Logger.info(`${containerName} pulled.`);
    }

    private RunBuild = async (buildId: number, buildConfigId: number) => {
        this.Logger.info("Found new build id of " + buildId);
        try {
            await this.SetBuildToStarted(buildId);
            const { envSettings, builderType } = await this.GetContainerSettings(buildConfigId);
            const { stderr, stdout, dbstdout, dbstderr } = this.CreateWriteStreams(buildId);
            if (!(builderType.Type in this.Containers)) {
                throw Error(`Build type ${builderType.Type} does not exist in configuration.`);
            }
            await this.GetBuildContainer(this.Containers[builderType.Type]);
            await this.SetBuildToProcessing(buildId);

            let firstPromise: Promise<any>;

            if (isTestApiMode) {
                const fakeDocker = new FakeDocker();
                firstPromise = fakeDocker.run(this.Containers[builderType.Type],
                    [],
                    [ stdout, stderr ],
                    { Tty: false, Env: envSettings, authconfig: this.AuthConfig },
                    {});
            } else {
                firstPromise = this.Docker.run(this.Containers[builderType.Type],
                    [],
                    [ stdout, stderr ],
                    { Tty: false, Env: envSettings, authconfig: this.AuthConfig },
                    {});
            }
            firstPromise.then(async (returnDocker) => {
                if (returnDocker.output.StatusCode === 1) {
                    await this.MarkBuildAsErrored(buildId, "Build error.");
                } else {
                    await this.MarkBuildAsSuccessful(buildId, builderType);
                }
            });
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
            await this.MarkBuildAsErrorStarting(buildId, err.message);
        }
    }

    private CheckBuild = async () => {
        try {
            const builds = await this.PostgresStore.GetNewBuilds();
            if (builds.length > 0) {
                this.Logger.info(`Found ${builds.length} builds to process in the new state.`);
            }
            for (const build of builds) {
                await this.RunBuild(build.Id, build.PackerBuildConfigId);
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
