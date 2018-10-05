import { Request, Response, Router } from "express";
import { EnvironmentStatus } from "../../common/models/EnvironmentStatus";
import { IEnvironment } from "../../common/models/IEnvironment";
import { Dependencies } from "../dependencyManager";
import { IEnvironmentDefinition } from "./../../common/models/IEnvironmentDefinition";
import { IGenericReturn } from "./../../common/models/IGenericReturn";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const provisionDetails: IEnvironmentDefinition = req.body as IEnvironmentDefinition;
    try {
        const saveEnv: IEnvironment = {
            Name: provisionDetails.Name,
            VMPrefix: provisionDetails.VMPrefix,
            EnvironmentDefinition: provisionDetails,
            Tags: provisionDetails.Tags,
            Status: EnvironmentStatus.New
        };
        const newEnvironment = await Dependencies().PostgresStore.CreateNewEnvironment(saveEnv);
        Dependencies().SocketManager.SendEnvUpdate(newEnvironment);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "",
            NewId: newEnvironment.Id
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

export const ProvisionEnvironmentController: Router = router;
