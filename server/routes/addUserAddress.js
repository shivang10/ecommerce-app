const router = require("express").Router();
const User = require("../models/user");
const getUserAddress = require("../utils/getUserAddress");

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
                message: "User does not exist",
                status: 400,
                response: err
            });
        } else {
            try {
                const addressAdded = getUserAddress(req.body);
                const response = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            address: {
                                $each: [addressAdded],
                                $position: 0
                            }
                        }
                    },
                    { new: true, upsert: true }
                );
                return res.status(200).send({
                    message: "Address is added successfully",
                    response: response,
                    status: 200
                });
            } catch (error) {
                return res.status(400).send({
                    message: "Sorry, cannot add the address",
                    status: 400,
                    response: error
                });
            }
        }
    });
});

module.exports = router;
