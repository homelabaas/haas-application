import { Request, Response, Router } from "express";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import { Dependencies } from "../dependencyManager";
import { IFileForDatastore } from "./../../common/models/IFileForDatastore";
import { IHostInformation } from "./../../common/models/IHostInformation";
import { IVmwareObject } from "./../../common/models/IVmwareObject";

const router: Router = Router();

router.get("/browsedatastore/:id", async (req: Request, res: Response) => {
    try {
        const datastoreId = req.params.id;
        const patternMatch = req.query.patternMatch || "*.*";
        const browseData = await Dependencies().VCenter.BrowseDatastore(datastoreId, patternMatch);
        const returnObject: IFileForDatastore[] = browseData.map((p) => ({
            fileDisplay: p.filePath.substring(p.filePath.indexOf("]") + 2) + p.filename,
            fullFilePath: p.filePath + p.filename
        }));
        res.json(returnObject);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/datastores", async (req: Request, res: Response) => {
    try {
        const datastores = await Dependencies().VCenter.GetManagedObjects("Datastore");
        const returnValues = datastores.objects
            .map((p) => ({ name: p.propSet[0].val, id: p.obj.value} as IVmwareObject));
        if (returnValues) {
            res.json(returnValues);
        } else {
            res.json({});
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/hosts", async (req: Request, res: Response) => {
    try {
        const hosts = await Dependencies().VCenter.GetManagedObjects("HostSystem");
        const hostValues = hosts.objects
            .map((p) => ({ name: p.propSet[0].val, id: p.obj.value} as IVmwareObject));
        if (hostValues) {
            res.json(hostValues);
        } else {
            res.json({});
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/host/:id", async (req: Request, res: Response) => {
    try {
        const hostId = req.params.id;
        const hostInfo = await Dependencies().VCenter.GetHostById(hostId);
        const datastoresOnHost = hostInfo.objects[0].propSet
            .filter((p) => p.name === "datastore")[0].val
            .map((q) => q.value);
        const networksOnHost = hostInfo.objects[0].propSet
            .filter((p) => p.name === "network")[0].val
            .map((q) => q.value);
        const name = hostInfo.objects[0].propSet.filter((p) => p.name === "name")[0].val;
        const parent = hostInfo.objects[0].propSet.filter((p) => p.name === "parent");
        let clusterName = "";
        if (parent.length === 1) {
            if (parent[0].val.type === "ClusterComputeResource") {
                const clusterId = parent[0].val.value;
                const cluster = await Dependencies().VCenter.GetClusterById(clusterId);
                clusterName = cluster.objects[0].propSet.filter((p) => p.name === "name")[0].val;
            }
        }
        const allDatastores = await Dependencies().VCenter.GetManagedObjects("Datastore");
        const dataStoreList = allDatastores.objects.map((p) => ({id: p.obj.value, name: p.propSet[0].val }));
        const allNetworks = await Dependencies().VCenter.GetManagedObjects("Network");
        const networkList = allNetworks.objects.map((p) => ({id: p.obj.value, name: p.propSet[0].val }));
        const returnDatastores = dataStoreList.filter((p) => datastoresOnHost.includes(p.id));
        const returnNetworks = networkList.filter((p) => networksOnHost.includes(p.id));
        const returnObject: IHostInformation = {
            Datastores: returnDatastores,
            Networks: returnNetworks,
            Cluster: clusterName,
            id: hostId,
            name
        };
        res.json(returnObject);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

export const VmwareController: Router = router;
