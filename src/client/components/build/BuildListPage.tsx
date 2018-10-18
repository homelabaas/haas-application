import * as React from "react";
import { hot } from "react-hot-loader";
import { BuildList } from "../common/BuildList";

class BuildListPageComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
          <div className="row">
            <h3 className="ui dividing header">Builds</h3>
            <BuildList />
          </div>
       );
    }
}

export const BuildListPage = hot(module)(BuildListPageComponent);
