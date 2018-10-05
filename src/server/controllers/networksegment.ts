import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { INetworkSegment } from "../../common/models/INetworkSegment";
import { IPopulateNetworkRequest } from "../../common/models/IPopulateNetworkRequest";
import NetworkIPAssignment from "../data/models/NetworkIPAssignment";
import NetworkSegment from "../data/models/NetworkSegment";
import { Dependencies } from "../dependencyManager";
import { IPRange } from "../utils/IPRange";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const networkSegments = await Dependencies().PostgresStore.GetNetworkSegments(false);
        res.json(networkSegments);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const networkSegmentId = req.params.id;
    try {
        const networkSegment = await Dependencies().PostgresStore.GetNetworkSegment(networkSegmentId);
        res.json(networkSegment);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.post("/populate", async (req: Request, res: Response) => {
    const populateRequest = req.body as IPopulateNetworkRequest;
    try {
        const networkSegment = await Dependencies().PostgresStore.GetNetworkSegment(populateRequest.NetworkSegmentId);
        if (networkSegment.IPs) {
            if (networkSegment.IPs.length > 0) {
                throw new Error("IP addresses have already been created.");
            }
        }
        const ipRange = new IPRange(networkSegment.StartIP, networkSegment.EndIP).GetRange().map((ip) => {
            return {
                IP: ip,
                NetworkSegmentId: networkSegment.Id
            };
        });
        NetworkIPAssignment.bulkCreate(ipRange);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: `Created ${ipRange.length} IP address slots.`
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

router.post("/", async (req: Request, res: Response) => {
    const networkSegment = req.body as INetworkSegment;
    try {
        if (networkSegment.Id) {
            await NetworkSegment.update(networkSegment, { where: {Id: networkSegment.Id }} );
            const returnValue: IGenericReturn = {
                Success: true,
                Message: ""
            };
            res.json(returnValue);
        } else {
            const newNetworkSegment = NetworkSegment.build(networkSegment);
            await newNetworkSegment.save();
            const returnValue: IGenericReturn = {
                Success: true,
                Message: "",
                NewId: newNetworkSegment.Id
            };
            res.json(returnValue);
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const NetworkSegmentController: Router = router;
