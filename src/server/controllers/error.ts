import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.status(404).send("Not found");
});

export const ErrorController: Router = router;
