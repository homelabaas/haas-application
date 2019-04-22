import * as React from "react";
import { hot } from "react-hot-loader";
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopMenuComponent: React.StatelessComponent<{}> = (props) => {
  return (
    <Menu fixed="top">
        <Container>
            <Link to="/">
                <Menu.Item header>
                    <Image
                        size="mini"
                        src="/public/images/logo.png"
                        style={{ marginRight: "1.5em" }}
                        />
                    HomelabAAS
                </Menu.Item>
            </Link>
            <Dropdown item simple text="Build">
                <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/buildconfig">Build Configs</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/builds">Builds</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown item simple text="Compute">
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/vm">VMs</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/scalinggroup">Scaling Groups</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/environment">Environments</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/vmspec">VM Specs</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={Link} to="/network">Network</Menu.Item>
            <Dropdown item simple text="Storage">
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/storage">Files</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/artifacts">Artifacts</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown item simple text="Admin">
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/status">Status</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    </Menu>
  );
};

export const TopMenu = hot(module)(TopMenuComponent);
