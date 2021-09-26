import React from "react";

import { Switch, Route} from "react-router-dom";

import Login from "../auth/login";
import Signup from "../auth/signup";
import Homepage from "../homepage/homepage";
import {loginLink, signupLink} from "./routesLink";

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" component={Homepage} exact={true} />
            <Route path={loginLink} component={Login} />
            <Route path={signupLink} component={Signup} />
        </Switch>
    );
};

export default Routes;
