export interface IProvisionNetworkType {
    Type: string;
    IP: string;
}

export interface IProvisionDetails {
    ArtifactId: number;
    UserDataAsBase64: string;
    NetworkSettings: IProvisionNetworkType;
    MachineName: string;
    EnvironmentName?: string;
}
