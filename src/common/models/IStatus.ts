export interface IStatus {
    VcenterConnected: boolean;
    DockerConnected: boolean;
    DockerRegistryAuth: boolean;
    MinioConnected: boolean;
    MinioBucketExists: boolean;
    MiniDNS: boolean;
    BuilderThreadRunning: boolean;
    PostgresConnected: boolean;
    VmProvisionManager: boolean;
    VmTerminateManager: boolean;
    VmCleanupManager: boolean;
    SgManager: boolean;
    EnvironmentManager: boolean;
}
