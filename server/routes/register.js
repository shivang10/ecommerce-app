const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.route("/").post(async (req, res) => {
    const { username, password: plainTextPassword, email, phoneNumber } = req.body;
    const password = await bcrypt.hash(plainTextPassword, saltRounds);
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
