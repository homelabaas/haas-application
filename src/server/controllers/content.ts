import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";
import { IContent } from "./../../common/models/IContent";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    // pass in ID as querystring
    try {
        const id = req.query.id;
        const bucket = Dependencies().MinioConfig.ContentBucket;
        const content = await Dependencies().Minio.GetMinioFile(bucket, id);
        const returnContent: IContent = { content, id };
        res.json(returnContent);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const ContentController: Router = router;
