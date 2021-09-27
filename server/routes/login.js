const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'jnfkdfnblnbl#(18579130314@#$@$nblsnflnslvl(@#&%Y)!#$$!fakf#(*%)!%)(!dffsdfsd'

router.post('/', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email}).lean()
    if (!user) {
        return res.json({status: 'error', error: 'Invalid username'})
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET)
        return res.json({status: 'ok', data: token})
    }

    return res.json({status: 'error', error: 'Invalid Password'})
});

module.exports = router;
