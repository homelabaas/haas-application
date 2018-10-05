export const BuildConfigListUpdate = "buildconfiglistupdate";
export const BuildLogUpdate = (buildId: number) => "buildlogupdate:" + buildId;
export const ProvisionEnvironmentStatusUpdate = (taskId: string) => "provisionenvironment:" + taskId;
export const VMUpdate = "vmupdates";
export const SGUpdate = "sgupdates";
export const EnvUpdate = "envupdates";
