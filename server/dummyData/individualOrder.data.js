const item1 = {
    name: "item1",
    price: 10,
    quantity: 1,
    itemLink: "itemLink1",
    itemDiscount: 1,
}

const item2 = {
    name: "item2",
    price: 20,
    quantity: 2,
    itemLink: "itemLink2",
    itemDiscount: 2,
}

const item3 = {
    name: "item3",
    price: 30,
    quantity: 3,
    itemLink: "itemLink3",
    itemDiscount: 3,
}


const totalItems = [item1, item2, item3];

const individualOrderData = {
    items: totalItems,
    address: "Hogwarts",
    modeOfPayment: "Coins",
    discount: 5
};

module.exports = individualOrderData;
