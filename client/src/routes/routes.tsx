import React from "react";

import {Route, Switch} from "react-router-dom";

import Login from "../auth/login";
import Signup from "../auth/signup";
import Homepage from "../homepage/homepage";
import Address from "../user/address/Address";
import Orders from "../user/orders/Orders";
import Profile from "../user/Profile";
import {loginLink, myAddress, myOrders, myProfile, signupLink} from "./routesLink";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={Homepage} exact={true}/>
            <Route path={loginLink} component={Login}/>
            <Route path={signupLink} component={Signup}/>
            <Route path={myProfile} component={Profile}/>
            <Route path={myOrders} component={Orders}/>
            <Route path={myAddress} component={Address} />
        </Switch>
    );
};

export default Routes;
