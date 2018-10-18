import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message, Dropdown, Container, Grid, Segment, Icon } from "semantic-ui-react";
import * as api from "../../api";
import { IBuildConfig } from "../../../common/models/IBuildConfig";
import { MessageDisplay } from "../common/MessageDisplay";
import { IGenericReturn } from "../../../common/models/IGenericReturn";
import { IBuildType } from "../../../common/models/IBuildType";
import { IBuild } from "../../../common/models/IBuild";
import { BuildList, IBuildListItem } from "../common/BuildList";
import { StatusToString } from "../../../common/models/BuildItemStatus";
import { editBuildConfigPageUrl } from "../../../common/routeDefinitions";
import * as notus from "notus";
import { ICreateBuild } from "../../../common/models/ICreateBuild";

const notusRun = notus();

interface IProps {
    match: {
        params: {
            id: number
        }
    };
}

interface IDisplayBuildConfigState {
    BuildConfig: IBuildConfig;
    BuildType: IBuildType;
}

class BuildConfigDisplayComponent extends React.Component<IProps, IDisplayBuildConfigState> {

    constructor(props: any) {
        super(props);
        this.state = {
            BuildConfig: null,
            BuildType: null,
        };
    }

    public async componentDidMount() {
        const id = this.props.match.params.id;
        const buildConfig = await api.getBuildConfig(id);
        const buildType = await api.getBuildType(buildConfig.BuilderDefinitionId);
        this.setState({
            BuildConfig: buildConfig,
            BuildType: buildType
        });
    }

    public IsoFileDisplay = (props: any) => {
        if (props.BuildConfig) {
            return <Grid.Row columns={1}>
                    <Grid.Column>
                        <h3>ISO</h3>
                        <div>{props.BuildConfig.ISO}</div>
                    </Grid.Column>
                </Grid.Row>;
        } else { return null; }
    }

    public ExtraDetails = (props: any) => {
        if (props.BuildConfig) {
            return (<div>
            <Button as={Link} to={editBuildConfigPageUrl(props.BuildConfig.Id)}>Edit</Button>
            <Button onClick={this.ClickRun(props.BuildConfig.Id, props.BuildConfig.BuildConfigName)}>Run</Button>
            <h3 className="ui dividing header">Builds</h3>
            <BuildList Id={this.state.BuildConfig.Id} />
            </div>);
        } else { return null; }
    }

    public ClickRun = (buildId: number, name: string) => async (event: React.MouseEvent<HTMLElement>) => {
        const addItem: ICreateBuild = { BuildConfigId: buildId };
        const returnVal = await api.createBuild(addItem);
        if (returnVal.Success) {
            notusRun.send({
                notusType: "popup",
                notusPosition: "top-right",
                title: "Build Queued",
                message: `A build for ${name} has been queued.`
            });
        } else {
            notusRun.send({
                notusType: "popup",
                notusPosition: "top-right",
                title: "Error",
                message: returnVal.Message,
                alertType: "failure"
            });
        }
    }

    public render() {
        return (
            <Container>
                <Link to="/buildconfig"><Icon name="angle double left" />Build Configurations</Link>
                <h3 className="ui dividing header">Build Configuration</h3>
                <Grid celled container stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h3>Name</h3>
                            <div>{this.state.BuildConfig ? this.state.BuildConfig.Name : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>VM Name</h3>
                            <div>{this.state.BuildConfig ? this.state.BuildConfig.VMName : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <h3>Host</h3>
                            <div>{this.state.BuildConfig ? this.state.BuildConfig.Host : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Datastore</h3>
                            <div>{this.state.BuildConfig ? this.state.BuildConfig.Datastore : ""}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Network</h3>
                            <div>{this.state.BuildConfig ? this.state.BuildConfig.Network : ""}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <this.IsoFileDisplay BuildConfig={this.state.BuildConfig} />
                </Grid>

                <this.ExtraDetails BuildConfig={this.state.BuildConfig} />
            </Container>
        );
    }
}

export const BuildConfigDisplay = hot(module)(BuildConfigDisplayComponent);
