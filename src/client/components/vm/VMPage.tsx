import * as React from "react";
import { hot } from "react-hot-loader";
import { Table, Container, Button, Dropdown } from "semantic-ui-react";
import { IVirtualMachine } from "../../../common/models/IVirtualMachine";
import { StatusToString, VirtualMachineStatus } from "../../../common/models/VirtualMachineStatus";
import { CreateVMModal } from "./CreateVMModal";
import * as api from "../../api";
import { IDropdownSelection } from "../IDropdownSelection";
import { Sockets } from "../../socket";

interface IVMPageState {
    VMs: IVirtualMachine[];
    TaskDropdown: IDropdownSelection[];
}

class VMPageComponent extends React.Component<{}, IVMPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            VMs: [],
            TaskDropdown: [
                { key: "Terminate", value: "Terminate", text: "Terminate" }
            ]
        };
    }

    public async componentDidMount() {
        const vms = await api.getVMs();
        this.setState({ VMs: vms });
        Sockets().startVMUpdateReceive(this.receiveVmUpdate);
    }

    public componentWillUnmount() {
        Sockets().stopVMUpdateReceive();
    }

    public TaskClick = async (evt: any, vmId: number) => {
        if (evt) {
            const eventName = evt.target.innerText;
            if (eventName === "Terminate") {
                const vm = await api.getVM(vmId);
                vm.Status = VirtualMachineStatus.OrderTerminate;
                await api.saveVM(vm);
            }
        }
    }

    public VMTable = (props: any) => {
        const VMs = props.VMs;
        const listItems = VMs.map((vm: IVirtualMachine) => (
            <Table.Row key={vm.Id}>
                <Table.Cell>{vm.MachineName}</Table.Cell>
                <Table.Cell>{vm.NetworkIPAssignmentId}</Table.Cell>
                <Table.Cell>{StatusToString(vm.Status)}</Table.Cell>
                <Table.Cell>{vm.EnvironmentName}</Table.Cell>
                <Table.Cell>
                <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="angle double down"
                    options={this.state.TaskDropdown}
                    text="Action"
                    onClose={(evt) => { this.TaskClick(evt, vm.Id); } }
                />
                </Table.Cell>
            </Table.Row>));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
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
            <h3 className="ui dividing header">Virtual Machines</h3>
            <CreateVMModal />
            <this.VMTable VMs={this.state.VMs} />
        </Container>
        );
    }

    private receiveVmUpdate = (vmUpdate: IVirtualMachine) => {
        const vms = Object.assign(this.state.VMs, {});
        const existingVm = vms.find((p) => p.Id === vmUpdate.Id);
        if (existingVm) {
            vms[vms.indexOf(existingVm)] = vmUpdate;
        } else {
            vms.push(vmUpdate);
        }
        this.setState({
            VMs: vms
        });
    }
}

export const VMPage = hot(module)(VMPageComponent);
