import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Form, Container, Button, Grid, Table, Icon } from "semantic-ui-react";
import { INetworkSegment } from "../../../common/models/INetworkSegment";
import * as api from "../../api";
import { editNetworkSegmentPageUrl } from "../../../common/routeDefinitions";
import { INetworkIPAssignment } from "../../../common/models/INetworkIPAssignment";
interface IProps {
    match: {
        params: {
            id: string
        }
    };
}

interface IDisplayNetworkSegmentState {
    DisplayNetworkSegment: INetworkSegment;
}

class NetworkSegmentDisplayPageComponent extends React.Component<IProps, IDisplayNetworkSegmentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            DisplayNetworkSegment: {
                Id: null,
                Name: "",
                StartIP: "",
                EndIP: "",
                SubnetMask: "",
                Gateway: "",
                DNS1: "",
                DNS2: "",
                IPs: []
            }
        };
    }

    public async componentDidMount() {
        const id = parseInt(this.props.match.params.id, 10);
        const loadNetworkSegment = await api.getNetworkSegment(id);
        this.setState({
            DisplayNetworkSegment: loadNetworkSegment
        });
    }

    public ClickPopulate = async (event: React.MouseEvent<HTMLElement>) => {
        const id = parseInt(this.props.match.params.id, 10);
        const returnval = await api.populateNetworkSegment(id);
        const newNetworkSegment = await api.getNetworkSegment(id);
        this.setState({
            DisplayNetworkSegment: newNetworkSegment
        });
    }

    public IPTable = (props: any) => {
        const IPs = props.IPs;
        const listItems = IPs.map((ip: INetworkIPAssignment) => (
            <Table.Row key={ip.IP}>
                <Table.Cell>{ip.IP}</Table.Cell>
                <Table.Cell>{ip.VirtualMachine ? ip.VirtualMachine.MachineName : ""}</Table.Cell>
            </Table.Row>));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>VM</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{listItems}</Table.Body>
            </Table>);
    }

    public render() {
        return (
            <Container>
                <Link to="/network"><Icon name="angle double left" />Network Segments</Link>
                <h3 className="ui dividing header">Network Segment</h3>
                <Grid celled container stackable>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <h3>Name</h3>
                            <div>{this.state.DisplayNetworkSegment ? this.state.DisplayNetworkSegment.Name : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Start IP</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.StartIP : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>End IP</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.EndIP : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h3>Subnet Mask</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.SubnetMask : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Gateway</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.Gateway : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h3>DNS 1</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.DNS1 : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>DNS 2</h3>
                            <div>{this.state.DisplayNetworkSegment ?
                                this.state.DisplayNetworkSegment.DNS2 : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Button as={Link} to={editNetworkSegmentPageUrl(this.state.DisplayNetworkSegment.Id)}>Edit</Button>
                <Button onClick={this.ClickPopulate}>Populate</Button>
                <Button>Delete</Button>
                <h3 className="ui dividing header">IPs</h3>
                <this.IPTable IPs={this.state.DisplayNetworkSegment.IPs} />
            </Container>
        );
    }
}

export const NetworkSegmentDisplayPage = hot(module)(NetworkSegmentDisplayPageComponent);
