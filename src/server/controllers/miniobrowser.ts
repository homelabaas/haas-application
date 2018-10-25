import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/*", async (req: Request, res: Response) => {
    try {
        if (Dependencies().ServerStatus.MinioConnected) {
            const searchPrefix = req.path.substr(1);
            const bucket = Dependencies().Settings.MinioSettings.ContentBucket;
            const returnItems = await Dependencies().Minio.MinioListObjects(bucket, searchPrefix);
            res.json(returnItems);
        } else {
            throw Error("Minio is currently not connected.");
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const MinioBrowserController: Router = router;
