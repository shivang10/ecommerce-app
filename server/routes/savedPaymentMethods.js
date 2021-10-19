const router = require("express").Router();
const User = require("../models/user");

router.route("/").post((req, res) => {
    const { userId } = req.body;

    User.findById(
        { _id: userId },
        "paymentMethods",
        {},
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "Sorry, unable to fetch your saved orders",
                    response: err
                });
            } else {
                return res.status(200).send({
                    message: "Your saved payment methods are: ",
                    status: 200,
                    response: result
                });
            }
        }
    );
});

module.exports = router;
