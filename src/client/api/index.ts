import * as axios from "axios";
import { IApplicationSettings } from "../../common/models/IApplicationSettings";
import { IBuildOutputLine } from "../../common/models/IBuildOutputLine";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IMinioSettingsPost } from "../../common/models/IMinioSettingsPost";
import { INetworkSegment } from "../../common/models/INetworkSegment";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { IVMSpec } from "../../common/models/IVMSpec";
import { IBuild } from "./../../common/models/IBuild";
import { IBuildAndArtifact } from "./../../common/models/IBuildAndArtifact";
import { IBuildConfig } from "./../../common/models/IBuildConfig";
import { IBuildType } from "./../../common/models/IBuildType";
import { IContent } from "./../../common/models/IContent";
import { ICreateBuild } from "./../../common/models/ICreateBuild";
import { ICreateSGRequest } from "./../../common/models/ICreateSGRequest";
import { ICreateVMRequest } from "./../../common/models/ICreateVMRequest";
import { IEnvironmentDefinition } from "./../../common/models/IEnvironmentDefinition";
import { IFileForDatastore } from "./../../common/models/IFileForDatastore";
import { IGenericReturn } from "./../../common/models/IGenericReturn";
import { IHostDetails } from "./../../common/models/IHostDetails";
import { IPhoneHomeUserData } from "./../../common/models/IPhoneHomeUserData";
import { IPopulateNetworkRequest } from "./../../common/models/IPopulateNetworkRequest";
import { IPowerDnsSettings } from "./../../common/models/IPowerDnsSettings";
import { IProvisionDetails } from "./../../common/models/IProvisionDetails";
import { IProvisionTaskReturn } from "./../../common/models/IProvisionTaskReturn";
import { IStatus } from "./../../common/models/IStatus";
import { IVCenterSettings } from "./../../common/models/IVcenterSettings";
import { IVmwareObject } from "./../../common/models/IVmwareObject";
import * as routeConstants from "./../../common/routeDefinitions";

export const getStatus = async () => {
    const returnValue = await axios.default.get(routeConstants.StatusRouteUrl);
    return returnValue.data as IStatus;
};

export const getVCenterSettings = async (): Promise<IVCenterSettings> => {
    const returnValue = await axios.default.get(routeConstants.SettingsRouteUrl + "/vcenter");
    return returnValue.data as IVCenterSettings;
};

export const getPowerDnsSettings = async (): Promise<IPowerDnsSettings> => {
    const returnValue = await axios.default.get(routeConstants.SettingsRouteUrl + "/powerdns");
    return returnValue.data as IPowerDnsSettings;
};

export const getMinioSettings = async (): Promise<IMinioSettingsPost> => {
    const returnValue = await axios.default.get(routeConstants.SettingsRouteUrl + "/minio");
    return returnValue.data as IMinioSettingsPost;
};

export const postMinioSettings = async (settings: IMinioSettingsPost) => {
    const returnValue = await axios.default.post(routeConstants.SettingsRouteUrl + "/minio", settings);
    return returnValue.data as IGenericReturn;
};

export const getApplicationSettings = async (): Promise<IApplicationSettings> => {
    const returnValue = await axios.default.get(routeConstants.SettingsRouteUrl + "/application");
    return returnValue.data as IApplicationSettings;
};

export const postApplicationSettings = async (settings: IApplicationSettings) => {
    const returnValue = await axios.default.post(routeConstants.SettingsRouteUrl + "/application", settings);
    return returnValue.data as IGenericReturn;
};

export const postVCenterSettings = async (settings: IVCenterSettings) => {
    const returnValue = await axios.default.post(routeConstants.SettingsRouteUrl + "/vcenter", settings);
    return returnValue.data as IGenericReturn;
};

export const postPowerDnsSettings = async (settings: IPowerDnsSettings) => {
    const returnValue = await axios.default.post(routeConstants.SettingsRouteUrl + "/powerdns", settings);
    return returnValue.data as IGenericReturn;
};

export const logoutVCenter = async () => {
    const returnValue = await axios.default.post(routeConstants.SettingsRouteUrl + "/unset", {});
    return returnValue.data as IGenericReturn;
};

