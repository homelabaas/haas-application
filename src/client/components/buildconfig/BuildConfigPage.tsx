import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message, Item, Icon, SemanticICONS, List } from "semantic-ui-react";
import * as api from "../../api";
import { IBuildConfig } from "../../../common/models/IBuildConfig";
import { ICreateBuild } from "../../../common/models/ICreateBuild";
import * as notus from "notus";
import { buildConfigPageUrl, editBuildConfigPageUrl } from "../../../common/routeDefinitions";

const notusRun = notus();

interface IBuildConfigList {
    buildConfigs: IBuildConfig[];
}

class BuildConfigPageComponent extends React.Component<{}, IBuildConfigList> {
    constructor(props: any) {
        super(props);
        this.state = { buildConfigs: [] };
    }

    public async componentDidMount() {
        const returnStatus = await api.getBuildConfigs();
        if (returnStatus) {
            this.setState({ buildConfigs: returnStatus });
        }
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

    public ClickEdit = (buildId: string) => async (event: React.MouseEvent<HTMLElement>) => {
        // Navigate to the edit page
    }

    public ListBuildConfigs = (props: any) => {
        const builds = props.builds;
        const listItems = builds.map((build: IBuildConfig) => (
        <List.Item>
            <List.Content floated="right">
                <Button onClick={() => { this.ClickRun(build.Id, build.Name); } } >Run</Button>
            </List.Content>
            <List.Content>
                <Link to={buildConfigPageUrl(build.Id)}>
                    {build.Name}
                </Link>
            </List.Content>
        </List.Item>
        ));
        return <List divided verticalAlign="middle">{listItems} </List>;
    }

    public render() {
        return (
            <div className="row">
                <h3 className="ui dividing header">Build Configurations</h3>
                <Link to="/buildconfigedit/-1">
                    <Button primary>New</Button>
                </Link>
                <this.ListBuildConfigs builds={this.state.buildConfigs} />
            </div>
        );
    }

}

export const BuildConfigPage = hot(module)(BuildConfigPageComponent);
