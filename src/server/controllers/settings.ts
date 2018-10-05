import { Request, Response, Router } from "express";
import { Dependencies } from "../dependencyManager";
import { IApplicationSettings } from "./../../common/models/IApplicationSettings";
import { IGenericReturn } from "./../../common/models/IGenericReturn";
import { IPowerDnsSettings } from "./../../common/models/IPowerDnsSettings";
import { IVCenterSettings } from "./../../common/models/IVcenterSettings";

const router: Router = Router();

router.get("/powerdns", async (req: Request, res: Response) => {
    const settings = await Dependencies().PostgresStore.GetSettings("powerdns");
    if (settings) {
        res.json(settings);
    } else {
        res.json({});
    }
});

router.get("/vcenter", async (req: Request, res: Response) => {
    const settings = await Dependencies().PostgresStore.GetSettings("vcenter");
    if (settings) {
        res.json(settings);
    } else {
        res.json({});
    }
});

router.get("/application", async (req: Request, res: Response) => {
    const settings = await Dependencies().PostgresStore.GetSettings("application");
    if (settings) {
        res.json(settings);
    } else {
        res.json({});
    }
});

router.post("/application", async (req: Request, res: Response) => {
    const postSettings: IApplicationSettings = req.body as IApplicationSettings;

    try {
        await Dependencies().PostgresStore.SetSettings("application", postSettings);
        await Dependencies().SetApplicationSettings(postSettings);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "Validated"
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

router.post("/powerdns", async (req: Request, res: Response) => {
    const postSettings: IPowerDnsSettings = req.body as IPowerDnsSettings;

    try {
        await Dependencies().ValidatePowerDnsSettings(postSettings);
        await Dependencies().PostgresStore.SetSettings("powerdns", postSettings);
        await Dependencies().SetPowerDnsSettings(postSettings);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "Validated"
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

router.post("/vcenter", async (req: Request, res: Response) => {
    const postSettings: IVCenterSettings = req.body as IVCenterSettings;

    try {
        await Dependencies().ConnectVcenter(postSettings);
        await Dependencies().PostgresStore.SetSettings("vcenter", postSettings);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "Validated"
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

router.post("/unset", async (req: Request, res: Response) => {
    try {
        await Dependencies().DisconnectVcenter();
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "Validated"
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

export const SettingsController: Router = router;
