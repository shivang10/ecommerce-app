const router = require("express").Router();
const User = require("../models/user");
const individualOrderData = require("../dummyData/individualOrder.data");

const getTotalOrder = require("../utils/getTotalOrders");

router.route("/").post(async (req, res) => {
    const { userId, username, email, phoneNumber } = req.body;

    if (!userId || !username || !email || !phoneNumber) {
        return res.json({ status: "error", error: "Empty fields" });
    }

    User.findById({ _id: userId }, async (err) => {
        if (err) {
            return res.status(400).send("user does not exist");
        } else {
            try {
                const itemsOrdered = getTotalOrder(individualOrderData);
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
                return res.status(200).send("Order is successfully placed", response);
            } catch (error) {
                return res.status(400).send("Sorry, unable to place your order");
            }
        }
    });
});

module.exports = router;
