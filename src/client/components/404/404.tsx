import * as React from "react";
import { hot } from "react-hot-loader";

class MissingPageComponent extends React.Component<{}, {}> {

    public render() {
        return (
          <div className="row">
            <h4>404 - Page not Found.</h4>
          </div>
       );
    }
}

export const MissingPage = hot(module)(MissingPageComponent);
