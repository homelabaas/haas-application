import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { IVMSpec } from "../../common/models/IVMSpec";
import VMSpec from "../data/models/VMSpec";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const vmSpecs = await Dependencies().PostgresStore.GetVMSpecs();
        res.json(vmSpecs);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const vmSpecId = req.params.id;
    try {
        const vmSpec = await Dependencies().PostgresStore.GetVMSpec(vmSpecId);
        res.json(vmSpec);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const vmSpecPost = req.body as IVMSpec;
    try {
        if (vmSpecPost.Id) {
            await VMSpec.update(vmSpecPost, { where: {Id: vmSpecPost.Id }} );
            const returnValue: IGenericReturn = {
                Success: true,
                Message: ""
            };
            res.json(returnValue);
        } else {
            const newVMSpec = await Dependencies().PostgresStore.CreateNewVMSpec(vmSpecPost);
            const returnValue: IGenericReturn = {
                Success: true,
                Message: "",
                NewId: newVMSpec.Id
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

export const VMSpecController: Router = router;
