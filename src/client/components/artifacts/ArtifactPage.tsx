import * as React from "react";
import { hot } from "react-hot-loader";
import { Table, Container, Button, Dropdown } from "semantic-ui-react";
import * as api from "../../api";
import { IDropdownSelection } from "../IDropdownSelection";
import { Sockets } from "../../socket";
import { IBuildAndArtifact } from "../../../common/models/IBuildAndArtifact";

interface IVMPageState {
    Artifacts: IBuildAndArtifact[];
    TaskDropdown: IDropdownSelection[];
}

class ArtifactPageComponent extends React.Component<{}, IVMPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Artifacts: [],
            TaskDropdown: [
                { key: "Delete", value: "Delete", text: "Delete" }
            ]
        };
    }

    public async componentDidMount() {
        const artifacts = await api.getBuildsAndArtifactsAll();
        this.setState({ Artifacts: artifacts });
    }

    public TaskClick = async (evt: any, artifactId: number) => {
        if (evt) {
            const eventName = evt.target.innerText;
            if (eventName === "Delete") {
                // Delete this artifact
            }
        }
    }

    public ArtifactTable = (props: any) => {
        const Artifacts = props.Artifacts;
        const listItems = Artifacts.map((artifact: IBuildAndArtifact) => (
            <Table.Row key={artifact.Artifact.Id}>
                <Table.Cell>{artifact.Artifact.Name}</Table.Cell>
                <Table.Cell>{artifact.Artifact.Type}</Table.Cell>
                <Table.Cell>{artifact.Artifact.Feature}</Table.Cell>
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
                    onClose={(evt) => { this.TaskClick(evt, artifact.Artifact.Id); } }
                />
                </Table.Cell>
            </Table.Row>));
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Feature</Table.HeaderCell>
                        <Table.HeaderCell>Environment</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{listItems}</Table.Body>
            </Table>);
    }

    public render() {
        return (<Container>
            <h3 className="ui dividing header">Artifacts</h3>
            <this.ArtifactTable Artifacts={this.state.Artifacts} />
        </Container>
        );
    }
}

export const ArtifactPage = hot(module)(ArtifactPageComponent);
