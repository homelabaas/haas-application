import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(Dependencies().GetStatus());
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const StatusController: Router = router;
