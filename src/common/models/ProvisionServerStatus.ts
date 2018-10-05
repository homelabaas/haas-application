export enum ProvisionServerStatus {
    Clone = 1,
    StartVM = 2,
    Finished = 3,
    Initiate = 4,
    NotStarted = 5
}

export function StatusToString(status: ProvisionServerStatus) {
    switch (status) {
        case ProvisionServerStatus.Initiate:
            return "Started";
        case ProvisionServerStatus.Clone:
            return "Cloning";
        case ProvisionServerStatus.StartVM:
            return "Booting";
        case ProvisionServerStatus.Finished:
            return "Ready";
        case ProvisionServerStatus.NotStarted:
            return "Waiting";
    }
}
