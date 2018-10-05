import { IArtifact } from "../../common/models/IArtifact";
import { IBuild } from "../../common/models/IBuild";
import { Dependencies } from "../dependencyManager";

export async function FindLastArtifactForBuildConfig(buildConfigId: number): Promise<IArtifact> {
    const artifactsAndBuilds = await Dependencies().PostgresStore.GetArtifactsWithBuildByBuildConfigId(buildConfigId);
    let artifact: IArtifact = null;
    let associatedBuild: IBuild = null;
    for (const artifactAndBuild of artifactsAndBuilds) {
        if (artifact === null) {
            artifact = artifactAndBuild.Artifact;
            associatedBuild = artifactAndBuild.Build;
        } else {
            if (artifactAndBuild.Build.BuildNumber > associatedBuild.BuildNumber) {
                artifact = artifactAndBuild.Artifact;
                associatedBuild = artifactAndBuild.Build;
            }
        }
    }
    return artifact;
}
