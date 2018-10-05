import { Request, Response, Router } from "express";
import { ICreateVMRequest } from "../../common/models/ICreateVMRequest";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const vm = await Dependencies().PostgresStore.GetVMs();
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
    const vmId = req.params.id;
    try {
        const vm = await Dependencies().PostgresStore.GetVM(vmId);
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
    const vmRequest = req.body as IVirtualMachine;
    try {
        const vmChange = await Dependencies().PostgresStore.GetVM(vmRequest.Id);
        Object.assign(vmChange, vmRequest);
        await Dependencies().PostgresStore.SaveVM(vmChange);
        Dependencies().SocketManager.SendVMUpdate(vmChange);
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
    const vmRequest = req.body as ICreateVMRequest;
    try {
        const newVm: IVirtualMachine = {
            ArtifactId: vmRequest.ArtifactId,
            VMSpecId: vmRequest.VMSpecId,
            UserDataAsBase64: vmRequest.UserDataAsBase64,
            MachineName: vmRequest.MachineName,
            Status: VirtualMachineStatus.Requested,
            NetworkSegmentId: vmRequest.NetworkSegmentId,
            Tags: vmRequest.Tags
        };
        const newVM = await Dependencies().PostgresStore.CreateNewVM(newVm);
        Dependencies().SocketManager.SendVMUpdate(newVM);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "",
            NewId: newVM.Id
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

export const VMController: Router = router;
