import { Moment } from "moment";
import { Op } from "sequelize";
import { EventLogLevel, EventLogLevelToString } from "../../common/EventLogLevel";
import { EventLogType, EventLogTypeToString } from "../../common/EventLogType";
import { BuildItemStatus } from "../../common/models/BuildItemStatus";
import { IBuild } from "../../common/models/IBuild";
import { IBuildAndArtifact } from "../../common/models/IBuildAndArtifact";
import { IBuildOutputLine } from "../../common/models/IBuildOutputLine";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IEventLog } from "../../common/models/IEventLog";
import { INetworkSegment } from "../../common/models/INetworkSegment";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { IVMSpec } from "../../common/models/IVMSpec";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { IArtifact } from "./../../common/models/IArtifact";
import { IBuildConfig } from "./../../common/models/IBuildConfig";
import { IBuildType } from "./../../common/models/IBuildType";
import Artifact from "./models/Artifact";
import BuilderDefinition from "./models/BuilderDefinition";
import Environment from "./models/Environment";
import EnvironmentSetting from "./models/EnvironmentSetting";
import EventLog from "./models/EventLog";
import NetworkIPAssignment from "./models/NetworkIPAssignment";
import NetworkSegment from "./models/NetworkSegment";
import PackerBuild from "./models/PackerBuild";
import PackerBuildConfig from "./models/PackerBuildConfig";
import PackerBuildStdout from "./models/PackerBuildStdout";
import ScalingGroup from "./models/ScalingGroup";
import Settings from "./models/Settings";
import VirtualMachine from "./models/VirtualMachine";
import VMSpec from "./models/VMSpec";

export class PostgresStore {

    public CreateEventLog = async (eventLogType: EventLogType,
                                   message: string,
                                   level: EventLogLevel,
                                   objectId: number,
                                   eventData?: any) => {
        const writeEventLog: IEventLog = {
            DateTimeStamp: new Date(),
            EventText: message,
            Level: EventLogLevelToString(level),
            ObjectId: objectId,
            ObjectType: EventLogTypeToString(eventLogType)
        };
        if (eventData) {
            writeEventLog.StructuredEventData = eventData;
        }
        const createEventLog = EventLog.build(writeEventLog);
        await createEventLog.save();
        return createEventLog;
    }

    public CreateNewEnvironment = async (environment: IEnvironment) => {
        const saveEnv = Environment.build(environment);
        await saveEnv.save();
        return saveEnv;
    }

    public GetEnvironments = async (): Promise<IEnvironment[]> => {
        return await Environment.findAll({
            include: [ ScalingGroup ]
        });
    }

    public GetEnvironment = async (id: number): Promise<Environment> => {
        return await Environment.findByPk(id);
    }

    public SaveEnvironment = async (environment: Environment): Promise<Environment> => {
        return await environment.save();
    }

    public GetSGs = async (includeVMs: boolean = false): Promise<IScalingGroup[]> => {
        if (includeVMs) {
            return await ScalingGroup.findAll({
                include: [ VirtualMachine ]
            });
        } else {
            return await ScalingGroup.findAll();
        }
    }

    public GetSG = async (id: number): Promise<ScalingGroup> => {
        return await ScalingGroup.findByPk(id);
    }

    public CreateNewSG = async (sg: IScalingGroup) => {
        const saveSg = ScalingGroup.build(sg);
        await saveSg.save();
        return saveSg;
    }

    public SaveSG = async (sg: ScalingGroup): Promise<ScalingGroup> => {
        return await sg.save();
    }

    public SaveVM = async (vm: VirtualMachine): Promise<VirtualMachine> => {
        return await vm.save();
    }

    public GetNewVMs = async (): Promise<VirtualMachine[]> => {
        return await VirtualMachine.findAll({
            where: {
                Status: VirtualMachineStatus.Requested
            }
        });
    }

    public GetVMsToTerminate = async (): Promise<VirtualMachine[]> => {
        return await VirtualMachine.findAll({
            where: {
                Status: VirtualMachineStatus.OrderTerminate
            }
        });
    }

    public GetTerminatedVMs = async (maxDateTime: Moment): Promise<VirtualMachine[]> => {
        return await VirtualMachine.findAll({
            where: {
                Status: VirtualMachineStatus.Terminated,
                TerminateDateTime: {
                    [Op.lt]: maxDateTime.toDate()
                }
            }
        });
    }

    public GetVMs = async (excludeCleanedUp: boolean = true): Promise<IVirtualMachine[]> => {
        if (excludeCleanedUp) {
            return await VirtualMachine.findAll({
                    where: {
                        Status: { [Op.ne]: VirtualMachineStatus.CleanedUp }
                    }
                });
        } else {
            return await VirtualMachine.findAll();
        }
    }

    public GetVM = async (id: number): Promise<VirtualMachine> => {
        return await VirtualMachine.findByPk(id);
    }

