const mongoose = require("mongoose");

const ItemOrder = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    itemLink: {type: String, required: true},
    itemDiscount: {type: Number, required: false}
});

const model = mongoose.model("ItemOrder", ItemOrder);

module.exports = model;
