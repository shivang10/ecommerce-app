import React, {useEffect, useState} from "react";

import axios from "axios";

import {axiosPostMethod} from "../../utils/axiosMethods";
import {myOrdersLink} from "../userLinks";
import {getUserToken} from "../userToken";
import SingleOrder from "./SingleOrder";

const Orders: React.FC = () => {

    const [myOrders, updateMyOrders] = useState([]);

    useEffect(() => {
        const userId = getUserToken();
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
