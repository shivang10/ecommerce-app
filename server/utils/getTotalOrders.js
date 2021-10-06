const getSingleOrderItem = require("./getSingleOrderItem");
const getTotalAmount = require("./getTotalAmount");

const IndividualOrder = require("../models/individualOrder");

const getTotalOrder = (orderedItems) => {
    const {items, address, modeOfPayment, discount} = orderedItems;

    const itemsOrdered = items.map(item => getSingleOrderItem(item));
    const orderDate = new Date();
    const totalAmount = getTotalAmount(items);
    const finalAmount = totalAmount - discount;

    return new IndividualOrder({
        orderDate,
        totalAmount,
        modeOfPayment,
        discount,
        finalAmount,
        address,
        itemsOrdered
    })

}

module.exports = getTotalOrder;
