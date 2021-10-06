const ItemOrder = require('../models/itemOrder');

const getSingleOrderItem = (item) => {
    const {name, price, quantity, itemLink, itemDiscount} = item;

    const totalPrice = price * quantity;

    return new ItemOrder({
        name,
        price,
        quantity,
        totalPrice,
        itemLink,
        itemDiscount,
    });
}

module.exports = getSingleOrderItem;
