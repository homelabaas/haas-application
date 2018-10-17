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

router.get("/userdata", async (req: Request, res: Response) => {
    const appSetting = await Dependencies().PostgresStore.GetSettings("application");
    const returnValue = `phone_home:
    url: ${appSetting.URL}/api/phonehome/$INSTANCE_ID/
    post:
        - instance_id`;
    res.json({userdata: returnValue});
});

export const PhoneHomeController: Router = router;
