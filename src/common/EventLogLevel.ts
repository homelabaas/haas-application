export enum EventLogLevel {
    Debug,
    Info,
    Warning,
    Error,
    Fatal
}
export const EventLogLevelToString = (eventLogLevel: EventLogLevel): string => {
    switch (eventLogLevel) {
        case EventLogLevel.Debug:
            return "Debug";
        case EventLogLevel.Info:
            return "Info";
        case EventLogLevel.Warning:
            return "Warning";
        case EventLogLevel.Error:
            return "Error";
        case EventLogLevel.Fatal:
            return "Fatal";
        default:
            break;
    }
};
