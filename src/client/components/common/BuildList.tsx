import * as React from "react";
import { hot } from "react-hot-loader";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { buildConfigPageUrl, buildPageUrl } from "../../../common/routeDefinitions";
import * as api from "../../api";
import { Sockets } from "../../socket";
import { StatusToString } from "../../../common/models/BuildItemStatus";
import { IBuild } from "../../../common/models/IBuild";

interface IBuildListState {
    builds: IBuildListItem[];
}
interface IProps {
    Id?: number;
}

export interface IBuildListItem {
    key: number;
    BuildConfigName: string;
    BuildNumber: number;
    BuildStatusString: string;
    BuildStatus: number;
}

interface IBuildListPropType {
    builds: IBuildListItem[];
}

class BuildListComponent extends React.Component<IProps, IBuildListState> {
    constructor(props: any) {
        super(props);
        this.state = { builds: []};
    }

    public async componentDidMount() {
        let builds: IBuild[];
        if (this.props.Id) {
            builds = await api.getBuildsForBuildConfig(this.props.Id);
        } else {
            builds = await api.getBuilds();
        }
        if (builds) {
            this.setState({
                builds: builds.reverse().map((build) => {
                    return {
                        key: build.Id,
                        BuildConfigName: build.PackerBuildConfig.Name,
                        BuildNumber: build.BuildNumber,
                        BuildStatus: build.BuildStatus,
                        BuildStatusString: StatusToString(build.BuildStatus)
                    } as IBuildListItem;
                })
            });
        }
        Sockets().startBuildUpdateReceive(this.receiveUpdate);
    }

    public componentWillUnmount() {
        Sockets().stopBuildUpdateReceive();
    }

    public render() {
        const listItems = this.state.builds.map((build: IBuildListItem) =>
            <div key={build.key}>
                <Link to={buildPageUrl(build.key)}>
                    <Message icon="inbox"
                        header={build.BuildConfigName + " - #" + build.BuildNumber}
                        content={build.BuildStatusString}
                        />
                </Link>
                <br />
            </div>
        );
        return (
            <div>{listItems}</div>
        );
    }

    private receiveUpdate = (update: IBuild ) => {
        if (this.props.Id) {
            if (update.PackerBuildConfigId !== this.props.Id) {
                // Ignore this build if we only care about displaying a single build config's list
                return;
            }
        }
        let updatedBuilds: IBuildListItem[] = [];
        const elementToChange = this.state.builds.find((p) => p.key === update.Id);
        if (elementToChange) {
            updatedBuilds = [...this.state.builds];
            elementToChange.BuildStatus = update.BuildStatus;
            elementToChange.BuildStatusString = StatusToString(update.BuildStatus);
            this.setState({
                builds: updatedBuilds
            });
        } else {
            const newBuild: IBuildListItem = {
                key: update.Id,
                BuildConfigName: update.PackerBuildConfig.Name,
                BuildNumber: update.BuildNumber,
                BuildStatus: update.BuildStatus,
                BuildStatusString: StatusToString(update.BuildStatus)
            };
            updatedBuilds = [ newBuild, ...this.state.builds ];
        }
        this.setState({
            builds: updatedBuilds
        });
    }
}

export const BuildList = hot(module)(BuildListComponent);
