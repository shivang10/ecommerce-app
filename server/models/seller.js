const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
    sellerUsername: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    homeAddress: { type: String, required: true },
    storeAddress: { type: String, required: true },
    stocksAvailable: { type: Array, required: false }
}, {
    collection: "seller"
});

const model = mongoose.model("SellerSchema", SellerSchema);

module.exports = model;
