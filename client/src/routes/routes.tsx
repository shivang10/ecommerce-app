import React, {lazy, Suspense} from "react";

import {Route, Switch} from "react-router-dom";

import SellerSignup from "../auth/sellerSignup";
import DisplayProducts from "../user/products/DisplayProducts";
import {
    addAddress,
    addPaymentMethod, displayProducts,
    loginLink,
    myAddress,
    myOrders,
    myPaymentMethods,
    myProfile, sellerSignup,
    signupLink
} from "./routesLink";

const Login = lazy(() => import("../auth/login"));
const Signup = lazy(() => import("../auth/signup"));
// const Homepage = lazy(() => import("../homepage/homepage"));
const AddAddress = lazy(() => import("../user/address/AddAddress"));
const Address = lazy(() => import("../user/address/Address"));
const Orders = lazy(() => import("../user/orders/Orders"));
const PaymentMethods = lazy(() => import("../user/paymentMethods/PaymentMethods"));
const Profile = lazy(() => import("../user/Profile"));
const AddPaymentMethod = lazy(() => import("../user/paymentMethods/AddPaymentMethod"));

const Routes: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Switch>
                {/*<Route path="/" component={Homepage} exact={true}/>*/}
                <Route path={loginLink} component={Login}/>
                <Route path={signupLink} component={Signup}/>
                <Route path={myProfile} component={Profile}/>
                <Route path={myOrders} component={Orders}/>
                <Route path={myAddress} component={Address}/>
                <Route path={addAddress} component={AddAddress}/>
                <Route path={myPaymentMethods} component={PaymentMethods}/>
                <Route path={addPaymentMethod} component={AddPaymentMethod}/>
                <Route path={sellerSignup} component={SellerSignup}/>
                <Route path={displayProducts} component={DisplayProducts}/>
            </Switch>
        </Suspense>
    );
};

export default Routes;
