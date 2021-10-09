const mongoose = require("mongoose");

const IndividualOrder = new mongoose.Schema({
    orderDate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    modeOfPayment: { type: String, required: true },
    discount: { type: Number, required: false },
    finalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    itemsOrdered: { type: Array, required: true }
});

const model = mongoose.model("IndividualOrder", IndividualOrder);

module.exports = model;
