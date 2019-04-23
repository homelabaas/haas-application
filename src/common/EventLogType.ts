export enum EventLogType {
    VirtualMachine,
    ScalingGroup,
    Environment
}

export const EventLogTypeToString = (eventLogType: EventLogType): string => {
    switch (eventLogType) {
        case EventLogType.VirtualMachine:
            return "VirtualMachine";
            case EventLogType.ScalingGroup:
            return "ScalingGroup";
            case EventLogType.Environment:
            return "Environment";
        default:
            break;
    }
};

export const StringToEventLogType = (eventLogTypeString: string): EventLogType => {
    if (eventLogTypeString === "VirtualMachine") {
        return EventLogType.VirtualMachine;
    } else if (eventLogTypeString === "Environment") {
        return EventLogType.Environment;
    } else if (eventLogTypeString === "ScalingGroup") {
        return EventLogType.ScalingGroup;
    }
};
