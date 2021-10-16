import React, {useEffect, useState} from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";

import {axiosPostMethod} from "../../utils/axiosMethods";
import {UserTokenInterface} from "../userInterface";
import {myOrdersLink} from "../userLinks";
import SingleOrder from "./SingleOrder";

const Orders: React.FC = () => {

    const [myOrders, updateMyOrders] = useState([]);

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        let userDetails: UserTokenInterface;
        let userId;
        if (userToken) {
            userDetails = jwt_decode(userToken);
            userId = userDetails["id"];
        }
        axios(
            {
                "url": myOrdersLink,
                "method": axiosPostMethod,
                "data": {userId}
            })
            .then(res => {
                updateMyOrders(res.data.response.orders);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);

    const allOrders = myOrders.map((order) => {
        return <SingleOrder
            key={order["_id"]}
            orderDate={order["orderDate"]}
            totalAmount={order["totalAmount"]}
            modeOfPayment={order["modeOfPayment"]}
            discount={order["discount"]}
            finalAmount={order["finalAmount"]}
            address={order["address"]}
            itemsOrdered={order["itemsOrdered"]}
        />;
    });

    return (
        <div>
            My Orders
            {allOrders}
        </div>
    );
};

export default Orders;
