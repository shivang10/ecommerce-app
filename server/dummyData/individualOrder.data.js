const randomPrice = () => Math.floor(Math.random() * 100) + 1;
const randomQuantity = () => Math.floor(Math.random() * 5) + 1;
const randomDiscount = () => Math.floor(Math.random() * 3);

const item1 = {
    name: "item1",
    price: randomPrice(),
    quantity: randomQuantity(),
    itemLink: "itemLink1",
    itemDiscount: randomDiscount()
};

const item2 = {
    name: "item2",
    price: randomPrice(),
    quantity: randomQuantity(),
    itemLink: "itemLink2",
    itemDiscount: randomDiscount()
};

const item3 = {
    name: "item3",
    price: randomPrice(),
    quantity: randomQuantity(),
    itemLink: "itemLink3",
    itemDiscount: randomDiscount()
};

const totalItems = [item1, item2, item3];

const individualOrderData = {
    items: totalItems,
    address: "Azkaban",
    modeOfPayment: "Coins",
    discount: 5
};

module.exports = individualOrderData;
