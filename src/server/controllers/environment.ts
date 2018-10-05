import { Request, Response, Router } from "express";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const environments = await Dependencies().PostgresStore.GetEnvironments();
        res.json(environments);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const envId = req.params.id;
    try {
        const environment = await Dependencies().PostgresStore.GetEnvironment(envId);
        res.json(environment);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.put("/", async (req: Request, res: Response) => {
    const envRequest = req.body as IEnvironment;
    try {
        const envChange = await Dependencies().PostgresStore.GetEnvironment(envRequest.Id);
        Object.assign(envChange, envRequest);
        await Dependencies().PostgresStore.SaveEnvironment(envChange);
        Dependencies().SocketManager.SendEnvUpdate(envChange);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: ""
        };
        res.json(returnValue);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const EnvironmentController: Router = router;
