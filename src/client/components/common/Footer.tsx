import * as React from "react";
import { hot } from "react-hot-loader";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const FooterComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <Segment
            inverted
            vertical
            style={{ margin: "5em 0em 0em", padding: "1em 0em" }}
        >
            <Container textAlign="center">
                <List horizontal inverted divided link>
                    <List.Item as="a" href="https://docs.homelabaas.io">
                        Docs
                    </List.Item>
                    <List.Item as="a" href="https://github.com/homelabaas/haas-application">
                        Github
                    </List.Item>
                    <List.Item as="a" href="https://homelabaas.io">
                        Web
                    </List.Item>
                </List>
                <Divider inverted section />
                <Image centered size="mini" src="/public/images/logo.png" />
            </Container>
        </Segment>
    );
};

export const Footer = hot(module)(FooterComponent);
