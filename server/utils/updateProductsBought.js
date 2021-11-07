const Products = require("../models/products");

const updateProductsBought = (data) => {
    const { items } = data;
    const updateProductRequest = items.map((product) => {
        const dataToBeUpdated = {
            stockQuantity: product.totalQuantity - product.quantity
        };
        return Products.findOneAndUpdate(
            { _id: product.productId },
            { $set: dataToBeUpdated },
            { upsert: true, new: true }
        )
            .then(res => console.log(res))
            .catch(err => console.log(err));
    });

    return Promise.all(updateProductRequest);
};

module.exports = updateProductsBought;
