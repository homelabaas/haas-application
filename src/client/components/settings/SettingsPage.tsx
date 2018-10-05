import * as React from "react";
import { hot } from "react-hot-loader";
import { Button, Form, Message, Input } from "semantic-ui-react";
import * as api from "../../api";
import { MessageDisplay } from "../common/MessageDisplay";
import { ConnectButton } from "./ConnectButton";
import { TextField } from "./TextField";
import { IVCenterSettings } from "../../../common/models/IVcenterSettings";
import { IPowerDnsSettings } from "../../../common/models/IPowerDnsSettings";
import { IApplicationSettings } from "../../../common/models/IApplicationSettings";

interface ISettingsPageState {
    vcenterSettings: IVCenterSettings;
    powerDnsSettings: IPowerDnsSettings;
    applicationSettings: IApplicationSettings;
    vcenterIsConnected: boolean;
    vcentermessageState: string;
    vcentermessage: string;
    powerdnsmessageState: string;
    powerdnsmessage: string;
    applicationmessageState: string;
    applicationmessage: string;
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
            powerDnsSettings: {
                APIKey: "",
                defaultDomain: "",
                Url: ""
            },
            applicationSettings: {
                URL: ""
            },
            vcenterIsConnected: false,
            vcentermessageState: "",
            vcentermessage: "",
            powerdnsmessageState: "",
            powerdnsmessage: "",
            applicationmessageState: "",
            applicationmessage: ""
        };
    }

    public async componentDidMount() {
        const apiStatus = await api.getStatus();
        const vcenterSettings = await api.getVCenterSettings();
        const powerDnsSettings = await api.getPowerDnsSettings();
        const applicationSettings = await api.getApplicationSettings();
        this.setState({
            vcenterIsConnected: apiStatus.VcenterConnected,
            vcenterSettings,
            powerDnsSettings,
            applicationSettings
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

    public clickSavePowerDns = async (event: React.MouseEvent<HTMLElement>) => {
        const returnStatus = await api.postPowerDnsSettings(this.state.powerDnsSettings);
        // based on return status we want to display the message positive/negative
        if (returnStatus.Success) {
            this.setState({
                powerdnsmessage: "Successfully connected to Power DNS.",
                powerdnsmessageState: "ok"
            });
        } else {
            this.setState({
                powerdnsmessage: returnStatus.Message,
                powerdnsmessageState: "error"
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

    public handlePowerDnsUrlChange = (event: any) => {
        const newPowerDnsSettings = {...this.state.powerDnsSettings};
        newPowerDnsSettings.Url = event.target.value;
        this.setState({
            powerDnsSettings: newPowerDnsSettings
        });
    }

    public handlePowerDnsApiKeyChange = (event: any) => {
        const newPowerDnsSettings = {...this.state.powerDnsSettings};
        newPowerDnsSettings.APIKey = event.target.value;
        this.setState({
            powerDnsSettings: newPowerDnsSettings
        });
    }

    public handlePowerDnsDefaultChange = (event: any) => {
        const newPowerDnsSettings = {...this.state.powerDnsSettings};
        newPowerDnsSettings.defaultDomain = event.target.value;
        this.setState({
            powerDnsSettings: newPowerDnsSettings
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
                    <h4 className="ui dividing header">Power DNS</h4>
                    <div>
                        <Input label="URL" value={this.state.powerDnsSettings.Url}
                            onChange={this.handlePowerDnsUrlChange} placeholder="PowerDNS URL" />
                    </div>
                    <br />
                    <div>
                    <Input label="API Key" value={this.state.powerDnsSettings.APIKey}
                        onChange={this.handlePowerDnsApiKeyChange} placeholder="API Key" />
                    </div>
                    <br />
                    <div>
                    <Input label="Default Domain" value={this.state.powerDnsSettings.defaultDomain}
                        onChange={this.handlePowerDnsDefaultChange} placeholder="Default Domain" />
                    </div>
                    <br />
                    <Button onClick={this.clickSavePowerDns}>Save</Button>
                    <MessageDisplay messageState={this.state.powerdnsmessageState}
                        message={this.state.powerdnsmessage} />
                </Form>
            </div>
        );
    }
}

export const SettingsPage = hot(module)(SettingsPageComponent);
