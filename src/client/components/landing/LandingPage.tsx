import * as React from "react";
import { hot } from "react-hot-loader";

class LandingPageComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
          <div className="row">
            <h2 className="ui dividing header">Homelab as a Service</h2>

          </div>
       );
    }
}

export const LandingPage = hot(module)(LandingPageComponent);
