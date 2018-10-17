import * as bunyan from "bunyan";
import * as moment from "moment";
import { SocketManager } from "../socketio/socketManager";
import { PostgresStore } from "./../data/postgresStore";
import { VmManager } from "./vmManager";

export class VmCleanupManager {
    private PostgresStore: PostgresStore;
    private KeepRunning: boolean;
    private Logger: bunyan;
    private SocketManager: SocketManager;

    constructor(postgresStore: PostgresStore,
                socketManager: SocketManager,
                logger: bunyan) {
        this.KeepRunning = true;
        this.PostgresStore = postgresStore;
        this.Logger = logger;
        this.SocketManager = socketManager;
    }

    public Run = () => {
        this.CheckOldTerminatedVMs().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 5 * 60 * 1000);
            }
        });
    }

    private CheckOldTerminatedVMs = async () => {
        try {
            const minDateTime = moment().subtract(2, "hours");
            const newVMs = await this.PostgresStore.GetTerminatedVMs(minDateTime);
            if (newVMs.length > 0) {
                this.Logger.info(`Found ${newVMs.length} VMs to clean up.`);
            }
            for (const vm of newVMs) {
                const vmUpdate = await this.PostgresStore.GetVM(vm.Id);
                const terminateTask = new VmManager(vm.Id, this.SocketManager, this.Logger,
                    this.PostgresStore);
                setImmediate(terminateTask.CleanUp);
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
