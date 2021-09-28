const router = require('express').Router();
const User = require('../models/user');

router.route('/:userId').put(async (req, res) => {
    const dataToBeUpdated = req.body;
    const {userId} = req.params;

    User.findOneAndReplace({_id: userId}, dataToBeUpdated, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    });
});

module.exports = router;
