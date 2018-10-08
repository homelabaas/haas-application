import { Request, Response, Router } from "express";
import * as path from "path";
import { Dependencies } from "../dependencyManager";
import { BuilderFilenameConstant } from "../utils/minioManager";

const router: Router = Router();

const ObjectDeletedEventName = "s3:ObjectRemoved:Delete";
const ObjectCreatedEventName = "s3:ObjectCreated:Put";

router.post("/", async (req: Request, res: Response) => {
    // mc events add local/builds arn:minio:sqs::1:webhook --suffix .yml
    const eventName = req.body.EventName;
    const filePath = req.body.Key;
    if (Dependencies().ServerStatus.MinioConnected) {
        Dependencies().Logger.debug(`Minio change - ${req.body.EventName} - ${req.body.Key}`);
        if (path.basename(filePath) === BuilderFilenameConstant) {
            if (eventName === ObjectDeletedEventName) {
                await Dependencies().Minio.RemoveBuilderFile(filePath);
            } else if (eventName === ObjectCreatedEventName) {
                await Dependencies().Minio.InsertOrUpdateBuilderFile(filePath);
            }
        }
    }
    res.json({});
});

export const MinioWebhookController: Router = router;
