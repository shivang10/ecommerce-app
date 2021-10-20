import React, {useEffect, useState} from "react";

import axios from "axios";
import {Link} from "react-router-dom";

import {axiosPostMethod} from "../../utils/axiosMethods";
import {myPaymentMethodsLink} from "../userLinks";
import {getUserToken} from "../userToken";
import SinglePaymentMethod from "./SinglePaymentMethod";


const PaymentMethods: React.FC = () => {

    const [myPaymentMethods, updateMyPaymentMethods] = useState([]);

    useEffect(() => {
        const userId = getUserToken();
        axios(
            {
                "url": myPaymentMethodsLink,
                "method": axiosPostMethod,
                "data": {userId},
            }
        )
            .then((res) => {
                updateMyPaymentMethods(res.data.response.paymentMethods);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const allPaymentMethods = myPaymentMethods.map((payment) => {
        return <SinglePaymentMethod
            key={payment["_id"]}
            paymentType={payment["paymentType"]}
            upiId={payment["upiId"]}
            cardNumber={payment["cardNumber"]}
            nameOnCard={payment["nameOnCard"]}
        />;
    });

    return (
        <div>
            Payment Methods
            <Link to="add-payment-method">Add Payment Method</Link>
            {allPaymentMethods}
        </div>
    );
};

export default PaymentMethods;
