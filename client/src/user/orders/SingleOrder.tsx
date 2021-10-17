import React from "react";

import {SingleOrderInterface} from "./orderInterface";
import SingleOrderItems from "./SingleOrderItems";

const SingleOrder: React.FC<SingleOrderInterface> = ({
    orderDate, totalAmount,
    modeOfPayment, discount, finalAmount, address, itemsOrdered
}) => {
    const itemsList = itemsOrdered.map((item) =>
        <SingleOrderItems
            key={item["_id"]}
            name={item["name"]}
            price={item["price"]}
            quantity={item["quantity"]}
            totalPrice={item["totalPrice"]}
            itemDiscount={item["itemDiscount"]}
        />
    );
    return (
        <div>
            <div>Order date: {orderDate}</div>
            <div>Total amount: {totalAmount}</div>
            <div>Mode of payment: {modeOfPayment}</div>
            <div>Discount: {discount}</div>
            <div>Final Amount: {finalAmount}</div>
            <div>Address: {address}</div>
            {itemsList}
            --
        </div>
    );
};

export default SingleOrder;
