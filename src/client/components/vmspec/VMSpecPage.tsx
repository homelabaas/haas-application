import * as React from "react";
import { hot } from "react-hot-loader";
import { Table, Button, Icon, Container, Input } from "semantic-ui-react";
import * as api from "../../api";
import { IVMSpec } from "../../../common/models/IVMSpec";

interface ITableEditRow {
    isEditMode: boolean;
    id?: number;
    CPUs: number;
    RAMinGB: number;
    Name: string;
}

interface IVMSpecPageState {
    inAddMode: boolean;
    TableRows: ITableEditRow[];
}

class VMSpecPageComponent extends React.Component<{}, IVMSpecPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            inAddMode: false,
            TableRows: []
        };
    }

    public async componentDidMount() {
        const vmSpecs = await api.getVMSpecs();
        const tableRows: ITableEditRow[] = vmSpecs.map((p) => {
            return {
                isEditMode: false,
                id: p.Id,
                CPUs: p.CPUCount,
                RAMinGB: p.RAMinGB,
                Name: p.Name
            };
        });
        this.setState({
            TableRows: tableRows
        });
    }

    public ClickAddNew = async (event: React.MouseEvent<HTMLElement>) => {
        if (this.state.inAddMode) {
            // error to the user, already adding a row
        } else {
            const tablerows = [...this.state.TableRows, {
                isEditMode: true,
                id: null,
                Name: "",
                CPUs: 0,
                RAMinGB: 0
            } ];
            this.setState({
                inAddMode: true,
                TableRows: tablerows
            });
        }
    }

    public ClickEditRow = async (id: number, event: React.MouseEvent<HTMLElement>) => {
        const tablerows = Object.assign(this.state.TableRows, {});
        const changeRow = tablerows.find((p) => {
            return p.id === id;
        });
        changeRow.isEditMode = true;
        this.setState({
            TableRows: tablerows
        });
    }

    public ClickSaveRow = async (id: number, event: React.MouseEvent<HTMLElement>) => {
        const tablerows = Object.assign(this.state.TableRows, {});
        const changeRow = tablerows.find((p) => {
            return p.id === id;
        });
        if (id === null) {
            const saveVMSpec: IVMSpec = {
                CPUCount: changeRow.CPUs,
                Name: changeRow.Name,
                RAMinGB: changeRow.RAMinGB
            };
            const saveReturn = await api.saveVMSpec(saveVMSpec);
            if (saveReturn.Success) {
                changeRow.id = saveReturn.NewId;
            } else {
                // show error to user
            }
        } else {
            const saveVMSpec: IVMSpec = {
                Id: changeRow.id,
                CPUCount: changeRow.CPUs,
                Name: changeRow.Name,
                RAMinGB: changeRow.RAMinGB
            };
            const saveReturn = await api.saveVMSpec(saveVMSpec);
            if (!saveReturn.Success) {
                // show error to user
            }
        }
        changeRow.isEditMode = false;
        this.setState({
            inAddMode: false,
            TableRows: tablerows
        });
    }

    public changeTableColumnName = (id: number, event: any) => {
        const value = event.target.value;
        const tablerows = Object.assign(this.state.TableRows, {});
        const changeRow = tablerows.find((p) => {
            return p.id === id;
        });
        changeRow.Name = value;
        this.setState({
            TableRows: tablerows
        });
    }

    public changeTableColumnRAM = (id: number, event: any) => {
        const value = event.target.value;
        const tablerows = Object.assign(this.state.TableRows, {});
        const changeRow = tablerows.find((p) => {
            return p.id === id;
        });
        changeRow.RAMinGB = value;
        this.setState({
            TableRows: tablerows
        });
    }

    public changeTableColumnCPUs = (id: number, event: any) => {
        const value = event.target.value;
        const tablerows = Object.assign(this.state.TableRows, {});
        const changeRow = tablerows.find((p) => {
            return p.id === id;
        });
        changeRow.CPUs = value;
        this.setState({
            TableRows: tablerows
        });
    }

    public VMSpecTableRow = (props: any) => {
        const tableRow = props.TableRow as ITableEditRow;
        if (tableRow.isEditMode) {
            return (<Table.Row key={tableRow.id}>
                <Table.Cell collapsing>
                    <Button onClick={(evt) => this.ClickSaveRow(tableRow.id, evt)}>Save</Button>
                </Table.Cell>
                <Table.Cell>
                    <Input placeholder="Name" value={tableRow.Name}
                        onChange={(evt) => this.changeTableColumnName(tableRow.id, evt)} />
                </Table.Cell>
                <Table.Cell>
                    <Input placeholder="CPUs" value={tableRow.CPUs}
                        onChange={(evt) => this.changeTableColumnCPUs(tableRow.id, evt)} />
                </Table.Cell>
                <Table.Cell>
                    <Input placeholder="RAM in GB" value={tableRow.RAMinGB}
                        onChange={(evt) => this.changeTableColumnRAM(tableRow.id, evt)} />
                </Table.Cell>
            </Table.Row>);
        } else {
            return (<Table.Row key={tableRow.id}>
                <Table.Cell collapsing>
                    <Button onClick={(evt) => this.ClickEditRow(tableRow.id, evt)}>Edit</Button>
                </Table.Cell>
                <Table.Cell>{tableRow.Name}</Table.Cell>
                <Table.Cell>{tableRow.CPUs}</Table.Cell>
                <Table.Cell>{tableRow.RAMinGB}</Table.Cell>
            </Table.Row>);
        }
    }

    public VMSpecTable  = (props: any) => {
        const tableData = props.TableData as ITableEditRow[];
        const tableRows = tableData.map((tableEditRow: ITableEditRow) => (
            <this.VMSpecTableRow TableRow={tableEditRow} />));

        return (
            <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>CPUs</Table.HeaderCell>
                        <Table.HeaderCell>RAM in GB</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{tableRows}</Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="4">
                        <Button onClick={this.ClickAddNew} floated="right" icon
                            labelPosition="left" primary size="small">
                            <Icon name="user" /> Add New
                        </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }

    public render() {
        return (
            <Container>
                <h3 className="ui dividing header">Virtual Machine Specs</h3>
                <this.VMSpecTable TableData={this.state.TableRows} />
            </Container>
        );
    }
}

export const VMSpecPage = hot(module)(VMSpecPageComponent);
