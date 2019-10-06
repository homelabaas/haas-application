import * as React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { MessageDisplay } from "../common/MessageDisplay";
import { INetworkSegment } from "../../../common/models/INetworkSegment";
import * as api from "../../api";

interface IProps {
    match: {
        params: {
            id: string
        }
    };
}

interface IDropdownSelection {
    key: string;
    value: string;
    text: string;
}

interface IEditNetworkSegmentState {
    Id?: number;
    Name: string;
    StartIP: string;
    EndIP: string;
    SubnetMask: string;
    DNS1: string;
    DNS2: string;
    Gateway: string;
    Message: string;
    MessageState: string;
}

class NetworkSegmentEditPageComponent extends React.Component<IProps, IEditNetworkSegmentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            StartIP: "",
            EndIP: "",
            SubnetMask: "",
            DNS1: "",
            DNS2: "",
            Gateway: "",
            Message: "",
            MessageState: ""
        };
    }

    public async componentDidMount() {
        const id = parseInt(this.props.match.params.id, 10);
        if (id === -1) {
            //
        } else {
            const loadNetworkSegment = await api.getNetworkSegment(id);
            this.setState({
                Id: loadNetworkSegment.Id,
                Name: loadNetworkSegment.Name,
                StartIP: loadNetworkSegment.StartIP,
                EndIP: loadNetworkSegment.EndIP,
                SubnetMask: loadNetworkSegment.SubnetMask,
                DNS1: loadNetworkSegment.DNS1,
                DNS2: loadNetworkSegment.DNS2,
                Gateway: loadNetworkSegment.Gateway,
                Message: "",
                MessageState: ""
            });
        }
    }

    public handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const newState = Object.assign(this.state, { [name]: value });
        this.setState(newState);
    }

    public ClickSave = async (event: React.MouseEvent<HTMLElement>) => {
        const networkSegmentToSave: INetworkSegment = {
            Name: this.state.Name,
            StartIP: this.state.StartIP,
            EndIP: this.state.EndIP,
            Gateway: this.state.Gateway,
            SubnetMask: this.state.SubnetMask,
            DNS1: this.state.DNS1,
            DNS2: this.state.DNS2
        };
        if (this.state.Id) {
            networkSegmentToSave.Id = this.state.Id;
        }
        const returnStatus = await api.saveNetworkSegment(networkSegmentToSave);
        if (returnStatus.Success) {
            if (returnStatus.NewId) {
                this.setState({
                    Message: "Successfully saved Network Segment.",
                    MessageState: "ok",
                    Id: returnStatus.NewId
                });
            } else {
                this.setState({
                    Message: "Successfully saved Network Segment.",
                    MessageState: "ok"
                });
            }
        } else {
            this.setState({
                Message: returnStatus.Message,
                MessageState: "error"
            });
        }
    }

    public render() {
        return (
            <Form>
                <h4 className="ui dividing header">Network Segment</h4>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder="Name" value={this.state.Name}
                        onChange={this.handleInputChange} name="Name" />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Start IP</label>
                        <input placeholder="Start IP" value={this.state.StartIP}
                            onChange={this.handleInputChange} name="StartIP" />
                    </Form.Field>
                    <Form.Field>
                        <label>End IP</label>
                        <input placeholder="End IP" value={this.state.EndIP}
                            onChange={this.handleInputChange} name="EndIP" />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Subnet Mask</label>
                        <input placeholder="Subnet Mask" value={this.state.SubnetMask}
                            onChange={this.handleInputChange} name="SubnetMask" />
                    </Form.Field>
                    <Form.Field>
                        <label>Gateway</label>
                        <input placeholder="Gateway" value={this.state.Gateway}
                            onChange={this.handleInputChange} name="Gateway" />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>DNS 1</label>
                        <input placeholder="DNS 1" value={this.state.DNS1}
                            onChange={this.handleInputChange} name="DNS1" />
                    </Form.Field>
                    <Form.Field>
                        <label>DNS 2</label>
                        <input placeholder="DNS 2" value={this.state.DNS2}
                            onChange={this.handleInputChange} name="DNS2" />
                    </Form.Field>
                </Form.Group>
                <Button onClick={this.ClickSave}>Save</Button>
                <MessageDisplay messageState={this.state.MessageState} message={this.state.Message} />
            </Form>
        );
    }
}

export const NetworkSegmentEditPage = hot(module)(NetworkSegmentEditPageComponent);
