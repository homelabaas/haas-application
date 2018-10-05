export enum BuildItemStatus {
    New = 1,
    Processing = 2,
    Success = 3,
    Errors = 4,
    Archived = 5,
    ErrorStarting = 6,
    Cancelled = 7,
    Starting = 8
}

export function StatusToString(status: BuildItemStatus) {
    switch (status) {
        case BuildItemStatus.New:
            return "In Queue";
        case BuildItemStatus.Processing:
            return "Build in Progress";
        case BuildItemStatus.ErrorStarting:
            return "Never Started Due to Error";
        case BuildItemStatus.Errors:
            return "Completed with Errors";
        case BuildItemStatus.Success:
            return "Completed Successfully";
        case BuildItemStatus.Cancelled:
            return "Cancelled by User";
        case BuildItemStatus.Archived:
            return "Archived";
        case BuildItemStatus.Starting:
            return "Preparing";
    }
}
