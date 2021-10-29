const router = require("express").Router();
const Seller = require("../models/seller");
const Products = require("../models/products");
const getUpdateProductDetails = require("../utils/getUpdateProductDetails");

router.route("/").post((req, res) => {
    const { sellerId, productId } = req.body;

    if (!sellerId) {
        return res.status(400).status({
            message: "No seller is there",
            status: 400
        });
    }

    Seller.findById({ _id: sellerId }, async (err) => {
        if (err) {
            return res.status(400).send({
                message: "Seller does not exist",
                status: 400
            });
        } else {
            try {
                const dataToBeUpdated = getUpdateProductDetails(req.body);
                Products.findOneAndUpdate(
                    { _id: productId },
                    { $set: dataToBeUpdated },
                    { upsert: true, new: true },
                    (errors, result) => {
                        if (errors) {
                            return res.status(400).send({
                                message: "Unable to update your details",
                                status: 400,
                                response: errors
                            });
                        } else {
                            return res.status(200).send({
                                message: "Product is successfully updated.",
                                status: 200,
                                response: result
                            });
                        }
                    }
                );
            } catch (error) {
                return res.status(400).send({
                    message: "Sorry, unable to update the product",
                    status: 400,
                    response: error
                });
            }
        }
    });
});

module.exports = router;
