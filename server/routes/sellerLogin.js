const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "jnfkdfnblnbl#(18579130314@#$@$nblsnflnslvl(@#&%Y)!#$$!fakf#(*%)!%)(!dffsdfsd";

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const isSellerValid = await Seller.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, isSellerValid.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ id: isSellerValid._id, username: isSellerValid.sellerUsername }, JWT_SECRET);
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