export const getHosts = async (): Promise<IVmwareObject[]> => {
    const returnValue = await axios.default.get(routeConstants.VmwareRouteUrl + "/hosts");
    return returnValue.data as IVmwareObject[];
};

export const getDatastores = async (): Promise<IVmwareObject[]> => {
    const returnValue = await axios.default.get(routeConstants.VmwareRouteUrl + "/datastores");
    return returnValue.data as IVmwareObject[];
};

export const getFilesForDatastore = async (datastoreId: string, patternMatch: string): Promise<IFileForDatastore[]> => {
    const returnValue = await axios.default
        .get(`${routeConstants.VmwareRouteUrl}/browsedatastore/${datastoreId}?patternMatch=${patternMatch}`);
    return returnValue.data as IFileForDatastore[];
};

export const getHostDetails = async (id: string): Promise<IHostDetails> => {
    const returnValue = await axios.default.get(routeConstants.VmwareRouteUrl + "/host/" + id);
    return returnValue.data as IHostDetails;
};

export const saveBuildConfig = async (buildConfig: IBuildConfig) => {
    const returnValue = await axios.default.post(routeConstants.BuildConfigRouteUrl, buildConfig);
    return returnValue.data as IGenericReturn;
};

export const getBuildConfigs = async (): Promise<IBuildConfig[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildConfigRouteUrl);
    return returnValue.data as IBuildConfig[];
};

export const getBuildConfig = async (id: number): Promise<IBuildConfig> => {
    const returnValue = await axios.default.get(routeConstants.BuildConfigRouteUrl + "/" + id);
    return returnValue.data as IBuildConfig;
};

export const createBuild = async (build: ICreateBuild) => {
    const returnValue = await axios.default.post(routeConstants.BuildRouteUrl, build);
    return returnValue.data as IGenericReturn;
};

export const getBuilds = async (): Promise<IBuild[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildRouteUrl);
    return returnValue.data as IBuild[];
};

export const getBuildsForBuildConfig = async (id: number): Promise<IBuild[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildRouteUrl + "?buildConfigId=" + id);
    return returnValue.data as IBuild[];
};

export const getBuild = async (id: number): Promise<IBuild> => {
    const returnValue = await axios.default.get(routeConstants.BuildRouteUrl + "/" + id);
    return returnValue.data as IBuild;
};

export const getBuildOutput = async (id: number): Promise<IBuildOutputLine[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildRouteUrl + "/stdout/" + id);
    return returnValue.data as IBuildOutputLine[];
};

export const getBuildTypes = async (): Promise<IBuildType[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildTypeRouteUrl);
    return returnValue.data as IBuildType[];
};

export const getBuildTypesByType = async (buildTypeType: string): Promise<IBuildType[]> => {
    const returnValue = await axios.default.get(routeConstants.BuildTypeRouteUrl + "?type=" + buildTypeType);
    return returnValue.data as IBuildType[];
};

export const getBuildType = async (id: string): Promise<IBuildType> => {
    const returnValue = await axios.default.get(`${routeConstants.BuildTypeRouteUrl}/id?id=${id}`);
    return returnValue.data as IBuildType;
};

export const getBuildsAndArtifactsByType = async (type: string): Promise<IBuildAndArtifact[]> => {
    const returnValue = await axios.default.get(`${routeConstants.ArtifactsUrl}?type=${type}`);
    return returnValue.data as IBuildAndArtifact[];
};

export const getBuildsAndArtifactsAll = async (): Promise<IBuildAndArtifact[]> => {
    const returnValue = await axios.default.get(`${routeConstants.ArtifactsUrl}`);
    return returnValue.data as IBuildAndArtifact[];
};


export const provision = async (provisionDetails: IProvisionDetails): Promise<IProvisionTaskReturn> => {
    const returnValue = await axios.default.post(routeConstants.ProvisionUrl, provisionDetails);
    return returnValue.data as IProvisionTaskReturn;
};

export const getContent = async (id: string): Promise<IContent> => {
    const returnValue = await axios.default.get(`${routeConstants.ContentUrl}?id=${id}`);
    return returnValue.data as IContent;
};

