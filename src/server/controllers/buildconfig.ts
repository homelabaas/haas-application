import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import PackerBuildConfig from "../data/models/PackerBuildConfig";
import { Dependencies } from "../dependencyManager";
import { IBuildConfig } from "./../../common/models/IBuildConfig";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const buildConfigs = await Dependencies().PostgresStore.GetBuildConfigs();
        res.json(buildConfigs);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const buildConfigId = req.params.id;
    try {
        const buildConfig = await Dependencies().PostgresStore.GetBuildConfig(buildConfigId);
        res.json(buildConfig);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const buildConfigPost = req.body as IBuildConfig;
    try {
        if (buildConfigPost.Id) {
            await PackerBuildConfig.update(buildConfigPost, { where: {Id: buildConfigPost.Id }} );
            const returnValue: IGenericReturn = {
                Success: true,
                Message: ""
            };
            res.json(returnValue);
        } else {
            const newBuildConfig = await Dependencies().PostgresStore.CreateNewBuildConfig(buildConfigPost);
            const returnValue: IGenericReturn = {
                Success: true,
                Message: "",
                NewId: newBuildConfig.Id
            };
            res.json(returnValue);
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const BuildConfigController: Router = router;
