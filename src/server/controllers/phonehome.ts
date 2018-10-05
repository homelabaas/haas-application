import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { PhoneHomeTaskLookups } from "../builder/phoneHomeTaskLookup";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.post("/:instanceid", async (req: Request, res: Response) => {
    const instanceid = req.params.instanceid;
    const environment = req.body;
    Dependencies().Logger.info("Recieved phone home with id: " + instanceid);
    Dependencies().Logger.info("Recieved phone home with data: " + JSON.stringify(environment));
    try {
        await PhoneHomeTaskLookups().PhoneHomeByVmid(instanceid);
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

export const PhoneHomeController: Router = router;
