import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/global/global.css";
import Requests from "views/Requests";
import Preferences from "views/Preferences";
import Analytics from "views/Analytics";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/preferences"
        render={(props) => <Preferences {...props} />}
      />
      <Route path="/analytics" render={(props) => <Analytics {...props} />} />
      <Route path="/requests" render={(props) => <Requests {...props} />} />
      <Redirect from="/" to="/requests" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
