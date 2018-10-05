import * as React from "react";
import { hot } from "react-hot-loader";
import { Table, Container, Button, Dropdown } from "semantic-ui-react";
import { ScalingGroupStatus, StatusToString } from "../../../common/models/ScalingGroupStatus";
import { CreateSGModal } from "./CreateSGModal";
import * as api from "../../api";
import { IDropdownSelection } from "../IDropdownSelection";
import { Sockets } from "../../socket";
import { IScalingGroup } from "../../../common/models/IScalingGroup";

interface ISGPageState {
    SGs: IScalingGroup[];
    TaskDropdown: IDropdownSelection[];
}

class SGPageComponent extends React.Component<{}, ISGPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            SGs: [],
            TaskDropdown: [
                { key: "Terminate", value: "Terminate", text: "Terminate" }
            ]
        };
    }

    public async componentDidMount() {
        const sgs = await api.getSGs();
        this.setState({ SGs: sgs });
        Sockets().startSGUpdateReceive(this.receiveSgUpdate);
    }

    public componentWillUnmount() {
        Sockets().stopSGUpdateReceive();
    }

    public TaskClick = async (evt: any, sgId: number) => {
        if (evt) {
            const eventName = evt.target.innerText;
            if (eventName === "Terminate") {
                const sg = await api.getSG(sgId);
                sg.Status = ScalingGroupStatus.OrderTerminate;
                await api.saveSG(sg);
            }
        }
    }

    public SGTable = (props: any) => {
        const SGs = props.SGs;
        const listItems = SGs.map((sg: IScalingGroup) => (
            <Table.Row key={sg.Id}>
                <Table.Cell>{sg.BaseMachineName}</Table.Cell>
                <Table.Cell>{sg.DesiredCount}</Table.Cell>
                <Table.Cell>{StatusToString(sg.Status)}</Table.Cell>
                <Table.Cell>{sg.EnvironmentName}</Table.Cell>
                <Table.Cell>
                <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="angle double down"
                    options={this.state.TaskDropdown}
                    text="Action"
                    onClose={(evt) => { this.TaskClick(evt, sg.Id); } }
                />
                </Table.Cell>
            </Table.Row>));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Base Name</Table.HeaderCell>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Environment</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{listItems}</Table.Body>
            </Table>);
    }

    public render() {
        return (<Container>
            <h3 className="ui dividing header">Scaling Groups</h3>
            <CreateSGModal />
            <this.SGTable SGs={this.state.SGs} />
        </Container>
        );
    }

    private receiveSgUpdate = (vmUpdate: IScalingGroup) => {
        const sgs = Object.assign(this.state.SGs, {});
        const existingVm = sgs.find((p) => p.Id === vmUpdate.Id);
        if (existingVm) {
            sgs[sgs.indexOf(existingVm)] = vmUpdate;
        } else {
            sgs.push(vmUpdate);
        }
        this.setState({
            SGs: sgs
        });
    }
}

export const SGPage = hot(module)(SGPageComponent);
