const router = require("express").Router();
const User = require("../models/user");

router.route("/").post((req, res) => {
    const { userId } = req.body;

    User.findById(
        { _id: userId },
        "address",
        {},
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "Sorry, unable to fetch your saved addresses",
                    status: 400,
                    response: err
                });
            } else {
                return res.status(200).send({
                    message: "Your saved addresses are:",
                    status: 200,
                    response: result
                });
            }
        }
    );
});

module.exports = router;
