import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { IStatus } from "../../../common/models/IStatus";
import * as api from "../../api";
import { Icon } from "semantic-ui-react";

interface IStatusPageState {
    status: IStatus;
}

class StatusPageComponent extends React.Component<{}, IStatusPageState> {
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
                MiniDNS: false,
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

    public HealthDisplay(props: any) {
        if (props.isOK) {
            return <Icon name="check" color="green" />;
        } else {
            return <Icon name="close" color="red" />;
        }
    }

    public render() {
        return (
            <div className="row">
                <h2>Dependencies</h2>
                <p>Postgres: <this.HealthDisplay isOK={this.state.status.PostgresConnected} /></p>
                <p>Docker: <this.HealthDisplay isOK={this.state.status.DockerConnected} /></p>
                <p>VCenter: <this.HealthDisplay isOK={this.state.status.VcenterConnected} /></p>
                <p>Minio: <this.HealthDisplay isOK={this.state.status.MinioConnected} /></p>
                <p>Minio Content Bucket: <this.HealthDisplay isOK={this.state.status.MinioBucketExists} /></p>
                <p>MiniDNS: <this.HealthDisplay isOK={this.state.status.MiniDNS} /></p>
                <h2>Background Monitors</h2>
                <p>VM Builder: <this.HealthDisplay isOK={this.state.status.BuilderThreadRunning} /></p>
                <p>VM Provisioner: <this.HealthDisplay isOK={this.state.status.VmProvisionManager} /></p>
                <p>VM Terminator: <this.HealthDisplay isOK={this.state.status.VmTerminateManager} /></p>
                <p>VM Clean Up: <this.HealthDisplay isOK={this.state.status.VmCleanupManager} /></p>
                <p>Scaling Group Manager: <this.HealthDisplay isOK={this.state.status.SgManager} /></p>
                <p>Environment Manager: <this.HealthDisplay isOK={this.state.status.EnvironmentManager} /></p>
            </div>
        );
    }
}

export const StatusPage = hot(module)(StatusPageComponent);
