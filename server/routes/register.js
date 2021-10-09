const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.route("/").post(async (req, res) => {
    const { username, password: plainTextPassword, email, phoneNumber } = req.body;
    if (!username || typeof username !== "string") {
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

    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            username,
            password,
            email,
            phoneNumber
        });
        return res.status(200).send({
            message: "Your account is successfully created",
            response: response,
            status: 200
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({
                message: "User already exists",
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
