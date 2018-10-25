import * as React from "react";
import { hot } from "react-hot-loader";
import { List, TextArea, Grid, Container } from "semantic-ui-react";
import * as api from "../../api";
interface ITreeItem {
    prefix: string;
    size: number;
    name?: string;
    children?: ITreeItem[];
    parentPrefix?: string;
    isOpen: boolean;
}

interface IStoragePageState {
    rootTreeItems: ITreeItem[];
    currentBucket: string;
    content: string;
    saveDirty: boolean;
    currentFilePath: string;
}

class StoragePageComponent extends React.Component<{}, IStoragePageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            rootTreeItems: [],
            currentBucket: "",
            content: "",
            saveDirty: false,
            currentFilePath: ""
        };
    }

    public async componentDidMount() {
        const rootItems = await api.getMinioBrowser("");
        for (const item of rootItems) {
            item.isOpen = false;
        }
        const minioSettings = await api.getMinioSettings();
        this.setState({
            rootTreeItems: rootItems,
            currentBucket: minioSettings.ContentBucket
        });
    }

    public FolderClick = async (evt: any, prefix: string, isOpen: boolean) => {
        if (evt) {
            if (isOpen) {
                const newState = Object.assign([], this.state.rootTreeItems);
                this.removeChildrenFromTree(newState, prefix);
                this.setState({
                    rootTreeItems: newState
                });
            } else {
                const childrenItems = await api.getMinioBrowser(prefix) as ITreeItem[];
                for (const item of childrenItems) {
                    item.parentPrefix = prefix;
                    item.isOpen = false;
                }
                const newState = Object.assign([], this.state.rootTreeItems);
                this.addItemsToTree(newState, prefix, childrenItems);
                this.setState({
                    rootTreeItems: newState
                });
            }
        }
    }

    public FileClick = async (evt: any, prefix: string) => {
        if (evt) {
            const content = await api.getContent(prefix);
            this.setState({
                content: content.content,
                saveDirty: false,
                currentFilePath: prefix
            });
        }
    }

    public ListFolders = (props: any) => {
        if (props.items) {
            const items = props.items as ITreeItem[];

            const listItems = items.map((item) => {
                if (item.size === 0) {
                    let displayName = item.prefix;
                    if (item.parentPrefix) {
                        displayName = displayName.substr(item.parentPrefix.length);
                    }
                    return (
                        <List.Item key={item.prefix} >
                            <List.Icon name="folder" onClick={(evt: any) =>
                                this.FolderClick(evt, item.prefix, item.isOpen)} />
                            <List.Content>
                                <List.Header onClick={(evt: any) => this.FolderClick(evt, item.prefix, item.isOpen)} >
                                    {displayName}
                                </List.Header>
                                {item.children &&
                                    <List.List>
                                        <this.ListFolders items={item.children} />
                                    </List.List>
                                }
                            </List.Content>
                        </List.Item>);
                } else {
                    let displayName = item.name;
                    if (item.parentPrefix) {
                        displayName = displayName.substr(item.parentPrefix.length);
                    }
                    return (
                        <List.Item key={item.name}>
                            <List.Icon name="file" onClick={(evt: any) => this.FileClick(evt, item.name)}  />
                            <List.Content onClick={(evt: any) => this.FileClick(evt, item.name)} >
                                <List.Header>{displayName}</List.Header>
                            </List.Content>
                        </List.Item>);
                }
            });
            return (<> {listItems} </>);
        } else {
            return null;
        }
    }

    public handleContentChange = (event: any) => {
        const newcontent = event.target.value;
        this.setState({
            content: newcontent,
            saveDirty: true
        });
    }

    public render() {
        return (<Container text>
            <h2>Browse {this.state.currentBucket}</h2>

            <Grid>
                <Grid.Column width={6}>
                    <List>
                        <this.ListFolders items={this.state.rootTreeItems} />
                    </List>
                </Grid.Column>
                <Grid.Column width={10}>
                    <h3>{this.state.currentFilePath}</h3>
                    <TextArea onChange={this.handleContentChange}
                        value={this.state.content} style={{ minHeight: 300, minWidth: 500 }} />
                </Grid.Column>
            </Grid>

        </Container>
        );
    }

    private removeChildrenFromTree = (itemlist: ITreeItem[], prefix: string) => {
        for (const item of itemlist) {
            if (item.prefix === prefix) {
                item.children = null;
                item.isOpen = false;
                return true;
            }
            if (item.children) {
                const wasRemoved = this.removeChildrenFromTree(item.children, prefix);
                if (wasRemoved) {
                    return true;
                }
            }
        }
        return false;
    }

    private addItemsToTree = (itemlist: ITreeItem[], prefix: string, children: ITreeItem[]): boolean => {
        for (const item of itemlist) {
            if (item.prefix === prefix) {
                item.children = children;
                item.isOpen = true;
                return true;
            }
            if (item.children) {
                const wasAdded = this.addItemsToTree(item.children, prefix, children);
                if (wasAdded) {
                    return true;
                }
            }
        }
        return false;
    }

}

export const StoragePage = hot(module)(StoragePageComponent);
