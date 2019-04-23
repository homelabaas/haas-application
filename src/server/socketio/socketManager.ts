import * as bunyan from "bunyan";
import * as seq from "bunyan-seq";
import * as config from "config";
import * as http from "http";
import * as path from "path";
import * as socketio from "socket.io";
import { StringToEventLogType } from "../../common/EventLogType";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IEventLog } from "../../common/models/IEventLog";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { Dependencies } from "../dependencyManager";
import { IBuildOutputLine } from "./../../common/models/IBuildOutputLine";
import { BuildConfigListUpdate, BuildLogUpdate, EnvUpdate, EventLogUpdate, SGUpdate, VMUpdate } from "./../../common/socketEventDefinitions";

export class SocketManager {
    public io: socketio.Server;
    public Logger: bunyan;

    constructor(server: http.Server, logFolder: string) {
        this.io = socketio(server);
        this.Logger = bunyan.createLogger({
            name: "socketio",
            streams: [
                {
                    level: "info",
                    path: path.join(logFolder, "socketio.log")
                },
                seq.createStream({serverUrl: config.get("Logfiles.SeqUrl")})
            ]
        });
    }

    public Initialize = () => {
        this.Logger.info("Initialise Socket Manager");
    }

    public SendEventLogUpdate = (EventLogDetails: IEventLog) => {
        const eventLogType = StringToEventLogType(EventLogDetails.ObjectType);
        this.Logger.info({EventLogDetails}, "Socket IO send EventLog update to: "
            + EventLogUpdate(eventLogType));
        this.io.emit(EventLogUpdate(eventLogType), EventLogDetails);
    }

    public SendVMUpdate = (VMDetails: IVirtualMachine) => {
        this.Logger.info({VMDetails}, "Socket IO send VM update to: " + VMUpdate);
        this.io.emit(VMUpdate, VMDetails);
    }

    public SendSGUpdate = (SGDetails: IScalingGroup) => {
        this.Logger.info({SGDetails}, "Socket IO send SG update to: " + SGUpdate);
        this.io.emit(SGUpdate, SGDetails);
    }

    public SendEnvUpdate = (envDetails: IEnvironment) => {
        this.Logger.info({envDetails}, "Socket IO send environemnt update to: " + EnvUpdate);
        this.io.emit(EnvUpdate, envDetails);
    }

    public SendBuildLogMessage = (buildId: number, logMessage: IBuildOutputLine) => {
        this.Logger.info({ logMessage }, "Socket IO send to: " + BuildLogUpdate(buildId));
        this.io.emit(BuildLogUpdate(buildId), logMessage);
    }

    public SendBuildChanges = async (buildId: number) => {
        const buildDetails = await Dependencies().PostgresStore.GetBuild(buildId);
        this.Logger.info({ changes: buildDetails }, BuildConfigListUpdate);
        this.io.emit(BuildConfigListUpdate, buildDetails);
    }
}
