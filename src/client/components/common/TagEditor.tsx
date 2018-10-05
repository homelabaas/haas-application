import * as React from "react";
import { hot } from "react-hot-loader";
import { Label, Button, Modal, Header, Icon, Form, TextArea } from "semantic-ui-react";
import { IDictionary } from "../IDictionary";

interface IManageTagState {
    AddTagName: string;
    AddTagValue: string;
}

interface IProps {
    Tags: IDictionary<string>;
    onChangeTags: (tags: IDictionary<string>) => void;
}

class TagEditorComponent extends React.Component<IProps, IManageTagState> {
    constructor(props: any) {
        super(props);
        this.state = {
            AddTagName: "",
            AddTagValue: ""
        };
    }

    public ClickAddTag = async () => {
        const newTags = Object.assign(this.props.Tags, {});
        newTags[this.state.AddTagName] = this.state.AddTagValue;
        this.props.onChangeTags(newTags);
    }

    public RemoveTagClick = async (evt: any, key: string) => {
        if (evt) {
            const newTags = Object.assign(this.props.Tags, {});
            delete newTags[key];
            this.props.onChangeTags(newTags);
        }
    }

    public tagDisplay = (props: any) => {
        const tags = props.Tags as IDictionary<string>;
        const tagArray = [];
        for (const key in tags) {
            if (tags.hasOwnProperty(key)) {
                tagArray.push({ key, value: tags[key]});
            }
        }
        const listItems = tagArray.map((item) => (
            <Label key={item.key}>
                {item.key}
                <Label.Detail>{item.value}</Label.Detail>
                <Icon name="delete" onClick={(evt: any) => {
                    this.RemoveTagClick(evt, item.key);
                }} />
            </Label>));
        return (<Form.Field>
            {listItems}
        </Form.Field>);
    }

    public handleTagNameChange = (event: any) => {
        const tagName = event.target.value;
        this.setState({
            AddTagName: tagName
        });
    }

    public handleTagValueChange = (event: any) => {
        const tagValue = event.target.value;
        this.setState({
            AddTagValue: tagValue
        });
    }

    public render() {
        return (
            <>
                <Form.Group widths="equal">
                    <Form.Field>
                        <input placeholder="Tag" value={this.state.AddTagName}
                                onChange={this.handleTagNameChange} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder="Value" value={this.state.AddTagValue}
                                onChange={this.handleTagValueChange} />
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={this.ClickAddTag}>Add</Button>
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <this.tagDisplay Tags={this.props.Tags} />
                </Form.Field>
            </>);
    }
}

export const TagEditor = hot(module)(TagEditorComponent);
