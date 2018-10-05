export interface IEnvironmentSG {
    Cloudconfig: string;
    Network: string;
    Name: string;
    Basebuildconfig: string;
    Count: number;
    Size: string;
    Tags: any;
}

export interface IEnvironmentSwarm {
    Composefile: string;
    Target: any;
}

export interface IEnvironmentDefinition {
    Name: string;
    VMPrefix: string;
    Tags: any;
    ScalingGroups: IEnvironmentSG[];
    Swarm: IEnvironmentSwarm;
}
