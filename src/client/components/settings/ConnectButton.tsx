import * as React from "react";
import { hot } from "react-hot-loader";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IConnectButtonData {
    connectedState: boolean;
    clickConnect: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
    clickDisconnect: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
}

const ConnectButtonComponent: React.StatelessComponent<IConnectButtonData> = (props: any) => {
    const connectedState = props.connectedState;
    if (!connectedState) {
        return <Button onClick={props.clickConnect}>
            Connect
        </Button>;
    } else {
        return <Button onClick={props.clickDisconnect}>
            Disconnect
        </Button>;
    }
};

export const ConnectButton = hot(module)(ConnectButtonComponent);
