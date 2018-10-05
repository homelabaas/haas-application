import { Request, Response, Router } from "express";
import { Dependencies } from "../dependencyManager";
import { IGenericReturn } from "./../../common/models/IGenericReturn";
import { IRegisterMachineDns } from "./../../common/models/IRegisterMachineDns";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const machineRegister: IRegisterMachineDns = req.body as IRegisterMachineDns;

    try {
        if (Dependencies().ServerStatus.PowerDNS) {
            await Dependencies().PowerDNS.updateZoneSimple(Dependencies().Settings.PowerDnsSettings.defaultDomain,
                "A", machineRegister.name, machineRegister.ip);
            const returnValue: IGenericReturn = {
                Success: true,
                Message: ""
            };
            res.json(returnValue);
        } else {
            const returnValue: IGenericReturn = {
                Success: false,
                Message: "PowerDNS is not connected."
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

export const DnsController: Router = router;
