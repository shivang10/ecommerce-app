const router = require("express").Router();
const User = require("../models/user");

const getTotalOrder = require("../utils/getTotalOrders");
const updateProductsBought = require("../utils/updateProductsBought");

router.route("/").post(async (req, res) => {
    const { userId, username, email, phoneNumber } = req.body;

    if (!userId || !username || !email || !phoneNumber) {
        return res.status(400).send({
            message: "Please fill all the required fields.",
            status: 400
        });
    }

    User.findById({ _id: userId }, async (err) => {
        if (err) {
            return res.status(400).send({
                message: "Wrong username or password",
                status: 400,
                response: err
            });
        } else {
            try {
                const itemsOrdered = getTotalOrder(req.body);
                const response = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            orders: {
                                $each: [itemsOrdered],
                                $position: 0
                            }
                        }
                    },
                    { new: true, upsert: true }
                );
                const updateResult = await updateProductsBought(req.body);
                console.log(updateResult);
                return res.status(200).send({
                    message: "Your order is successfully placed.",
                    status: 200,
                    response: response
                });
            } catch (error) {
                return res.status(400).send({
                    message: "Sorry, unable to place your order",
                    status: 400,
                    response: error
                });
            }
        }
    });
});

module.exports = router;
