import * as React from "react";
import { hot } from "react-hot-loader";
import { Button, Form, Message, Input } from "semantic-ui-react";
import * as api from "../../api";
import { MessageDisplay } from "../common/MessageDisplay";
import { ConnectButton } from "./ConnectButton";
import { TextField } from "./TextField";
import { IVCenterSettings } from "../../../common/models/IVcenterSettings";
import { IMiniDNSSettings } from "../../../common/models/IMiniDNSSettings";
import { IApplicationSettings } from "../../../common/models/IApplicationSettings";
import { IMinioSettingsPost } from "../../../common/models/IMinioSettingsPost";

interface ISettingsPageState {
    vcenterSettings: IVCenterSettings;
    miniDnsSettings: IMiniDNSSettings;
    applicationSettings: IApplicationSettings;
    minioSettings: IMinioSettingsPost;
    vcenterIsConnected: boolean;
    vcentermessageState: string;
    vcentermessage: string;
    minidnsmessageState: string;
    minidnsmessage: string;
    applicationmessageState: string;
    applicationmessage: string;
    miniomessageState: string;
    miniomessage: string;
}

class SettingsPageComponent extends React.Component<{}, ISettingsPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            vcenterSettings: {
                DefaultFolder: "",
                Password: "",
                URL: "",
                Username: ""
            },
            miniDnsSettings: {
                address: "",
                defaultDomain: "",
                url: ""
            },
            applicationSettings: {
                URL: ""
            },
            minioSettings: {
                AccessKey: "",
                ContentBucket: "",
                SecretKey: "",
                URL: ""
            },
            vcenterIsConnected: false,
            vcentermessageState: "",
            vcentermessage: "",
            minidnsmessageState: "",
            minidnsmessage: "",
            applicationmessageState: "",
            applicationmessage: "",
            miniomessageState: "",
            miniomessage: ""
        };
    }

    public async componentDidMount() {
        const apiStatus = await api.getStatus();
        const vcenterSettings = await api.getVCenterSettings();
        const miniDnsSettings = await api.getMiniDnsSettings();
        const applicationSettings = await api.getApplicationSettings();
        const minioSettings = await api.getMinioSettings();
        this.setState({
            vcenterIsConnected: apiStatus.VcenterConnected,
            vcenterSettings,
            miniDnsSettings,
            applicationSettings,
            minioSettings
        });
    }

    public clickConnect = async (event: React.MouseEvent<HTMLElement>) => {
        const returnStatus = await api.postVCenterSettings(this.state.vcenterSettings);
        // based on return status we want to display the message positive/negative
        if (returnStatus.Success) {
            this.setState({
                vcenterIsConnected: true,
                vcentermessage: "Successfully connected to VCenter server.",
                vcentermessageState: "ok"
            });
        } else {
            this.setState({
                vcenterIsConnected: false,
                vcentermessage: returnStatus.Message,
                vcentermessageState: "error"
            });
        }
    }

    public clickSaveMinio = async (event: React.MouseEvent<HTMLElement>) => {
        const returnStatus = await api.postMinioSettings(this.state.minioSettings);
        if (returnStatus.Success) {
            this.setState({
                miniomessage: "Successfully connected to Minio.",
                miniomessageState: "ok"
            });
        } else {
            this.setState({
                miniomessage: returnStatus.Message,
                miniomessageState: "error"
            });
        }
    }

    public clickSaveMiniDns = async (event: React.MouseEvent<HTMLElement>) => {
        const returnStatus = await api.postMiniDnsSettings(this.state.miniDnsSettings);
        if (returnStatus.Success) {
            this.setState({
                minidnsmessage: "Successfully connected to Mini DNS.",
                minidnsmessageState: "ok"
            });
        } else {
            this.setState({
                minidnsmessage: returnStatus.Message,
                minidnsmessageState: "error"
            });
        }
    }

    public clickSaveApplication = async (event: React.MouseEvent<HTMLElement>) => {
        const returnStatus = await api.postApplicationSettings(this.state.applicationSettings);
        // based on return status we want to display the message positive/negative
        if (returnStatus.Success) {
            this.setState({
                applicationmessage: "Successfully saved.",
                applicationmessageState: "ok"
            });
        } else {
            this.setState({
                applicationmessage: returnStatus.Message,
                applicationmessageState: "error"
            });
        }
    }
    public clickDisconnect = async (event: React.MouseEvent<HTMLElement>) => {
        await api.logoutVCenter();
        this.setState({
            vcenterIsConnected: false,
            vcentermessage: "",
            vcentermessageState: ""
        });
    }

    public handleUrlChange = (event: any) => {
        const newVcenterSettings = {...this.state.vcenterSettings};
        newVcenterSettings.URL = event.target.value;
        this.setState({
            vcenterSettings: newVcenterSettings
        });
    }

    public handleAppUrlChange = (event: any) => {
        const newApplicationSettings = {...this.state.applicationSettings};
        newApplicationSettings.URL = event.target.value;
        this.setState({
            applicationSettings: newApplicationSettings
        });
    }

    public handleUsernameChange = (event: any) => {
        const newVcenterSettings = {...this.state.vcenterSettings};
        newVcenterSettings.Username = event.target.value;
        this.setState({
            vcenterSettings: newVcenterSettings
        });
    }

    public handlePasswordChange = (event: any) => {
        const newVcenterSettings = {...this.state.vcenterSettings};
        newVcenterSettings.Password = event.target.value;
        this.setState({
            vcenterSettings: newVcenterSettings
        });
    }

    public handleFolderChange = (event: any) => {
        const newVcenterSettings = {...this.state.vcenterSettings};
        newVcenterSettings.DefaultFolder = event.target.value;
        this.setState({
            vcenterSettings: newVcenterSettings
        });
    }

    public handleMiniDnsUrlChange = (event: any) => {
        const newMiniDnsSettings = {...this.state.miniDnsSettings};
        newMiniDnsSettings.url = event.target.value;
        this.setState({
            miniDnsSettings: newMiniDnsSettings
        });
    }

    public handleMiniDnsAddressChange = (event: any) => {
        const newMiniDnsSettings = {...this.state.miniDnsSettings};
        newMiniDnsSettings.address = event.target.value;
        this.setState({
            miniDnsSettings: newMiniDnsSettings
        });
    }

    public handleMiniDnsDefaultChange = (event: any) => {
        const newMiniDnsSettings = {...this.state.miniDnsSettings};
        newMiniDnsSettings.defaultDomain = event.target.value;
        this.setState({
            miniDnsSettings: newMiniDnsSettings
        });
    }

    public handleMinioUrlChange = (event: any) => {
        const newMinioSettings = {...this.state.minioSettings};
        newMinioSettings.URL = event.target.value;
        this.setState({
            minioSettings: newMinioSettings
        });
    }

    public handleMinioAccessKeyChange = (event: any) => {
        const newMinioSettings = {...this.state.minioSettings};
        newMinioSettings.AccessKey = event.target.value;
        this.setState({
            minioSettings: newMinioSettings
        });
    }

    public handleMinioSecretKeyChange = (event: any) => {
        const newMinioSettings = {...this.state.minioSettings};
        newMinioSettings.SecretKey = event.target.value;
        this.setState({
            minioSettings: newMinioSettings
        });
    }

    public handleMinioBucketChange = (event: any) => {
        const newMinioSettings = {...this.state.minioSettings};
        newMinioSettings.ContentBucket = event.target.value;
        this.setState({
            minioSettings: newMinioSettings
        });
    }

    public render() {
        return (
            <div>
                <Form>
                    <h4 className="ui dividing header">Application Settings</h4>
                    <div>
                        <Input label="URL" value={this.state.applicationSettings.URL}
                            onChange={this.handleAppUrlChange} placeholder="Application URL" />
                    </div>
                    <br />
                    <Button onClick={this.clickSaveApplication}>Save</Button>
                    <MessageDisplay messageState={this.state.applicationmessageState}
                        message={this.state.applicationmessage} />
                </Form>
                <br />
                <Form>
                    <h4 className="ui dividing header">VCenter</h4>
                    <div>
                        <Input label="URL" value={this.state.vcenterSettings.URL}
                            onChange={this.handleUrlChange} placeholder="VCenter URL" />
                    </div>
                    <br />
                    <div>
                    <Input label="Username" value={this.state.vcenterSettings.Username}
                        onChange={this.handleUsernameChange} placeholder="VCenter Username" />
                    </div>
                    <br />
                    <div>
                    <Input label="Password" type="password" value={this.state.vcenterSettings.Password}
                        onChange={this.handlePasswordChange} placeholder="VCenter Password" />
                    </div>
                    <br />
                    <div>
                        <Input label="Folder" value={this.state.vcenterSettings.DefaultFolder}
                            onChange={this.handleFolderChange} placeholder="VCenter Folder" />
                    </div>
                    <br />
                    <ConnectButton connectedState={this.state.vcenterIsConnected} clickConnect={this.clickConnect}
                        clickDisconnect={this.clickDisconnect}  />
                    <MessageDisplay messageState={this.state.vcentermessageState} message={this.state.vcentermessage} />
                </Form>
                <br />
                <Form>
                    <h4 className="ui dividing header">Mini DNS</h4>
                    <div>
                        <Input label="API URL" value={this.state.miniDnsSettings.url}
                            onChange={this.handleMiniDnsUrlChange} placeholder="Mini DNS API URL" />
                    </div>
                    <br />
                    <div>
                    <Input label="DNS IP Address" value={this.state.miniDnsSettings.address}
                        onChange={this.handleMiniDnsAddressChange} placeholder="IP Address" />
                    </div>
                    <br />
                    <div>
                    <Input label="Default Domain" value={this.state.miniDnsSettings.defaultDomain}
                        onChange={this.handleMiniDnsDefaultChange} placeholder="Default Domain" />
                    </div>
                    <br />
                    <Button onClick={this.clickSaveMiniDns}>Save</Button>
                    <MessageDisplay messageState={this.state.minidnsmessageState}
                        message={this.state.minidnsmessage} />
                </Form>                <br />
                <Form>
                    <h4 className="ui dividing header">Minio</h4>
                    <div>
                        <Input label="URL" value={this.state.minioSettings.URL}
                            onChange={this.handleMinioUrlChange} placeholder="URL" />
                    </div>
                    <br />
                    <div>
                        <Input label="Access Key" value={this.state.minioSettings.AccessKey}
                            onChange={this.handleMinioAccessKeyChange} placeholder="Access Key" />
                    </div>
                    <br />
                    <div>
                        <Input label="Secret Key" value={this.state.minioSettings.SecretKey}
                            onChange={this.handleMinioSecretKeyChange} placeholder="Secret Key" />
                    </div>
                    <br />
                    <div>
                        <Input label="Content Bucket" value={this.state.minioSettings.ContentBucket}
                            onChange={this.handleMinioBucketChange} placeholder="Bucket Name" />
                    </div>
                    <br />
                    <Button onClick={this.clickSaveMinio}>Save</Button>
                    <MessageDisplay messageState={this.state.miniomessageState}
                        message={this.state.miniomessage} />
                </Form>
            </div>
        );
    }
}

export const SettingsPage = hot(module)(SettingsPageComponent);
