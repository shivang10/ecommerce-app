const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");

router.route('/').post(async (req, res) => {
    const {username, password: plainTextPassword, email, phoneNumber} = req.body
    if (!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Invalid Username'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Invalid password'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            username,
            password,
            email,
            phoneNumber
        })
        console.log('User Created', response)
        return res.json({status: "ok"})

    } catch (error) {
        if (error.code === 11000) {
            return res.json({status: error, error: 'Duplicate Key'})
        } else {
            return res.json({status: error})
        }
    }
});

module.exports = router;
