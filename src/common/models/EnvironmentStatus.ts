export enum EnvironmentStatus {
    New = 1,
    Creating = 2,
    Ready = 3,
    OrderTerminate = 4,
    Terminating = 5,
    Terminated = 6,
}

export function StatusToString(status: EnvironmentStatus) {
    switch (status) {
        case EnvironmentStatus.New:
            return "New";
        case EnvironmentStatus.Creating:
            return "Creating";
        case EnvironmentStatus.Ready:
            return "Ready";
        case EnvironmentStatus.OrderTerminate:
            return "Terminating";
        case EnvironmentStatus.Terminating:
            return "Terminating";
        case EnvironmentStatus.Terminated:
            return "Terminated";
    }
}
