export interface IStatus {
    VcenterConnected: boolean;
    DockerConnected: boolean;
    DockerRegistryAuth: boolean;
    MinioConnected: boolean;
    MinioBucketExists: boolean;
    PowerDNS: boolean;
    BuilderThreadRunning: boolean;
    PostgresConnected: boolean;
    VmProvisionManager: boolean;
    VmTerminateManager: boolean;
    VmCleanupManager: boolean;
    SgManager: boolean;
    EnvironmentManager: boolean;
}
