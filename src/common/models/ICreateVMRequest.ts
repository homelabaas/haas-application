export interface ICreateVMRequest {
    ArtifactId: number;
    UserDataAsBase64: string;
    MachineName: string;
    VMSpecId: number;
    NetworkSegmentId: number;
    Tags?: any;
}
