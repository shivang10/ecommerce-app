const router = require("express").Router();
const User = require("../models/user");

router.route("/:userId").put(async (req, res) => {
    const dataToBeUpdated = req.body;
    const { userId } = req.params;

    User.findOneAndReplace(
        { _id: userId },
        { $set: { dataToBeUpdated } },
        { upsert: true, new: true },
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: "Unable to update your details",
                    status: 400,
                    response: err
                });
            } else {
                res.status(200).send({
                    message: "Your details are successfully updated",
                    status: 200,
                    response: result
                });
            }
        });
});

module.exports = router;
