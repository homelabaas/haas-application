export interface IArtifact {
    Id?: number;
    PackerBuildId: number;
    ResourceId: string;
    Name: string;
    Type: string;
    RegisterTime: Date;
    Feature?: string;
}
