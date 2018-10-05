import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { IBuild } from "./../../../common/models/IBuild";
import * as api from "../../api";
import { Message, ListItem } from "semantic-ui-react";
import { BuildItemStatus, StatusToString } from "../../../common/models/BuildItemStatus";
import { Sockets } from "../../socket";
import { ENAMETOOLONG } from "constants";
import { BuildList, IBuildListItem } from "../common/BuildList";

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
