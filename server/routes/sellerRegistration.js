const router = require("express").Router();
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.route("/").post(async (req, res) => {
    const {
        sellerUsername, password: plainTextPassword, email,
        phoneNumber, homeAddress, storeAddress
    } = req.body;

    if (!sellerUsername || typeof sellerUsername !== "string") {
        return res.status(400).send({
            message: "Username is either empty or contains only number.",
            status: 400
        });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
        return res.status(400).send({
            message: "Password is not of valid format.",
            status: 400
        });
    }

    if (!email || typeof email !== "string") {
        return res.status(400).send({
            message: "Email is either empty or not in the correct format.",
            status: 400
        });
    }
    if (!phoneNumber || typeof phoneNumber !== "number") {
        return res.status(400).send({
            message: "Phone number is not valid.",
            status: 400
        });
    }

    if (!homeAddress || !storeAddress) {
        return res.status(400).send({
            message: "Address field cannot be empty.",
            status: 400
        });
    }

    const password = await bcrypt.hash(plainTextPassword, saltRounds);
    try {
        const response = await Seller.create({
            sellerUsername,
            password,
            email,
            phoneNumber,
            homeAddress,
            storeAddress
        });
        return res.status(200).send({
            message: "You are successfully registered as a seller.",
            response: response,
            status: 200
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                message: "Seller username already exists",
                error: error,
                status: 400
            });
        } else {
            return res.status(400).send({
                message: "Some error came up. Please try again",
                error: error,
                status: 400
            });
        }
    }
});

module.exports = router;
