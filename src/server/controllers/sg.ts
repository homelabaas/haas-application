import { Request, Response, Router } from "express";
import { ICreateSGRequest } from "../../common/models/ICreateSGRequest";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { ScalingGroupStatus } from "../../common/models/ScalingGroupStatus";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const vm = await Dependencies().PostgresStore.GetSGs();
        res.json(vm);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const sgId = req.params.id;
    try {
        const vm = await Dependencies().PostgresStore.GetSG(sgId);
        res.json(vm);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.put("/", async (req: Request, res: Response) => {
    const sgRequest = req.body as IScalingGroup;
    try {
        const sgChange = await Dependencies().PostgresStore.GetSG(sgRequest.Id);
        Object.assign(sgChange, sgRequest);
        await Dependencies().PostgresStore.SaveSG(sgChange);
        Dependencies().SocketManager.SendSGUpdate(sgChange);
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

router.post("/", async (req: Request, res: Response) => {
    const sgRequest = req.body as ICreateSGRequest;
    try {
        const newSg: IScalingGroup = {
            ArtifactId: sgRequest.ArtifactId,
            UserDataAsBase64: sgRequest.UserDataAsBase64,
            BaseMachineName: sgRequest.BaseMachineName,
            NetworkSegmentId: sgRequest.NetworkSegmentId,
            DesiredCount: sgRequest.DesiredCount,
            EnvironmentName: sgRequest.EnvironmentName,
            VMSpecId: sgRequest.VMSpecId,
            Status: ScalingGroupStatus.New,
            Tags: sgRequest.Tags
        };
        const createdSg = await Dependencies().PostgresStore.CreateNewSG(newSg);
        Dependencies().SocketManager.SendSGUpdate(createdSg);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "",
            NewId: createdSg.Id
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

export const SGController: Router = router;
