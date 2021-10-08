const router = require('express').Router();
const User = require('../models/user');

router.route('/').get((req, res) => {
    const {userId} = req.body;

     User.findById(
        {_id: userId},
        'orders',
         {},
        (err, result) => {
            if (err) {
                res.status(400).send("Error occurred");
            } else {
                res.status(200).send(result);
            }
        }
    );
});

module.exports = router;
