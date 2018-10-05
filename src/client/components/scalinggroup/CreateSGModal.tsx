import * as React from "react";
import { hot } from "react-hot-loader";
import { Dropdown, Button, Modal, Header, Icon, Form, TextArea } from "semantic-ui-react";
import * as api from "../../api";
import { IBuildType } from "../../../common/models/IBuildType";
import { ICreateSGRequest } from "../../../common/models/ICreateSGRequest";
import { IDropdownSelection } from "../IDropdownSelection";
import { IDictionary } from "../IDictionary";
import { TagEditor } from "../common/TagEditor";

interface ICreateSGState {
    ModalOpen: boolean;
    VmSpecDropdown: IDropdownSelection[];
    ArtifactDropDown: IDropdownSelection[];
    UserDataLoadDropDown: IDropdownSelection[];
    NetworkSegmentDropDown: IDropdownSelection[];
    SelectedVMSpec: string;
    SelectedNetworkSegment: string;
    SelectedArtifact: string;
    SelectedUserData: string;
    VMName: string;
    UserData: string;
    EnvironmentName: string;
    DesiredCount: number;
    Tags: IDictionary<string>;
}

class CreateSGModalComponent extends React.Component<{}, ICreateSGState> {

    private loadedUserData: IBuildType[];

    constructor(props: any) {
        super(props);
        this.state = {
            ModalOpen: false,
            VmSpecDropdown: [],
            ArtifactDropDown: [],
            UserDataLoadDropDown: [],
            NetworkSegmentDropDown: [],
            SelectedVMSpec: "",
            SelectedNetworkSegment: "",
            SelectedArtifact: "",
            SelectedUserData: "",
            VMName: "",
            UserData: "",
            EnvironmentName: "",
            DesiredCount: 0,
            Tags: {}
        };
    }

    public async componentDidMount() {
        const vmSpecs = await api.getVMSpecs();
        const buildsAndArtifacts = await api.getBuildsAndArtifacts("UserData");
        const networkSegments = await api.getNetworkSegments();
        this.loadedUserData = await api.getBuildTypesByType("Provisioner");
        this.setState({
            NetworkSegmentDropDown: networkSegments.map((p) => {
                return {
                    key: p.Id.toString(),
                    value: p.Id.toString(),
                    text: p.Name
                };
            }),
            VmSpecDropdown: vmSpecs.map((p) => {
                return {
                    key: p.Id.toString(),
                    value: p.Id.toString(),
                    text: p.Name + " VCPU: " + p.CPUCount.toString() + " RAM: " + p.RAMinGB.toString()
                };
            }),
            ArtifactDropDown: buildsAndArtifacts.map((p) => {
                return {
                    key: p.Artifact.Id.toString(),
                    value: p.Artifact.Id.toString(),
                    text:  p.Build.PackerBuildConfig.Name + " " + p.Build.BuildNumber
                };
            }),
            UserDataLoadDropDown: this.loadedUserData.map((p) => {
                return {
                    key: p.Id,
                    value: p.Id,
                    text:  p.Name
                };
            })
        });
    }

    public handleOpen = () => this.setState({ ModalOpen: true });

    public handleClose = async () => {
        this.setState({ ModalOpen: false });
    }

    public handleCreate = async () => {
        const createSg: ICreateSGRequest = {
            ArtifactId: parseInt(this.state.SelectedArtifact, 10),
            BaseMachineName: this.state.VMName,
            VMSpecId: parseInt(this.state.SelectedVMSpec, 10),
            UserDataAsBase64: btoa(this.state.UserData),
            NetworkSegmentId: parseInt(this.state.SelectedNetworkSegment, 10),
            EnvironmentName: this.state.EnvironmentName,
            DesiredCount: this.state.DesiredCount,
            Tags: this.state.Tags
        };
        const returnValue = await api.createSG(createSg);
        this.setState({ ModalOpen: false });
    }

    public handleVMSpecChange = async (event: any, data: any) => {
        const vmSpecId = data.value;
        this.setState({
            SelectedVMSpec: vmSpecId
        });
    }

    public handleNetworkSegmentChange = async (event: any, data: any) => {
        const networkSegmentId = data.value;
        this.setState({
            SelectedNetworkSegment: networkSegmentId
        });
    }

    public handleArtifactChange = async (event: any, data: any) => {
        const artifactId = data.value;
        this.setState({
            SelectedArtifact: artifactId
        });
    }

    public handleUserDataChange = async (event: any, data: any) => {
        const userDataId = data.value;
        const userData = await this.loadUserData(userDataId);
        this.setState({
            SelectedUserData: userDataId,
            UserData: userData
        });
    }

    public handleVMNameChange = (event: any) => {
        const vmName = event.target.value;
        this.setState({
            VMName: vmName
        });
    }

    public handleEnvironmentNameChange = (event: any) => {
        const envName = event.target.value;
        this.setState({
            EnvironmentName: envName
        });
    }

    public handleDesiredCountChange = (event: any) => {
        const envName = event.target.value;
        this.setState({
            DesiredCount: envName
        });
    }

    public loadUserData = async (userDataId: string): Promise<string> => {
        for (const buildType of this.loadedUserData) {
            if (buildType.Id === userDataId) {
                const lastIndex = buildType.Id.lastIndexOf("/");
                const contentId = buildType.Id.substr(0, lastIndex) + "/" +  buildType.File;
                const content = await api.getContent(contentId);
                return content.content;
            }
        }
    }

    public handleTagChange = (tags: IDictionary<string>) => {
        this.setState({
            Tags: tags
        });
    }

    public render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>New SG</Button>}
                closeIcon
                open={this.state.ModalOpen}
                onClose={this.handleClose}
                size="small">
                <Header icon="browser" content="Create New SG" />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <input placeholder="Name" value={this.state.VMName}
                                    onChange={this.handleVMNameChange} />
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Dropdown fluid search selection value={this.state.SelectedVMSpec}
                                    options={this.state.VmSpecDropdown} placeholder="Spec"
                                    onChange={this.handleVMSpecChange} />
                            </Form.Field>
                            <Form.Field>
                                <Dropdown fluid search selection value={this.state.SelectedNetworkSegment}
                                    options={this.state.NetworkSegmentDropDown} placeholder="Network"
                                    onChange={this.handleNetworkSegmentChange} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <input placeholder="Environment Name" value={this.state.EnvironmentName}
                                        onChange={this.handleEnvironmentNameChange} />
                            </Form.Field>
                            <Form.Field>
                                <input placeholder="Desired Number" value={this.state.DesiredCount}
                                        onChange={this.handleDesiredCountChange} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Dropdown fluid search selection value={this.state.SelectedArtifact}
                                    options={this.state.ArtifactDropDown} placeholder="Artifact"
                                    onChange={this.handleArtifactChange} />
                            </Form.Field>
                            <Form.Field>
                                <Dropdown fluid search selection value={this.state.SelectedUserData}
                                    options={this.state.UserDataLoadDropDown} placeholder="User Data"
                                    onChange={this.handleUserDataChange} />
                            </Form.Field>
                        </Form.Group>
                        <TagEditor Tags={this.state.Tags} onChangeTags={this.handleTagChange} />
                        <Form.Field>
                        <TextArea placeholder="User Data" onChange={this.handleUserDataChange}
                            value={this.state.UserData} style={{ minHeight: 300 }} />
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

export const CreateSGModal = hot(module)(CreateSGModalComponent);
