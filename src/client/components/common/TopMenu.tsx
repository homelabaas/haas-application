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
                    <Dropdown.Item><Link to="/">Builds</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/buildconfig">Configs</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown item simple text="Compute">
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/vm">VMs</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/scalinggroup">Scaling Groups</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/environment">Environments</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/vmspec">VM Specs</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item><Link to="/network">Network</Link></Menu.Item>
            <Menu.Item><Link to="/storage">Storage</Link></Menu.Item>
            <Dropdown item simple text="Admin">
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/settings">Settings</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/status">Status</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    </Menu>
  );
};

export const TopMenu = hot(module)(TopMenuComponent);
