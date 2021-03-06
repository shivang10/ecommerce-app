const router = require("express").Router();
const Seller = require("../models/seller");
const Products = require("../models/products");
const getAddProductDetails = require("../utils/getAddProductDetails");

router.route("/").post((req, res) => {
    const sellerId = req.body.sellerDetails.id;

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
                const addProductDetails = getAddProductDetails(req.body);
                const response = await Products.create(addProductDetails);

                const addedProductDetails = response.id;

                const sellerResponse = await Seller.findOneAndUpdate(
                    { _id: sellerId },
                    {
                        $push: {
                            stocksAvailable: {
                                $each: [addedProductDetails],
                                $position: 0
                            }
                        }
                    },
                    { new: true, upsert: true }
                );

                return res.status(200).send({
                    message: "Product is successfully added",
                    response: [response, sellerResponse],
                    status: 200
                });
            } catch (error) {
                return res.status(400).send({
                    message: "Sorry, unable to add the address",
                    status: 400,
                    response: error
                });
            }
        }
    });
});

module.exports = router;
