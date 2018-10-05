import * as socketio from "socket.io-client";
import { IEnvironment } from "../../common/models/IEnvironment";
import { IScalingGroup } from "../../common/models/IScalingGroup";
import { IVirtualMachine } from "../../common/models/IVirtualMachine";
import { BuildConfigListUpdate, BuildLogUpdate, EnvUpdate, SGUpdate, VMUpdate } from "./../../common/socketEventDefinitions";

class SocketManager {
    public Connection: SocketIOClient.Socket;

    constructor() {
        this.Connection = socketio.connect();
    }

    public startVMUpdateReceive = (receiveFunction: (data: IVirtualMachine) => void) => {
        this.Connection.on(VMUpdate, receiveFunction);
    }

    public stopVMUpdateReceive = () => {
        this.Connection.off(VMUpdate);
    }

    public startSGUpdateReceive = (receiveFunction: (data: IScalingGroup) => void) => {
        this.Connection.on(SGUpdate, receiveFunction);
    }

    public stopSGUpdateReceive = () => {
        this.Connection.off(SGUpdate);
    }

    public startEnvUpdateReceive = (receiveFunction: (data: IEnvironment) => void) => {
        this.Connection.on(EnvUpdate, receiveFunction);
    }

    public stopEnvUpdateReceive = () => {
        this.Connection.off(EnvUpdate);
    }

    public startBuildUpdateReceive = (receiveFunction: (data: any) => void) => {
        this.Connection.on(BuildConfigListUpdate, receiveFunction);
    }

    public stopBuildUpdateReceive = () => {
        this.Connection.off(BuildConfigListUpdate);
    }

    public startLogUpdated = (buildId: number, receiveFunction: (data: any) => void) => {
        this.Connection.on(BuildLogUpdate(buildId), receiveFunction);
    }

    public stopLogUpdated = (buildId: number) => {
        this.Connection.off(BuildLogUpdate(buildId));
    }

}

const socketManager: SocketManager =  new SocketManager();

// Only ever have one dependency manager
export function Sockets() {
    return socketManager;
}
