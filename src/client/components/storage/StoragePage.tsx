import * as React from "react";
import { hot } from "react-hot-loader";

interface IStoragePageState {
}

class StoragePageComponent extends React.Component<{}, IStoragePageState> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    public async componentDidMount() {
        //
    }

    public render() {
        return (<div>
            Storage
        </div>
        );
    }
}

export const StoragePage = hot(module)(StoragePageComponent);
