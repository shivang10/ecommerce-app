const mongoose = require("mongoose");

const UserAddress = new mongoose.Schema({
    houseNumber: {type: String, required: true},
    locality: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pinCode: {type: Number, required: true},
    phoneNumber: {type: Number, required: true},
    anyDirection: {type: String, required: false}
});

const model = mongoose.model("UserAddress", UserAddress);

module.exports = model;
