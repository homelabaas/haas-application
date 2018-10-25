import * as React from "react";
import * as api from "../../api";
import { hot } from "react-hot-loader";
import { IStatus } from "../../../common/models/IStatus";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface ILandingPageState {
    status: IStatus;
}

class LandingPageComponent extends React.Component<{}, ILandingPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: {
                VcenterConnected: false,
                DockerConnected: false,
                DockerRegistryAuth: false,
                MinioBucketExists: false,
                MinioConnected: false,
                BuilderThreadRunning: false,
                PowerDNS: false,
                PostgresConnected: false,
                VmProvisionManager: false,
                EnvironmentManager: false,
                SgManager: false,
                VmTerminateManager: false,
                VmCleanupManager: false
            }
        };
    }

    public async componentDidMount() {
        const returnStatus = await api.getStatus();
        if (returnStatus) {
            this.setState({ status: returnStatus });
        }
    }

    public MessageDisplay(props: any) {
        const status = props.status as IStatus;
        const showMessage = !status.VcenterConnected || !status.DockerConnected ||
            !status.PostgresConnected || !status.MinioConnected || !status.MinioBucketExists
            || !status.PowerDNS;
        if (showMessage) {
            return <Link to="/settings"><Message warning>
                        <Message.Content>
                            <Message.Header>Warning</Message.Header>
                            It seems not all the dependencies for this application are configured. Click here
                            to proceed to the setup screen. The status page will tell you what's not connected.
                        </Message.Content>
                    </Message></Link>;
        } else {
            return null;
        }
    }

    public render() {
        return (
          <div className="row">
            <this.MessageDisplay status={this.state.status} />
            <h2 className="ui dividing header">Homelab as a Service</h2>
            <h3>Build VMs</h3>
            <p>
                <Link to="/buildconfig">Build Configuration</Link>
                <br />
                <Link to="/builds">Builds</Link>
            </p>
            <h3>Compute - Manage VMs</h3>
            <p>
                <Link to="/vm">VMs</Link>
                <br />
                <Link to="/scalinggroup">Scaling Groups</Link>
                <br />
                <Link to="/environment">Environments</Link>
                <br />
                <Link to="/vmspec">VM Sizes</Link>
            </p>
            <h3>Networking</h3>
            <p>
                <Link to="/network">Network Segments</Link>
            </p>
            <h3>Storage</h3>
            <p>
                <Link to="/storage">Browse Storage</Link>
            </p>
            <h3>Administration</h3>
            <p>
                <Link to="/settings">Application Settings</Link>
                <br />
                <Link to="/status">Connectivity Status</Link>
            </p>
          </div>
       );
    }
}

export const LandingPage = hot(module)(LandingPageComponent);
