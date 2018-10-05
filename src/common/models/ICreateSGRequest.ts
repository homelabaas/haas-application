export interface ICreateSGRequest {
    ArtifactId: number;
    UserDataAsBase64: string;
    BaseMachineName: string;
    VMSpecId: number;
    NetworkSegmentId: number;
    EnvironmentName: string;
    DesiredCount: number;
    Tags: any;
}