export const getNetworkSegments = async (): Promise<INetworkSegment[]> => {
    const returnValue = await axios.default.get(routeConstants.NetworkSegmentUrl);
    return returnValue.data as INetworkSegment[];
};

export const getNetworkSegment = async (id: number): Promise<INetworkSegment> => {
    const returnValue = await axios.default.get(routeConstants.NetworkSegmentUrl + "/" + id);
    return returnValue.data as INetworkSegment;
};

export const saveNetworkSegment = async (networkSegment: INetworkSegment) => {
    const returnValue = await axios.default.post(routeConstants.NetworkSegmentUrl, networkSegment);
    return returnValue.data as IGenericReturn;
};

export const populateNetworkSegment = async (networkSegmentId: number) => {
    const populateRequest: IPopulateNetworkRequest = {
        NetworkSegmentId: networkSegmentId
    };
    const returnValue = await axios.default.post(routeConstants.NetworkSegmentUrl + "/populate", populateRequest);
    return returnValue.data as IGenericReturn;
};

export const getVMSpecs = async (): Promise<IVMSpec[]> => {
    const returnValue = await axios.default.get(routeConstants.VMSpecUrl);
    return returnValue.data as IVMSpec[];
};

export const saveVMSpec = async (vmSpec: IVMSpec) => {
    const returnValue = await axios.default.post(routeConstants.VMSpecUrl, vmSpec);
    return returnValue.data as IGenericReturn;
};

export const getVMs = async () => {
    const returnValue = await axios.default.get(routeConstants.VMUrl);
    return returnValue.data as IVirtualMachine[];
};

export const getVM = async (id: number) => {
    const returnValue = await axios.default.get(routeConstants.VMUrl + "/" + id.toString());
    return returnValue.data as IVirtualMachine;
};

export const createVM = async (vm: ICreateVMRequest) => {
    const returnValue = await axios.default.post(routeConstants.VMUrl, vm);
    return returnValue.data as IGenericReturn;
};

export const saveVM = async (vm: IVirtualMachine) => {
    const returnValue = await axios.default.put(routeConstants.VMUrl, vm);
    return returnValue.data as IGenericReturn;
};

export const getSGs = async () => {
    const returnValue = await axios.default.get(routeConstants.SGUrl);
    return returnValue.data as IScalingGroup[];
};

export const getSG = async (id: number) => {
    const returnValue = await axios.default.get(routeConstants.SGUrl + "/" + id.toString());
    return returnValue.data as IScalingGroup;
};

export const createSG = async (SG: ICreateSGRequest) => {
    const returnValue = await axios.default.post(routeConstants.SGUrl, SG);
    return returnValue.data as IGenericReturn;
};

export const saveSG = async (SG: IScalingGroup) => {
    const returnValue = await axios.default.put(routeConstants.SGUrl, SG);
    return returnValue.data as IGenericReturn;
};

export const getEnvironments = async () => {
    const returnValue = await axios.default.get(routeConstants.EnvironmentUrl);
    return returnValue.data as IEnvironment[];
};

export const getEnvironment = async (id: number) => {
    const returnValue = await axios.default.get(routeConstants.EnvironmentUrl + "/" + id.toString());
    return returnValue.data as IEnvironment;
};

export const saveEnvironment = async (env: IEnvironment) => {
    const returnValue = await axios.default.put(routeConstants.EnvironmentUrl, env);
    return returnValue.data as IGenericReturn;
};

export const provisionEnvironment = async (provisionDetails: IEnvironmentDefinition):
        Promise<IGenericReturn> => {
    const returnValue = await axios.default.post(routeConstants.ProvisionEnvironmentUrl, provisionDetails);
    return returnValue.data as IGenericReturn;
};

export const getPhoneHomeUserData = async () => {
    const returnValue = await axios.default.get(routeConstants.PhoneHomeUrl + "/userdata");
    return returnValue.data as IPhoneHomeUserData;
};

export const getMinioBrowser = async (prefix: string) => {
    const returnValue = await axios.default.get(routeConstants.MinioBrowserUrl + "/" + prefix);
    return returnValue.data as any[];
};
