export enum VirtualMachineStatus {
    Requested = 0,
    StartProvision = 1,
    Clone = 2,
    StartVM = 3,
    Ready = 4,
    OrderTerminate = 5,
    Terminating = 6,
    Terminated = 7,
    CleanedUp = 8
}

export function StatusToString(status: VirtualMachineStatus) {
    switch (status) {
        case VirtualMachineStatus.Requested:
            return "Requested";
        case VirtualMachineStatus.StartProvision:
            return "Provisioning";
        case VirtualMachineStatus.Clone:
            return "Cloning";
        case VirtualMachineStatus.StartVM:
            return "Booting";
        case VirtualMachineStatus.Ready:
            return "Ready";
        case VirtualMachineStatus.OrderTerminate:
            return "Terminating";
        case VirtualMachineStatus.Terminating:
            return "Terminating";
        case VirtualMachineStatus.Terminated:
            return "Terminated";
        case VirtualMachineStatus.CleanedUp:
            return "Cleaned Up";
    }
}
