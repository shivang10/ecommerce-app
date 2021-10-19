const mongoose = require("mongoose");

const PaymentMethods = new mongoose.Schema({
    paymentType: { type: String, required: true },
    upiId: { type: String, required: false },
    cardNumber: { type: Number, required: false },
    nameOnCard: { type: String, required: false }
});

const model = mongoose.model("PaymentMethods", PaymentMethods);

module.exports = model;
