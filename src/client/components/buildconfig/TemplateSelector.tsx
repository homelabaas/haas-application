import * as React from "react";
import { hot } from "react-hot-loader";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IDropdownSelection {
    key: string;
    value: string;
    text: string;
}

interface IISOSelectorData {
    Templates: IDropdownSelection[];
    SelectedTemplate: number;
    Requirement: string;
    TemplateChange: (event: any, data: any) => Promise<void>;
}

const TemplateSelectorComponent: React.StatelessComponent<IISOSelectorData> = (props: any) => {
    if (props.Requirement === "Template") {
        return <Form.Field>
            <label>Template Build</label>
            <Form.Select options={props.Templates} placeholder="Template"
                onChange={props.TemplateChange} value={props.SelectedTemplate} />
        </Form.Field>;
    } else { return null; }
};

export const TemplateSelector = hot(module)(TemplateSelectorComponent);