    public CreateNewVM = async (vm: IVirtualMachine) => {
        const saveVm = VirtualMachine.build(vm);
        await saveVm.save();
        return saveVm;
    }

    public GetVMSpecs = async (): Promise<IVMSpec[]> => {
        return await VMSpec.findAll();
    }

    public GetVMSpec = async (id: number): Promise<IVMSpec> => {
        return await VMSpec.findByPk(id);
    }

    public GetVMSpecByName = async (name: string): Promise<IVMSpec> => {
        return await VMSpec.findOne({
            where: {
                Name: name
            }
        });
    }

    public CreateNewVMSpec = async (vmSpec: IVMSpec) => {
        const saveSpec = VMSpec.build(vmSpec);
        await saveSpec.save();
        return saveSpec;
    }

    public GetNetworkIPAssignment = async (ip: string) => {
        return await NetworkIPAssignment.findByPk(ip);
    }

    public SaveNetworkIPAssignment = async (networkIpAssignment: NetworkIPAssignment) => {
        return await networkIpAssignment.save();
    }

    public GetNetworkSegments = async (includeIPs: boolean): Promise<NetworkSegment[]> => {
        if (includeIPs) {
            return await NetworkSegment.findAll({
                include: [ NetworkIPAssignment ],
            });
        } else {
            return await NetworkSegment.findAll();
        }
    }

    public GetNetworkSegmentByName = async (name: string): Promise<INetworkSegment> => {
        const returnNetworkSegment = await NetworkSegment.findOne({
            where : {
                Name: name
            }
        });
        return returnNetworkSegment;
    }

    public GetNetworkSegment = async (networkSegmentId: number): Promise<NetworkSegment> => {
        const returnNetworkSegment = await NetworkSegment.findByPk(networkSegmentId, {
            include: [ {
                model: NetworkIPAssignment,
                include: [ VirtualMachine ]
            } ]
        });
        returnNetworkSegment.IPs = returnNetworkSegment.IPs.sort((a, b) => a.IP.localeCompare(b.IP));
        return returnNetworkSegment;
    }

    public GetArtifactsWithBuildByFeature = async (feature: string): Promise<IBuildAndArtifact[]> => {
        const artifacts = await Artifact.findAll({
            include: [ {
                model: PackerBuild,
                include: [ PackerBuildConfig ]
            } ],
            where: {
                Feature: feature
            }
        });
        return artifacts.map((p) => {
            const buildAndArtifact: IBuildAndArtifact = {
                Artifact: p as IArtifact,
                Build: p.PackerBuild as IBuild
            };
            return buildAndArtifact;
        });
    }

    public GetArtifactsWithBuild = async (): Promise<IBuildAndArtifact[]> => {
        const artifacts = await Artifact.findAll({
            include: [ {
                model: PackerBuild,
                include: [ PackerBuildConfig ]
            } ],
        });
        return artifacts.map((p) => {
            const buildAndArtifact: IBuildAndArtifact = {
                Artifact: p as IArtifact,
                Build: p.PackerBuild as IBuild
            };
            return buildAndArtifact;
        });
    }

    public GetArtifactsWithBuildByBuildConfigId = async (buildConfigId: number): Promise<IBuildAndArtifact[]> => {
        const packerBuilds = await PackerBuild.findAll({
            include: [ Artifact ],
            where: {
                PackerBuildConfigId: buildConfigId
            }
        });
        return packerBuilds.map((p) => {
            const buildAndArtifact: IBuildAndArtifact = {
                Artifact: p.Artifact as IArtifact,
                Build: p as IBuild
            };
            return buildAndArtifact;
        });
    }

    public GetArtifactById = async (artifactId: number): Promise<IArtifact> => {
        return await Artifact.findByPk(artifactId);
    }

    public SaveArtifact = async (artifact: IArtifact): Promise<IArtifact> => {
        const artifactToSave = Artifact.build(artifact);
        await artifactToSave.save();
        return artifactToSave;
    }

    public GetBuildsByBuildConfigId = async (buildConfigId: number): Promise<PackerBuild[]> => {
        const builds = await PackerBuild.findAll({
            where: {
                PackerBuildConfigId: buildConfigId
            },
            include: [ Artifact, PackerBuildConfig ]
        });
        return builds;
    }

    public GetNewBuilds = async (): Promise<PackerBuild[]> => {
        const newBuilds = await PackerBuild.findAll({
            where: {
                BuildStatus: BuildItemStatus.New
            }
        });
        return newBuilds;
    }

    public GetBuilds = async (): Promise<PackerBuild[]> => {
        return await PackerBuild.findAll({
            include: [ Artifact, PackerBuildConfig ]
        });
    }

    public GetBuildOutput = async (buildId: number): Promise<IBuildOutputLine[]> => {
        return await PackerBuildStdout.findAll({
            where: {
                PackerBuildId: buildId
            }
        });
    }

    public GetBuild = async (key: number): Promise<PackerBuild> => {
        return await PackerBuild.findByPk(key, {
            include: [ Artifact, PackerBuildConfig ]
        });
    }

