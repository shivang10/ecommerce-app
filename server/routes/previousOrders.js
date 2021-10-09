const router = require("express").Router();
const User = require("../models/user");

router.route("/").get((req, res) => {
    const { userId } = req.body;

    User.findById(
        { _id: userId },
        "orders",
        {},
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: "Sorry, unable to fetch your orders",
                    status: 400,
                    response: err
                });
            } else {
                res.status(200).send({
                    message: "Your orders are as follows",
                    status: 200,
                    response: result
                });
            }
        }
    );
});

module.exports = router;
