import { IArtifact } from "./IArtifact";
import { IBuild } from "./IBuild";

export interface IBuildAndArtifact {
    Build: IBuild;
    Artifact: IArtifact;
}
