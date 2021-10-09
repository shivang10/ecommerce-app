const router = require("express").Router();
const User = require("../models/user");

router.route("/:userId").put(async (req, res) => {
    const dataToBeUpdated = req.body;
    const { userId } = req.params;

    User.findOneAndReplace({ _id: userId }, dataToBeUpdated, (err, result) => {
        if (err) {
            res.status(200).send(err);
        } else {
            res.status(400).send(result);
        }
    });
});

module.exports = router;
