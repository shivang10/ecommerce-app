const router = require("express").Router();
const Products = require("../models/products");

router.route("/").post((req, res) => {
    const data = Products.find({});
    data.exec(function (error, result) {
        if (error) {
            return res.status(400).send({
                message: "Unable to Fetch Products",
                status: 400,
                response: error
            });
        } else {
            return res.status(200).send({
                message: "Desired Products:",
                status: 200,
                response: result
            });
        }
    });
});

module.exports = router;
