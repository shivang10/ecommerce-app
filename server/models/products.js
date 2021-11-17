const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Products = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: Array, required: true },
    sellerDetails: { type: Schema.Types.Mixed, required: true },
    reviews: { type: Number },
    description: { type: String, required: true },
    stockQuantity: { type: Number, required: true }
});

const model = mongoose.model("Products", Products);

module.exports = model;
