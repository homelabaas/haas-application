import { BuildItemStatus } from "./BuildItemStatus";
import { IArtifact } from "./IArtifact";
import { IBuildConfig } from "./IBuildConfig";

export interface IBuild {
    Id?: number;
    BuildNumber?: number;
    BuildStatus: BuildItemStatus;
    PackerBuildConfigId: number;
    QueueTime: Date;
    StartTime?: Date;
    FinishTime?: Date;
    ErrorMessage?: string;
    ArtifactId?: number;
    PackerBuildConfig?: IBuildConfig;
    Artifact?: IArtifact;
}
