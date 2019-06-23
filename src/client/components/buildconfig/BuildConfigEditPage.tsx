import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message, Dropdown, Label, Input } from "semantic-ui-react";
import * as api from "../../api";
import { IBuildConfig } from "../../../common/models/IBuildConfig";
import { MessageDisplay } from "../common/MessageDisplay";
import { IGenericReturn } from "../../../common/models/IGenericReturn";
import { IBuildType } from "../../../common/models/IBuildType";
import { ISOSelector } from "./ISOSelector";
import { TemplateSelector } from "./TemplateSelector";
import { IFileForDatastore } from "../../../common/models/IFileForDatastore";

interface IProps {
    match: {
        params: {
            id: string
        }
    };
}

interface IDropdownSelection {
    key: string;
    value: string;
    text: string;
}
interface IEditBuildConfigState {
    Id?: number;
    BuildConfigName: string;
    VMName: string;
    Host: string;
    HostId: string;
    HostSelected: boolean;
    Cluster: string;
    Datastore: string;
    Network: string;
    ISO: string;
    ISODatastore: string;
    SSHUsername: string;
    SSHPassword: string;
    Template: number;
    AppendBuildNumber: boolean;
    BuildTypes: IDropdownSelection[];
    BuildTypeId: string;
    Hosts: IDropdownSelection[];
    Datastores: IDropdownSelection[];
    Networks: IDropdownSelection[];
    Message: string;
    MessageState: string;
    ISODatastores: IDropdownSelection[];
    Filenames: IDropdownSelection[];
    Requirement: string;
    Templates: IDropdownSelection[];
}
class BuildConfigEditPageComponent extends React.Component<IProps, IEditBuildConfigState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Id: null,
            BuildConfigName: "",
            VMName: "",
            Host: "",
            HostId: "",
            HostSelected: false,
            Cluster: "",
            Datastore: "",
            Network: "",
            ISO: null,
            ISODatastore: "",
            SSHUsername: "",
            SSHPassword: "",
            Template: null,
            AppendBuildNumber: true,
            BuildTypeId: "",
            BuildTypes: [],
            Hosts: [],
            Datastores: [],
            Networks: [],
            Message: "",
            MessageState: "",
            ISODatastores: [],
            Filenames: [],
            Requirement: "",
            Templates: []
        };
    }

    public async componentDidMount() {
        const hosts = await api.getHosts();
        const buildTypes = await api.getBuildTypesByType("Packer");
        const existingBuildConfigs = await api.getBuildConfigs();
        const id = parseInt(this.props.match.params.id, 10);
        if (id === -1) {
            this.setState({
                Hosts: hosts.map((p: any) => ({ key: p.id, value: p.id, text: p.name})),
                BuildTypes: buildTypes.map((p: IBuildType) => ({
                    key: p.Id, value: p.Id, text: p.Type + " - " + p.Name})),
                Templates: existingBuildConfigs.map((p) => ({ key: p.Id.toString(), value: p.Id.toString(),
                    text: p.Name}))
            });
        } else {
            const loadBuildConfig = await api.getBuildConfig(id);
            const hostDetails = await api.getHostDetails(loadBuildConfig.HostId);
            const buildTypeDetails = await api.getBuildType(loadBuildConfig.BuilderDefinitionId);
            let filenames: IFileForDatastore[] = [];
            let filenameDropdown: any[] = [];
            let datastoreId = null;
            if (loadBuildConfig.ISO) {
                const ISODatastore = loadBuildConfig.ISO.substring(1, loadBuildConfig.ISO.indexOf("]"));
                const dataStores = await api.getDatastores();
                datastoreId = dataStores.find((p) => p.name === ISODatastore).id;
                filenames = await api.getFilesForDatastore(datastoreId, "*.iso");
                filenameDropdown = filenames.map((p) => ({
                    key: p.fullFilePath, value: p.fullFilePath, text: p.fileDisplay}));
            }
            this.setState({
                Id: loadBuildConfig.Id,
                BuildConfigName: loadBuildConfig.Name,
                VMName: loadBuildConfig.VMName,
                Host: loadBuildConfig.Host,
                HostId: loadBuildConfig.HostId,
                Cluster: loadBuildConfig.Cluster,
                HostSelected: true,
                Datastore: loadBuildConfig.Datastore,
                Network: loadBuildConfig.Network,
                ISO: loadBuildConfig.ISO,
                SSHUsername: loadBuildConfig.SSHUsername,
                SSHPassword: loadBuildConfig.SSHPassword,
                Template: loadBuildConfig.TemplatePackerBuildId,
                AppendBuildNumber: loadBuildConfig.AppendBuildNumber,
                BuildTypeId: loadBuildConfig.BuilderDefinitionId,
                Hosts: hosts.map((p: any) => ({ key: p.id, value: p.id, text: p.name})),
                BuildTypes: buildTypes.map((p: IBuildType) => ({
                    key: p.Id, value: p.Id, text: p.Type + " - " + p.Name})),
                Templates: existingBuildConfigs.map((p) => ({ key: p.Id.toString(), value: p.Id.toString(),
                    text: p.Name})),
                Networks: hostDetails.Networks.map((p) => ({ key: p.name, value: p.name, text: p.name})),
                Datastores: hostDetails.Datastores.map((p) => ({ key: p.name, value: p.name, text: p.name})),
                ISODatastores: hostDetails.Datastores.map((p) => ({ key: p.id, value: p.id, text: p.name})),
                Requirement: buildTypeDetails.Requirement,
                Filenames: filenameDropdown,
                ISODatastore: datastoreId
            });
        }
    }

    public handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name as string;
        const newState = Object.assign(this.state, { [name]: value });
        this.setState(newState);
    }

    public handleHostChange = async (event: any, data: any) => {
        const name = data.name;
        const hostDetails = await api.getHostDetails(data.value);
        this.setState({
          Host: hostDetails.name,
          HostId: data.value,
          HostSelected: true,
          Cluster: hostDetails.Cluster,
          Networks: hostDetails.Networks.map((p) => ({ key: p.name, value: p.name, text: p.name})),
          Datastores: hostDetails.Datastores.map((p) => ({ key: p.name, value: p.name, text: p.name})),
          ISODatastores: hostDetails.Datastores.map((p) => ({ key: p.id, value: p.id, text: p.name})),
        });
    }

    public handleBuildTypeChange = async (event: any, data: any) => {
        const buildTypeDetails = await api.getBuildType(data.value);
        if (buildTypeDetails.Requirement === "ISO") {
            this.setState({
                Requirement: buildTypeDetails.Requirement,
                BuildTypeId: data.value,
                ISO: null
            });
        } else if (buildTypeDetails.Requirement === "Template") {
            this.setState({
                Requirement: buildTypeDetails.Requirement,
                BuildTypeId: data.value,
                Template: null
            });
        } else {
            this.setState({
                Requirement: buildTypeDetails.Requirement,
                BuildTypeId: data.value
            });
        }
    }

    public handleDropwdownChange = (event: any, data: any) => {
        const name = data.name;

        const newState = Object.assign(this.state, { [name]: data.value });
        this.setState(newState);
    }

    public handleDropwdownFilenameChange = async (event: any, data: any) => {
        this.setState({
            ISO: data.value,
            Template: null
        });
    }

    public handleISODatastoreChange = async (event: any, data: any) => {
        const filenames = await api.getFilesForDatastore(data.value, "*.iso");
        this.setState({
            ISODatastore: data.value,
            Filenames: filenames.map((p) => ({ key: p.fullFilePath, value: p.fullFilePath, text: p.fileDisplay})),
            Template: null
        });
    }

    public handleTemplateChange = async (event: any, data: any) => {
        this.setState({
          Template: data.value
        });
    }

    public ClickSave = async (event: React.MouseEvent<HTMLElement>) => {
        const buildConfigToSave: IBuildConfig = {
            AppendBuildNumber: this.state.AppendBuildNumber,
            BuilderDefinitionId: this.state.BuildTypeId,
            Name: this.state.BuildConfigName,
            VMName: this.state.VMName,
            Datastore: this.state.Datastore,
            Host: this.state.Host,
            HostId: this.state.HostId,
            Cluster: this.state.Cluster,
            ISO: this.state.ISO,
            Network: this.state.Network,
            TemplatePackerBuildId: this.state.Template,
            SSHUsername: this.state.SSHUsername,
            SSHPassword: this.state.SSHPassword
        };
        if (this.state.Id) {
            buildConfigToSave.Id = this.state.Id;
        }
        const returnStatus = await api.saveBuildConfig(buildConfigToSave);
        if (returnStatus.Success) {
            if (returnStatus.NewId) {
                this.setState({
                    Message: "Successfully saved Build Config.",
                    MessageState: "ok",
                    Id: returnStatus.NewId
                });
            } else {
                this.setState({
                    Message: "Successfully saved Build Config.",
                    MessageState: "ok"
                });
            }
        } else {
            this.setState({
                Message: returnStatus.Message,
                MessageState: "error"
            });
        }
    }

    public render() {
        return (
            <Form>
                <h3 className="ui dividing header">Build Configuration</h3>
                <Form.Field>
                    <label>Build Definition</label>
                    <Dropdown fluid search selection value={this.state.BuildTypeId} options={this.state.BuildTypes}
                        placeholder="Build Type" onChange={this.handleBuildTypeChange} name="BuildTypeId" />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field required>
                        <label>Build Config Name</label>
                        <Input placeholder="Name" value={this.state.BuildConfigName}
                            onChange={this.handleInputChange} name="BuildConfigName" />
                    </Form.Field>
                    <Form.Field required>
                        <label>VM Name</label>
                        <Input placeholder="VM Name" value={this.state.VMName}
                            onChange={this.handleInputChange} name="VMName" />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field required>
                        <label>SSH Username</label>
                        <Input placeholder="SSH Username" value={this.state.SSHUsername}
                            onChange={this.handleInputChange} name="SSHUsername" />
                    </Form.Field>
                    <Form.Field required>
                        <label>SSH Password</label>
                        <Input placeholder="SSH Password" value={this.state.SSHPassword}
                            onChange={this.handleInputChange} name="SSHPassword" />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <Checkbox checked={this.state.AppendBuildNumber} label="Append Build Number"
                        onChange={this.handleInputChange} name="AppendBuildNumber" />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Host</label>
                        <Form.Select value={this.state.HostId} options={this.state.Hosts} placeholder="Host"
                            onChange={this.handleHostChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Cluster</label>
                        <Input value={this.state.Cluster} readOnly />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Datastore</label>
                        <Form.Select value={this.state.Datastore} options={this.state.Datastores} placeholder="Datastore"
                            onChange={this.handleDropwdownChange} name="Datastore" />
                    </Form.Field>
                    <Form.Field>
                        <label>Network</label>
                        <Form.Select value={this.state.Network} options={this.state.Networks} placeholder="Network"
                            onChange={this.handleDropwdownChange} name="Network" />
                    </Form.Field>
                </Form.Group>
                <ISOSelector Filenames={this.state.Filenames}
                    Requirement={this.state.Requirement}
                    ISODatastores={this.state.ISODatastores}
                    SelectedISO={this.state.ISO}
                    SelectedDatastore={this.state.ISODatastore}
                    SelectISOFilename={this.handleDropwdownFilenameChange}
                    DatastoreChange={this.handleISODatastoreChange} />
                <TemplateSelector Templates={this.state.Templates}
                    SelectedTemplate={this.state.Template}
                    TemplateChange={this.handleTemplateChange}
                    Requirement={this.state.Requirement} />
                <Button onClick={this.ClickSave}>Save</Button>
                <MessageDisplay messageState={this.state.MessageState} message={this.state.Message} />
            </Form>
        );
    }
}

export const BuildConfigEditPage = hot(module)(BuildConfigEditPageComponent);
