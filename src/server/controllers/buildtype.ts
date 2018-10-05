import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    const buildTypeType = req.query.type || "";
    try {
        if (req.query.type) {
            const buildTypes = await Dependencies().PostgresStore.GetBuildTypesByType(buildTypeType);
            res.json(buildTypes);
        } else {
            const buildTypes = await Dependencies().PostgresStore.GetBuildTypes();
            res.json(buildTypes);
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/id", async (req: Request, res: Response) => {
    const key = req.query.id;
    try {
        const buildType = await Dependencies().PostgresStore.GetBuildType(key);
        res.json(buildType);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const BuildTypeController: Router = router;
