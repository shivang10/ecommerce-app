import React from "react";

import {SinglePaymentInterface} from "./paymentsInterface";

const SinglePaymentMethod: React.FC<SinglePaymentInterface> = ({
    paymentType, cardNumber, nameOnCard, upiId
}) => {

    if(paymentType === "UPI") {
        return (
            <div>
                <div>Payment Mode: UPI</div>
                <div>UPI: {upiId}</div>
                ---
            </div>
        );
    }

    return(
        <div>
            <div>Payment Mode: Card</div>
            <div>Name on Card: {nameOnCard}</div>
            <div>Card Number: {cardNumber}</div>
            ---
        </div>
    );
};

export default SinglePaymentMethod;
