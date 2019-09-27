import { Request, Response, Router } from "express";
import { URL } from "url";
import { Dependencies } from "../dependencyManager";
import { IApplicationSettings } from "./../../common/models/IApplicationSettings";
import { IGenericReturn } from "./../../common/models/IGenericReturn";
import { IMiniDNSSettings } from "./../../common/models/IMiniDNSSettings";
import { IMinioSettings } from "./../../common/models/IMinioSettings";
import { IMinioSettingsPost } from "./../../common/models/IMinioSettingsPost";
import { IVCenterSettings } from "./../../common/models/IVcenterSettings";

const router: Router = Router();

router.get("/minidns", async (req: Request, res: Response) => {
    const settings = await Dependencies().PostgresStore.GetSettings("minidns");
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

router.get("/minio", async (req: Request, res: Response) => {
    const settings = await Dependencies().PostgresStore.GetSettings("minio");
    if (settings) {
        if (Object.keys(settings).length > 0) {
            let url = "";
            if (settings.Secure && settings.Address && settings.Port) {
                url = (settings.Secure ? "http" : "https") + "://" + settings.Address + ":" + settings.Port;
            }
            const returnSettings: IMinioSettingsPost = {
                AccessKey: settings.AccessKey,
                ContentBucket: settings.ContentBucket,
                SecretKey: settings.SecretKey,
                URL: url
            };
            res.json(returnSettings);
        }
    }
    res.json({});
});

router.post("/minio", async (req: Request, res: Response) => {
    const postSettings: IMinioSettingsPost = req.body as IMinioSettingsPost;
    try {
        const minioUrl = new URL(postSettings.URL);
        const saveSettings: IMinioSettings = {
            ContentBucket: postSettings.ContentBucket,
            AccessKey: postSettings.AccessKey,
            SecretKey: postSettings.SecretKey,
            Port: minioUrl.port,
            Secure: (minioUrl.protocol === "https:").toString(),
            Address: minioUrl.hostname
        };
        await Dependencies().PostgresStore.SetSettings("minio", saveSettings);
        await Dependencies().SetMinioSettings(saveSettings);
        await Dependencies().InitMinio(saveSettings, true);
        await Dependencies().InitManagers();
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

router.post("/minidns", async (req: Request, res: Response) => {
    const postSettings: IMiniDNSSettings = req.body as IMiniDNSSettings;
    try {
        await Dependencies().PostgresStore.SetSettings("minidns", postSettings);
        await Dependencies().SetMiniDnsSettings(postSettings);
        await Dependencies().InitMiniDNS(postSettings, true);
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
        await Dependencies().InitManagers();
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
