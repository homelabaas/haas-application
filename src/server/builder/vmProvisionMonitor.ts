import * as bunyan from "bunyan";
import { IMinioSettings } from "../../common/models/IMinioSettings";
import { VirtualMachineStatus } from "../../common/models/VirtualMachineStatus";
import { Dependencies } from "../dependencyManager";
import { SocketManager } from "../socketio/socketManager";
import { PostgresStore } from "./../data/postgresStore";
import { VmManager } from "./vmManager";

export class VmProvisionMonitor {
    private PostgresStore: PostgresStore;
    private KeepRunning: boolean;
    private Logger: bunyan;
    private SocketManager: SocketManager;
    private MinioConfig: IMinioSettings;

    constructor(postgresStore: PostgresStore,
                socketManager: SocketManager,
                logger: bunyan,
                minioConfig: IMinioSettings) {
        this.KeepRunning = true;
        this.PostgresStore = postgresStore;
        this.Logger = logger;
        this.SocketManager = socketManager;
        this.MinioConfig = minioConfig;
    }

    public Run = () => {
        this.CheckNewVM().then(() => {
            if (this.KeepRunning) {
                setTimeout(() => { this.Run(); }, 5000);
            }
        });
    }

    private CheckNewVM = async () => {
        try {
            const newVMs = await this.PostgresStore.GetNewVMs();
            if (newVMs.length > 0) {
                this.Logger.info(`Found ${newVMs.length} VMs to provision.`);
            }
            for (const vm of newVMs) {
                vm.Status = VirtualMachineStatus.StartProvision;
                this.PostgresStore.SaveVM(vm);

                const artifact = await this.PostgresStore.GetArtifactById(vm.ArtifactId);
                const artifactId = await Dependencies().VCenter.GetVMById(artifact.ResourceId);
                const artifactInfo = await Dependencies().VCenter.GetEverything(artifactId);
                const datastoreId = artifactInfo.objects[0].propSet
                    .find((p) => p.name === "datastore").val[0].value;
                const datastore = await Dependencies().VCenter.GetDatastoreById(datastoreId);
                const datastoreDetails = await Dependencies().VCenter.GetEverything(datastore);
                const datastoreName = datastoreDetails.objects[0].propSet.filter((p) => p.name === "name")[0].val;

                const phoneHomeUrl = Dependencies().Settings.ApplicationSettings.URL;
                const provisionTask = new VmManager(vm.Id, this.SocketManager, this.Logger,
                    this.PostgresStore);
                setImmediate(() => { provisionTask.Provision(Dependencies().Settings.VCenterSettings.DefaultFolder,
                    datastoreName, phoneHomeUrl, this.MinioConfig); });
            }
        } catch (err) {
            this.Logger.error(err.message);
            this.Logger.error(JSON.stringify(err));
        }
    }
}
