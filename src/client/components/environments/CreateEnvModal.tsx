import * as yaml from "js-yaml";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";
import { IEnvironmentDefinition } from "../../../common/models/IEnvironmentDefinition";
import * as api from "../../api";

interface ICreateEnvState {
    ModalOpen: boolean;
    EnvironmentYaml: string;
}

class CreateEnvModalComponent extends React.Component<{}, ICreateEnvState> {

    constructor(props: any) {
        super(props);
        this.state = {
            ModalOpen: false,
            EnvironmentYaml: ""
        };
    }

    public async componentDidMount() {
       //
    }

    public handleOpen = () => this.setState({ ModalOpen: true });

    public handleClose = async () => {
        this.setState({ ModalOpen: false });
    }

    public handleCreate = async () => {
        const environmentYaml = yaml.safeLoad(this.state.EnvironmentYaml) as IEnvironmentDefinition;
        const startingValues = await api.provisionEnvironment(environmentYaml);
        this.setState({ ModalOpen: false });
    }

    public handleYamlChange = async (event: any, data: any) => {
        const envYaml = data.value;
        this.setState({
            EnvironmentYaml: envYaml
        });
    }

    public render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>New Environment</Button>}
                closeIcon
                open={this.state.ModalOpen}
                onClose={this.handleClose}
                size="small">
                <Header icon="browser" content="Create New Environment" />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <TextArea placeholder="Environment Definition" onChange={this.handleYamlChange}
                                value={this.state.EnvironmentYaml} style={{ minHeight: 300 }} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={this.handleCreate} inverted>
                        <Icon name="checkmark" /> Create
                    </Button>
                </Modal.Actions>
            </Modal>);
    }
}

export const CreateEnvModal = hot(module)(CreateEnvModalComponent);