    public SaveBuild = async (build: PackerBuild): Promise<PackerBuild> => {
        return await build.save();
    }

    public CreateNewBuild = async (build: IBuild): Promise<IBuild> => {
        const saveBuild = PackerBuild.build(build);
        await saveBuild.save();
        return saveBuild;
    }

    public GetBuildConfigs = async (): Promise<IBuildConfig[]> => {
        const buildConfig = await PackerBuildConfig.findAll();
        return buildConfig;
    }

    public GetBuildConfig = async (id: number): Promise<PackerBuildConfig> => {
        const buildConfig = await PackerBuildConfig.findByPk(id);
        return buildConfig;
    }

    public GetBuildConfigByName = async (name: string): Promise<PackerBuildConfig> => {
        const buildConfig = await PackerBuildConfig.findOne({
            where: {
                Name: name
            }
        });
        return buildConfig;
    }

    public CreateNewBuildConfig = async (buildConfig: IBuildConfig): Promise<IBuildConfig> => {
        const saveBuildConfig = PackerBuildConfig.build(buildConfig);
        await saveBuildConfig.save();
        return saveBuildConfig;
    }

    public SaveBuildConfig = async (buildConfig: PackerBuildConfig): Promise<PackerBuildConfig> => {
        return await buildConfig.save();
    }

    public GetEnvironmentSetting = async (environmentName: string, setting: string): Promise<string> => {
        const row = await EnvironmentSetting.findAll({
            where: {
                EnvironmentName: environmentName,
                Key: setting
            }
        });
        if (row.length > 0) {
            return row[0].Value;
        } else {
            return null;
        }
    }

    public SetEnvironmentSetting = async (environmentName: string, setting: string, value: string) => {
        await EnvironmentSetting.upsert({
            EnvironmentName: environmentName,
            Key: setting,
            Value: value
        });
    }

    public SetSettings = async (settingsKey: string, settingsObject: any) => {
        const keys = Object.keys(settingsObject);
        for (const key of keys) {
            const value = settingsObject[key];
            const settingsObjectSave = await Settings.upsert({
                Group: settingsKey,
                Key: key,
                Value: value
            });
        }
    }

    public GetSettings = async (settingsKey: string): Promise<any> => {
        const settingsRetrieved = await Settings.findAll({
            where: {
                Group: settingsKey
            }
        });
        const returnObject = {};
        for (const settingItem of settingsRetrieved) {
            returnObject[settingItem.Key] = settingItem.Value;
        }
        return returnObject;
    }

    public GetBuildType = async (buildTypeId: string): Promise<IBuildType> => {
        const builderDefinition = await BuilderDefinition.findByPk(buildTypeId);
        return builderDefinition;
    }

    public GetBuildTypeByName = async (name: string): Promise<IBuildType> => {
        const builderDefinition = await BuilderDefinition.findOne({
            where: {
                Name: name
            }
        });
        return builderDefinition;
    }

    public GetBuildTypes = async (): Promise<IBuildType[]> => {
        const builderDefinition = await BuilderDefinition.findAll();
        return builderDefinition;
    }

    public GetBuildTypesByType = async (buildTypeType: string): Promise<IBuildType[]> => {
        const builderDefinition = await BuilderDefinition.findAll({
            where: {
                Type: buildTypeType
            }
          });
        return builderDefinition;
    }

    public DeleteBuildType = async (filePath: string) => {
        const buildTypeToDelete = await BuilderDefinition.findByPk(filePath);
        await buildTypeToDelete.destroy();
    }

    public InsertOrUpdateBuildType = async (buildType: IBuildType) => {
        BuilderDefinition.upsert({
            Id: buildType.Id,
            File: buildType.File,
            Name: buildType.Name,
            Type: buildType.Type,
            Feature: buildType.Feature || null,
            Requirement: buildType.Requirement
        });
    }

    public SaveBuildTypes = async (buildTypes: IBuildType[]) => {
        const currentBuildTypes = await BuilderDefinition.findAll();
        const insertNewBuildTypes: any[] = [];
        for (const buildType of buildTypes) {
            const existingBuildType = currentBuildTypes.find((p) => p.Id === buildType.Id);
            if (existingBuildType) {
                existingBuildType.File = buildType.File;
                existingBuildType.Name = buildType.Name;
                existingBuildType.Type = buildType.Type;
                existingBuildType.Feature = buildType.Feature;
                existingBuildType.Requirement = buildType.Requirement;
                await existingBuildType.save();
            } else {
                const newBuilderDefinition = {
                    Id: buildType.Id,
                    File: buildType.File,
                    Name: buildType.Name,
                    Type: buildType.Type,
                    Feature: buildType.Feature || null,
                    Requirement: buildType.Requirement
                };
                insertNewBuildTypes.push(newBuilderDefinition);
            }
        }
        BuilderDefinition.bulkCreate(insertNewBuildTypes);
    }
}
