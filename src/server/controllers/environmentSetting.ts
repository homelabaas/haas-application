import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/:environment/:setting", async (req: Request, res: Response) => {
    const environment = req.params.environment;
    const setting = req.params.setting;

    try {
        const environmentSetting = await Dependencies().PostgresStore.GetEnvironmentSetting(environment, setting);
        res.json(environmentSetting);
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

router.post("/:environment", async (req: Request, res: Response) => {
    const environment = req.params.environment;
    const newSetting = req.body;
    const settingKey = Object.keys(newSetting)[0];
    const settingValue = newSetting[settingKey];
    try {
        await Dependencies().PostgresStore.SetEnvironmentSetting(environment, settingKey, settingValue);
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

export const EnvironmentSettingController: Router = router;
