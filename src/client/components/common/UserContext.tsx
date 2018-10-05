import * as React from "react";

export enum MessageLevel {
    Info,
    Warning,
    Error
}

export interface IUserMessage {
    Text: string;
    Level: MessageLevel;
}

export interface IUserContext {
    Username: string;
    LastMessages: IUserMessage[];
}

const newUser: IUserContext = {
    Username: "Admin",
    LastMessages: []
};

export const UserContext = React.createContext({
    user: newUser,
    // tslint:disable-next-line:no-empty
    addMessage: (message: IUserMessage) => {}
});
