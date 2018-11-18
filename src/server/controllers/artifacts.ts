import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query.type) {
            const artifactsWithBuilds = await Dependencies()
                .PostgresStore
                .GetArtifactsWithBuildByFeature(req.query.type);
            res.json(artifactsWithBuilds);
        } else {
            const artifactsWithBuilds = await Dependencies().PostgresStore.GetArtifactsWithBuild();
            res.json(artifactsWithBuilds);
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // delete the artifact here
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const ArtifactsController: Router = router;
