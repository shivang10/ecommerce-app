const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "jnfkdfnblnbl#(18579130314@#$@$nblsnflnslvl(@#&%Y)!#$$!fakf#(*%)!%)(!dffsdfsd";

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await Seller.findOne({ email }).lean();
    if (!user || !password) {
        return res.status(400).send({
            message: "Wrong username or password",
            status: 400
        });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
        return res.status(200).send({
            message: "Successfully logged in",
            data: token,
            status: 200
        });
    }

    return res.status(400).send({
        message: "Wrong username or password",
        status: 400
    });
});

module.exports = router;
