import React from "react";

import {SingleOrderItemInterface} from "./singleOrderItemInterface";

const SingleOrderItems: React.FC<SingleOrderItemInterface> = ({
    name,
    price,
    quantity,
    totalPrice,
    itemDiscount
}) => {
    return (
        <div>
            <div>name{name}</div>
            <div>price{price}</div>
            <div>quantity{quantity}</div>
            <div>Total Price: {totalPrice}</div>
            <div>Item Discount: {itemDiscount} {}</div>
        </div>
    );
};

export default SingleOrderItems;
