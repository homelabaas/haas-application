export enum ScalingGroupStatus {
    New = 1,
    Creating = 2,
    Stable = 3,
    ScalingUp = 4,
    ScalingDown = 5,
    OrderTerminate = 6,
    Terminating = 7,
    Terminated = 8,
}

export function StatusToString(status: ScalingGroupStatus) {
    switch (status) {
        case ScalingGroupStatus.New:
            return "New";
        case ScalingGroupStatus.Creating:
            return "Creating";
        case ScalingGroupStatus.Stable:
            return "Stable";
        case ScalingGroupStatus.ScalingUp:
            return "Scaling Up";
        case ScalingGroupStatus.ScalingDown:
            return "Scaling Down";
        case ScalingGroupStatus.OrderTerminate:
            return "Terminating";
        case ScalingGroupStatus.Terminating:
            return "Terminating";
        case ScalingGroupStatus.Terminated:
            return "Terminated";
    }
}
