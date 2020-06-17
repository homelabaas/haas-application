import { Request, Response, Router } from "express";
import { BuildItemStatus } from "../../common/models/BuildItemStatus";
import { IBuildConfig } from "../../common/models/IBuildConfig";
import { IGenericReturn } from "../../common/models/IGenericReturn";
import PackerBuild from "../data/models/PackerBuild";
import { Dependencies } from "../dependencyManager";
import { IBuild } from "./../../common/models/IBuild";
import { ICreateBuild } from "./../../common/models/ICreateBuild";

const router: Router = Router();

function returnBuildList(builds: PackerBuild[]): IBuild[] {
    const returnBuilds = builds.map((p) => {
        const returnIBuild: IBuild = {
            BuildNumber: p.BuildNumber,
            ArtifactId: p.ArtifactId,
            PackerBuildConfig: p.PackerBuildConfig,
            BuildStatus: p.BuildStatus,
            ErrorMessage: p.ErrorMessage,
            FinishTime: p.FinishTime,
            Id: p.Id,
            PackerBuildConfigId: p.PackerBuildConfigId,
            QueueTime: p.QueueTime,
            StartTime: p.StartTime,
            Artifact: p.Artifact
        };
        return returnIBuild;
    });
    return returnBuilds;
}

router.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query.buildConfigId) {
            // tslint:disable-next-line: radix
            const buildId = Number.parseInt(req.query.buildConfigId[0]);
            const builds = await Dependencies().PostgresStore.GetBuildsByBuildConfigId(buildId);
            res.json(returnBuildList(builds));
        } else {
            const builds = await Dependencies().PostgresStore.GetBuilds();
            res.json(returnBuildList(builds));
        }
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/stdout/:id", async (req: Request, res: Response) => {
    const buildId = req.params.id;
    try {
        const buildOutput = await Dependencies().PostgresStore.GetBuildOutput(buildId);
        res.json(buildOutput);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const buildId = req.params.id;
    try {
        const builds = await Dependencies().PostgresStore.GetBuild(buildId);
        res.json(builds);
    } catch (err) {
        const returnValue: IGenericReturn = {
            Success: false,
            Message: err.message
        };
        res.json(returnValue);
    }
});

const SetBuildNumber = (build: IBuild, buildConfig: IBuildConfig) => {
    if (buildConfig.LastBuildNumber) {
        buildConfig.LastBuildNumber += 1;
    } else {
        buildConfig.LastBuildNumber = 1;
    }
    build.BuildNumber = buildConfig.LastBuildNumber;
};

router.post("/", async (req: Request, res: Response) => {
    const buildCreate = req.body as ICreateBuild;
    try {
        const buildConfig = await Dependencies().PostgresStore.GetBuildConfig(buildCreate.BuildConfigId);
        const build: IBuild = {
            QueueTime: new Date(),
            BuildStatus: BuildItemStatus.New,
            PackerBuildConfigId: buildCreate.BuildConfigId
        };
        SetBuildNumber(build, buildConfig);
        await Dependencies().PostgresStore.SaveBuildConfig(buildConfig);
        const saveResult = await Dependencies().PostgresStore.CreateNewBuild(build);
        Dependencies().SocketManager.SendBuildChanges(saveResult.Id);
        const returnValue: IGenericReturn = {
            Success: true,
            Message: "",
            NewId: saveResult.Id
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

export const BuildController: Router = router;
