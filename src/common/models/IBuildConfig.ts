export interface IBuildConfig {
    Id?: number;
    Name: string;
    BuilderDefinitionId: string;
    VMName: string;
    AppendBuildNumber: boolean;
    Host: string;
    HostId: string;
    Cluster: string;
    Datastore: string;
    Network: string;
    ISO?: string;
    TemplatePackerBuildId?: number;
    SSHUsername: string;
    SSHPassword: string;
    LastBuildNumber?: number;
}
