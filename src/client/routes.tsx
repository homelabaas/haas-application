import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./app";
import { BuildDisplay } from "./components/build/BuildPage";
import { BuildConfigDisplay } from "./components/buildconfig/BuildConfigDisplay";
import { BuildConfigEditPage } from "./components/buildconfig/BuildConfigEditPage";
import { BuildConfigPage } from "./components/buildconfig/BuildConfigPage";
import { EnvironmentPage } from "./components/environments/EnvironmentPage";
import { BuildListPage } from "./components/landing/BuildListPage";
import { NetworkPage } from "./components/network/NetworkPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { StatusPage } from "./components/status/StatusPage";
import { StoragePage } from "./components/storage/StoragePage";
import { SGPage } from "./components/scalinggroup/ScalingGroupPage";
import { VMPage } from "./components/vm/VMPage";
import { NetworkSegmentEditPage } from "./components/network/NetworkSegmentEdit";
import { NetworkSegmentDisplayPage } from "./components/network/NetworkSegmentDisplay";
import { VMSpecPage } from "./components/vmspec/VMSpecPage";

const AppRouterComponent: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={BuildListPage} />
                    <Route path="/buildconfigedit/:id" component={BuildConfigEditPage} />
                    <Route path="/buildconfig/:id" component={BuildConfigDisplay} />
                    <Route path="/buildconfig" component={BuildConfigPage} />
                    <Route path="/build/:id" component={BuildDisplay} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/status" component={StatusPage} />
                    <Route path="/environment" component={EnvironmentPage} />
                    <Route path="/network" component={NetworkPage} />
                    <Route path="/networksegmentedit/:id" component={NetworkSegmentEditPage} />
                    <Route path="/networksegment/:id" component={NetworkSegmentDisplayPage} />
                    <Route path="/storage" component={StoragePage} />
                    <Route path="/scalinggroup" component={SGPage} />
                    <Route path="/vmspec" component={VMSpecPage} />
                    <Route path="/vm" component={VMPage} />
                </Switch>
            </App>
        </BrowserRouter>
    );
};

export const AppRouter = hot(module)(AppRouterComponent);
