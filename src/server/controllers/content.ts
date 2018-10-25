import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";
import { IContent } from "./../../common/models/IContent";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query.id === undefined) {
            throw Error("Invalid content Id.");
        }
        if (Dependencies().ServerStatus.MinioConnected) {
            const id = req.query.id;
            const bucket = Dependencies().Settings.MinioSettings.ContentBucket;
            const content = await Dependencies().Minio.GetMinioFile(bucket, id);
            const returnContent: IContent = { content, id };
            res.json(returnContent);
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

export const ContentController: Router = router;
