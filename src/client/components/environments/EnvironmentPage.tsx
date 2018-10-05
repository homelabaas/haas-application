import * as React from "react";
import { hot } from "react-hot-loader";
import { Form, Table, Dropdown, Container } from "semantic-ui-react";
import { IEnvironment } from "../../../common/models/IEnvironment";
import * as api from "../../api";
import { Sockets } from "../../socket";
import { IDropdownSelection } from "../IDropdownSelection";
import { CreateEnvModal } from "./CreateEnvModal";
import { EnvironmentStatus, StatusToString } from "../../../common/models/EnvironmentStatus";

interface IEnvironmentPageState {
    Environments: IEnvironment[];
    TaskDropdown: IDropdownSelection[];
}

class EnvironmentPageComponent extends React.Component<{}, IEnvironmentPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Environments: [],
            TaskDropdown: [
                { key: "Terminate", value: "Terminate", text: "Terminate" }
            ]
        };
    }

    public async componentDidMount() {
        const environments = await api.getEnvironments();
        this.setState({ Environments: environments });
        Sockets().startEnvUpdateReceive(this.receiveEnvUpdate);
    }

    public componentWillUnmount() {
        Sockets().stopEnvUpdateReceive();
    }

    public TaskClick = async (evt: any, envId: number) => {
        if (evt) {
            const eventName = evt.target.innerText;
            if (eventName === "Terminate") {
                const environment = await api.getEnvironment(envId);
                environment.Status = EnvironmentStatus.OrderTerminate;
                await api.saveEnvironment(environment);
            }
        }
    }

    public EnvTable = (props: any) => {
        const environments = props.Environments;
        const listItems = environments.map((env: IEnvironment) => (
            <Table.Row key={env.Id}>
                <Table.Cell>{env.Name}</Table.Cell>
                <Table.Cell>{env.VMPrefix}</Table.Cell>
                <Table.Cell>{StatusToString(env.Status)}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="angle double down"
                    options={this.state.TaskDropdown}
                    text="Action"
                    onClose={(evt) => { this.TaskClick(evt, env.Id); } }
                />
                </Table.Cell>
            </Table.Row>));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>VM Prefix</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{listItems}</Table.Body>
            </Table>);
    }

    public render() {
        return (<Container>
                <h4 className="ui dividing header">Environments</h4>
                <CreateEnvModal />
                <this.EnvTable Environments={this.state.Environments} />
            </Container>
        );
    }

    private receiveEnvUpdate = (envUpdate: IEnvironment) => {
        const environments = Object.assign(this.state.Environments, {});
        const existingEnv = environments.find((p) => p.Id === envUpdate.Id);
        if (existingEnv) {
            environments[environments.indexOf(existingEnv)] = envUpdate;
        } else {
            environments.push(envUpdate);
        }
        this.setState({
            Environments: environments
        });
    }
}

export const EnvironmentPage = hot(module)(EnvironmentPageComponent);
