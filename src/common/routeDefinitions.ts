export const BuildRouteUrl = "/api/build";
export const SettingsRouteUrl = "/api/settings";
export const VmwareRouteUrl = "/api/vmware";
export const BuildTypeRouteUrl = "/api/buildtype";
export const BuildConfigRouteUrl = "/api/buildconfig";
export const StatusRouteUrl = "/api/status";
export const ArtifactsUrl = "/api/artifacts";
export const ProvisionUrl = "/api/provision";
export const PhoneHomeUrl = "/api/phonehome";
export const EnvironmentUrl = "/api/environment";
export const EnvironmentSettingUrl = "/api/environmentsetting";
export const DnsUrl = "/api/dns";
export const ContentUrl = "/api/content";
export const ProvisionEnvironmentUrl = "/api/environmentprovision";
export const NetworkSegmentUrl = "/api/networksegment";
export const VMSpecUrl = "/api/vmspec";
export const VMUrl = "/api/vm";
export const SGUrl = "/api/sg";

export function editBuildConfigPageUrl(id: number) { return `/buildconfigedit/${id}`; }
export function buildConfigPageUrl(id: number) { return `/buildconfig/${id}`; }
export function buildPageUrl(id: number) { return `/build/${id}`; }
export function networkSegmentPageUrl(id: number) { return `/networksegment/${id}`; }
export function editNetworkSegmentPageUrl(id: number) { return `/networksegmentedit/${id}`; }
