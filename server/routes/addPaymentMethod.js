const router = require("express").Router();
const User = require("../models/user");
const getPaymentMethods = require("../utils/getPaymentMethod");

router.route("/").post((req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).send({
            message: "No user is there",
            status: 400
        });
    }

    User.findById({ _id: userId }, async (err) => {
        if (err) {
            return res.status(400).send({
                message: "User does not exit",
                status: 400
            });
        } else {
            try {
                const paymentAdded = getPaymentMethods(req.body);
                const response = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            paymentMethods: {
                                $each: [paymentAdded],
                                $position: 0
                            }
                        }
                    },
                    { new: true, upsert: true }
                );

                return res.status(200).send({
                    message: "Payment method is successfully added",
                    status: 200,
                    response: response
                });
            } catch (error) {
                return res.status(400).send({
                    message: "Unable to add your payment methods",
                    status: 400,
                    response: error
                });
            }
        }
    });
});

module.exports = router;
