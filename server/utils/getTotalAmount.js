const getTotalAmount = (items) => items
    .map(item => item["price"] * item["quantity"])
    .reduce((item1, item2) => item1 + item2, 0);

module.exports = getTotalAmount;
