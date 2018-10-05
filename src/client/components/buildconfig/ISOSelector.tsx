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
    Filenames: IDropdownSelection[];
    ISODatastores: IDropdownSelection[];
    SelectedISO: string;
    SelectedDatastore: string;
    Requirement: string;
    DatastoreChange: (event: any, data: any) => Promise<void>;
    SelectISOFilename: (event: any, data: any) => Promise<void>;
}

const ISOSelectorComponent: React.StatelessComponent<IISOSelectorData> = (props: any) => {
    if (props.Requirement === "ISO") {
        return <Form.Field>
            <label>ISO File</label>
            <Form.Select options={props.ISODatastores} placeholder="ISO Datastore"
                onChange={props.DatastoreChange} value={props.SelectedDatastore} />
            <Dropdown placeholder="Select file" fluid search selection options={props.Filenames}
                value={props.SelectedISO} onChange={props.SelectISOFilename} name="ISO" />
        </Form.Field>;
    } else { return null; }
};

export const ISOSelector = hot(module)(ISOSelectorComponent);
