const router = require('express').Router();
const User = require('../models/user');
const getUserAddress = require("../utils/getUserAddress");

router.route('/').post((req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({status: 400, error: "Invalid data"});
    }

    User.findById({_id: userId}, async (err) => {
        if (err) {
            return res.status(400).send("user does not exist");
        } else {
            try {
                const addressAdded = getUserAddress(req.body);
                const response = await User.findOneAndUpdate(
                    {_id: userId},
                    {
                        $push: {
                            'address': {
                                $each: [addressAdded],
                                $position: 0,
                            }
                        }
                    },
                    {new: true, upsert: true},
                );
                return res.status(200).send("Address is added successfully", response);
            } catch (error) {
                return res.status(400).send("Sorry, cannot add the address", error);
            }
        }
    })

});

module.exports = router;
