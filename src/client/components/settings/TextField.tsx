import * as React from "react";
import { hot } from "react-hot-loader";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface ITextFieldProps {
    label: string;
    value: string;
    placeholder: string;
    onChange: (event: any) => void;
}

const TextFieldComponent: React.StatelessComponent<ITextFieldProps> = (props: any) => {
    return (
        <Form.Field>
            <label>{props.label}</label>
            <input placeholder={props.placeholder} value={props.value}
                onChange={props.onChange} />
        </Form.Field>
    );
};

export const TextField = hot(module)(TextFieldComponent);
