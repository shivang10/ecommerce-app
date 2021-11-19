const router = require("express").Router();
const Products = require("../models/products");

router.route("/").post((req, res) => {
    const { sellerId } = req.body;

    Products.find({ "sellerDetails.id": sellerId }, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: "Sorry, unable to fetch your products",
                status: 400,
                response: err
            });
        } else {
            return res.status(200).send({
                message: "Your products are as follows",
                status: 200,
                response: result
            });
        }
    });
});

module.exports = router;
