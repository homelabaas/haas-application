import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message, Dropdown, Container, Grid, Segment, Icon } from "semantic-ui-react";
import * as api from "../../api";
import { IBuildConfig } from "../../../common/models/IBuildConfig";
import { IBuildOutputLine } from "../../../common/models/IBuildOutputLine";
import { MessageDisplay } from "../common/MessageDisplay";
import { IGenericReturn } from "../../../common/models/IGenericReturn";
import { BuildItemStatus, StatusToString } from "../../../common/models/BuildItemStatus";
import { IBuild } from "../../../common/models/IBuild";
import { Sockets } from "../../socket";
import { IArtifact } from "../../../common/models/IArtifact";
import * as moment from "moment";
import { buildConfigPageUrl } from "../../../common/routeDefinitions";

interface IProps {
    match: {
        params: {
            id: string
        }
    };
}

interface IState {
    BuildId: number;
    BuildConfigName: string;
    BuildNumber: number;
    BuildConfigId: number;
    BuildStatus: number;
    QueueTime: Date;
    StartTime?: Date;
    FinishTime?: Date;
    ErrorMessage: string;
    BuildOutput: IBuildOutputLine[];
}

interface IlistItem {
    id: number;
    DateTimeStamp: Date;
    text: string;
}

class BuildDisplayComponent extends React.Component<IProps, IState> {
    public preStyle: any = {
        fontSize: "0.6em",
        padding: "0px",
        margin: "1px",
    };

    constructor(props: any) {
        super(props);
        this.state = {
            BuildId: 0,
            BuildConfigName: "",
            BuildConfigId: 0,
            BuildNumber: 0,
            BuildStatus: 0,
            QueueTime: new Date(),
            ErrorMessage: "",
            BuildOutput: []
        };
    }

    public async componentDidMount() {
        const id = parseInt(this.props.match.params.id, 10);
        const buildInfo = await api.getBuild(id);
        const buildOutput = await api.getBuildOutput(id);
        const buildConfigInfo = await api.getBuildConfig(buildInfo.PackerBuildConfigId);
        this.setState({
            BuildId: buildInfo.Id,
            BuildConfigName: buildConfigInfo.Name,
            BuildConfigId: buildInfo.PackerBuildConfigId,
            BuildNumber: buildInfo.BuildNumber,
            BuildStatus: buildInfo.BuildStatus,
            QueueTime: buildInfo.QueueTime,
            StartTime: buildInfo.StartTime,
            FinishTime: buildInfo.FinishTime,
            ErrorMessage: buildInfo.ErrorMessage,
            BuildOutput: buildOutput
         });
        if (buildInfo) {
            Sockets().startBuildUpdateReceive(this.receiveBuildUpdate);
            Sockets().startLogUpdated(this.state.BuildId, this.receiveLogUpdate);
        }
    }

    public componentWillUnmount() {
        Sockets().stopBuildUpdateReceive();
        Sockets().stopLogUpdated(this.state.BuildId);
    }

    public ListArtifacts = (props: any) => {
        if (props.artifacts) {
            const concatText = props.artifacts.map((p: IArtifact) => {
                return <div>{p.Name}</div>;
            });
            return concatText;
        } else {
            return null;
        }
    }

    public ListLog = (props: any) => {
        if (props.lines) {
            const concatText = props.lines.map((p: IBuildOutputLine) => {
                return <pre key={p.Id} style={this.preStyle}>{p.Text}</pre>;
            });
            return concatText;
        } else {
            return null;
        }
    }

    public render() {
        return (
            <Container>
                <Link to="/builds"><Icon name="angle double left" />Builds</Link>
                <h3 className="ui dividing header">Build</h3>
                <Grid celled container stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h3>Build Configuration</h3>
                            <Link to={buildConfigPageUrl(this.state.BuildConfigId)}>
                                <div>{this.state.BuildConfigName}</div>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Build Number</h3>
                            <div>{this.state.BuildNumber}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <h3>Queue Time</h3>
                            <div>{this.state.QueueTime ?
                                moment(this.state.QueueTime).format("D/M/YYYY h:mm a") : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Start Time</h3>
                            <div>{this.state.StartTime ?
                                moment(this.state.StartTime).format("D/M/YYYY h:mm a") : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Finish Time</h3>
                            <div>{this.state.FinishTime ?
                                moment(this.state.FinishTime).format("D/M/YYYY h:mm a") : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <h3>Status</h3>
                            <div>{StatusToString(this.state.BuildStatus)}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <h3>Build Log</h3>
                            <div>
                                <this.ListLog lines={this.state.BuildOutput} />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

    private receiveLogUpdate = (update: IBuildOutputLine) => {
        const newState: IState = Object.assign({}, this.state);
        newState.BuildOutput = newState.BuildOutput || [];
        newState.BuildOutput.push(update);
        this.setState(newState);
    }

    private receiveBuildUpdate = (update: IBuild ) => {
        if (update.Id === this.state.BuildId) {
            const newState: IState = Object.assign({}, this.state);
            newState.BuildConfigName = update.PackerBuildConfig.Name;
            newState.BuildStatus = update.BuildStatus;
            newState.QueueTime = update.QueueTime;
            newState.ErrorMessage = update.ErrorMessage;
            newState.StartTime = update.StartTime;
            newState.FinishTime = update.FinishTime;
            newState.BuildNumber = update.BuildNumber;

            this.setState(newState);
        }
    }
}

export const BuildDisplay = hot(module)(BuildDisplayComponent);
