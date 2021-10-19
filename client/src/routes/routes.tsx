import React from "react";

import {Route, Switch} from "react-router-dom";

import Login from "../auth/login";
import Signup from "../auth/signup";
import Homepage from "../homepage/homepage";
import AddAddress from "../user/address/AddAddress";
import Address from "../user/address/Address";
import Orders from "../user/orders/Orders";
import PaymentMethods from "../user/paymentMethods/PaymentMethods";
import Profile from "../user/Profile";
import {addAddress, loginLink, myAddress, myOrders, myProfile, signupLink, myPaymentMethods} from "./routesLink";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={Homepage} exact={true}/>
            <Route path={loginLink} component={Login}/>
            <Route path={signupLink} component={Signup}/>
            <Route path={myProfile} component={Profile}/>
            <Route path={myOrders} component={Orders}/>
            <Route path={myAddress} component={Address} />
            <Route path={addAddress} component={AddAddress} />
            <Route path={myPaymentMethods} component={PaymentMethods} />
        </Switch>
    );
};

export default Routes;
