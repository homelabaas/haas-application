import * as React from "react";
import { hot } from "react-hot-loader";
import { INetworkSegment } from "../../../common/models/INetworkSegment";
import * as api from "../../api";
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { networkSegmentPageUrl } from "../../../common/routeDefinitions";

interface INetworkPageState {
    NetworkSegments: INetworkSegment[];
}

class NetworkPageComponent extends React.Component<{}, INetworkPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            NetworkSegments: []
        };
    }

    public async componentDidMount() {
        const networkSegments = await api.getNetworkSegments();
        this.setState({
            NetworkSegments: networkSegments
        });
    }

    public ListSegments = (props: any) => {
        const builds = props.builds;
        const listItems = builds.map((networkSegment: INetworkSegment) => (
        <List.Item key={networkSegment.Id}>
            <List.Content>
                <Link to={networkSegmentPageUrl(networkSegment.Id)}>
                    {networkSegment.Name}
                </Link>
            </List.Content>
        </List.Item>
        ));
        return <List divided verticalAlign="middle">{listItems} </List>;
    }

    public render() {
        return (
            <div className="row">
                <h3 className="ui dividing header">Network Segments</h3>
                <Link to="/networksegmentedit/-1">
                    <Button primary>New</Button>
                </Link>
                <this.ListSegments builds={this.state.NetworkSegments} />
            </div>
        );
    }
}

export const NetworkPage = hot(module)(NetworkPageComponent);
