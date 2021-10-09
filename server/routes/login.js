const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "jnfkdfnblnbl#(18579130314@#$@$nblsnflnslvl(@#&%Y)!#$$!fakf#(*%)!%)(!dffsdfsd";

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const isUserValid = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, isUserValid.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ id: isUserValid._id, username: isUserValid.username }, JWT_SECRET);
            return res.status(200).send({
                message: "Successfully logged in",
                data: token,
                status: 200
            });
        } else {
            res.status(400).send({
                message: "Wrong username or password. Try Again",
                status: 400
            });
        }
    } catch (err) {
        res.status(400).send({
            message: "Wrong username or password. Try Again",
            status: 400
        });
    }
});

module.exports = router;
