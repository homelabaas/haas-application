import * as btoa from "btoa";
import * as bunyan from "bunyan";
import { EventLogLevel } from "../../common/EventLogLevel";
import { EventLogType } from "../../common/EventLogType";
import { EnvironmentStatus } from "../../common/models/EnvironmentStatus";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IMinioSettings } from "../../common/models/IMinioSettings";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { ScalingGroupStatus } from "../../common/models/ScalingGroupStatus";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { FindLastArtifactForBuildConfig } from "../data/artifacts";
import { SocketManager } from "../socketio/socketManager";
import { MinioManager } from "../utils/minioManager";
import { PostgresStore } from "./../data/postgresStore";

export class EnvironmentMonitor {
    private PostgresStore: PostgresStore;
    private KeepRunning: boolean;
    private Logger: bunyan;
    private SocketManager: SocketManager;
    private MinioManager: MinioManager;
    private MinioConfig: IMinioSettings;

    constructor(postgresStore: PostgresStore,
                socketManager: SocketManager,
                minioManager: MinioManager,
                minioConfig: IMinioSettings,
                logger: bunyan) {
        this.KeepRunning = true;
        this.PostgresStore = postgresStore;
        this.Logger = logger;
        this.SocketManager = socketManager;
        this.MinioManager = minioManager;
        this.MinioConfig = minioConfig;
    }

    public LogEventInfo = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.Environment,
            message, EventLogLevel.Info, vmId, eventdata);
    }

    public LogEventWarning = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.Environment,
            message, EventLogLevel.Warning, vmId, eventdata);
    }

    public LogEventError = async (message: string, vmId: number, eventdata?: any) => {
        await this.PostgresStore.CreateEventLog(EventLogType.Environment,
            message, EventLogLevel.Error, vmId, eventdata);
    }

    public Run = () => {
        this.CheckStateChanges().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 15000);
            }
        });
    }

    private createScalingGroup = async (env: IEnvironment, scalingGroupIndex: number) => {
        const sgDefinition = env.EnvironmentDefinition.ScalingGroups[scalingGroupIndex];
        const packerBuild = await this.PostgresStore.GetBuildConfigByName(sgDefinition.Basebuildconfig);
        const artifact = await FindLastArtifactForBuildConfig(packerBuild.Id);
        const networkSegment = await this.PostgresStore.GetNetworkSegmentByName(sgDefinition.Network);
        const userDataBuilderDefinition = await this.PostgresStore.GetBuildTypeByName(sgDefinition.Cloudconfig);
        const bucket = this.MinioConfig.ContentBucket;
        let minioFilename = userDataBuilderDefinition.Id;
        minioFilename = minioFilename.substr(0, minioFilename.lastIndexOf("/"));
        minioFilename = minioFilename + "/" + userDataBuilderDefinition.File;
        const userData = await this.MinioManager.GetMinioFile(bucket, minioFilename);
        const vmSpec = await this.PostgresStore.GetVMSpecByName(sgDefinition.Size);
        let setTags = {};
        setTags = Object.assign(setTags, env.Tags);
        setTags = Object.assign(setTags, sgDefinition.Tags);
        const createSg: IScalingGroup = {
            EnvironmentId: env.Id,
            ArtifactId: artifact.Id,
            NetworkSegmentId: networkSegment.Id,
            Status: ScalingGroupStatus.New,
            UserDataAsBase64: btoa(userData),
            BaseMachineName: env.VMPrefix + "-" + sgDefinition.Name,
            DesiredCount: sgDefinition.Count,
            EnvironmentName: env.VMPrefix,
            VMSpecId: vmSpec.Id,
            Tags: setTags
        };
        const sg = await this.PostgresStore.CreateNewSG(createSg);
        this.SocketManager.SendSGUpdate(sg);
        await this.LogEventInfo("Create new SG: " + createSg.BaseMachineName, env.Id);
    }

    private terminateScalingGroup = async (env: IEnvironment) => {
        const sgToTerminate = env.ScalingGroups.find((p) => p.Status === ScalingGroupStatus.Stable);
        const sg = await this.PostgresStore.GetSG(sgToTerminate.Id);
        sg.Status = VirtualMachineStatus.OrderTerminate;
        await this.PostgresStore.SaveSG(sg);
        this.SocketManager.SendSGUpdate(sg);
        await this.LogEventInfo("Terminate SG: " + sg.BaseMachineName, env.Id);
    }

    private checkAndCreateOrDeleteSG = async (env: IEnvironment): Promise<boolean> => {
        let desiredCount = env.EnvironmentDefinition.ScalingGroups.length;
        if (env.Status === EnvironmentStatus.Terminating || env.Status === EnvironmentStatus.Terminated) {
            desiredCount = 0;
        }
        let allSGsReady = true;
        // We can safely ignore terminated scaling groups
        const unterminatedScalingGroups = env.ScalingGroups.filter((p) => {
            return p.Status !== VirtualMachineStatus.Terminated;
        });
        for (const sg of unterminatedScalingGroups) {
            if (sg.Status !== ScalingGroupStatus.Stable) {
                allSGsReady = false;
            }
        }
        if (unterminatedScalingGroups.length < desiredCount && allSGsReady) {
            const createIndex = unterminatedScalingGroups.length;
            await this.LogEventInfo("Scaling Groups under the desired number. Initiating the creation of a new one.",
                env.Id);
            this.createScalingGroup(env, createIndex);
        }
        if (unterminatedScalingGroups.length > desiredCount && allSGsReady) {
            await this.LogEventInfo("Terminating SGs continuing on to next one.",
                env.Id);
            this.terminateScalingGroup(env);
        }
        return (allSGsReady && unterminatedScalingGroups.length === desiredCount);
    }

    private updateEnv = async (env: IEnvironment) => {
        const environment = await this.PostgresStore.GetEnvironment(env.Id);
        Object.assign(environment, env);
        await this.PostgresStore.SaveEnvironment(environment);
        this.SocketManager.SendEnvUpdate(env);
    }

    private CheckStateChanges = async () => {
        try {
            const environments = await this.PostgresStore.GetEnvironments();
            for (const env of environments) {
                switch (env.Status) {
                    case EnvironmentStatus.New:
                        env.Status = EnvironmentStatus.Creating;
                        this.updateEnv(env);
                        await this.checkAndCreateOrDeleteSG(env);
                        break;
                    case EnvironmentStatus.Creating:
                        if (await this.checkAndCreateOrDeleteSG(env)) {
                            env.Status = EnvironmentStatus.Ready;
                            await this.updateEnv(env);
                        }
                        break;
                    case EnvironmentStatus.OrderTerminate:
                        env.Status = EnvironmentStatus.Terminating;
                        await this.updateEnv(env);
                        await this.checkAndCreateOrDeleteSG(env);
                        break;
                    case EnvironmentStatus.Terminating:
                        if (await this.checkAndCreateOrDeleteSG(env)) {
                            env.Status = EnvironmentStatus.Terminated;
                            await this.updateEnv(env);
                        }
                        break;
                    default:
                        break;
                }
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
