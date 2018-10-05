import * as React from "react";
import { hot } from "react-hot-loader";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IMessageData {
    messageState: string; // error or ok
    message: string;
}

const MessagePositive = (props: any) => (
    <Message positive>
      <Message.Header>OK</Message.Header>
      {props.children}
    </Message>
);

const MessageNegative = (props: any) => (
    <Message negative>
      <Message.Header>Error</Message.Header>
      {props.children}
    </Message>
);

const MessageDisplayComponent: React.StatelessComponent<IMessageData> = (props: any) => {
    if (props.messageState === "error") {
        return <MessageNegative>{props.message}</MessageNegative>;
    } else if (props.messageState === "ok") {
        return <MessagePositive>{props.message}</MessagePositive>;
    }
    return null;
};

export const MessageDisplay = hot(module)(MessageDisplayComponent);
