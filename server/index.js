const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBCLUSTER}.mongodb.net/${process.env.MONGODBDBNAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.use(bodyParser.json());
app.use(cors());

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const updateUserRouter = require("./routes/updateUserDetails");
app.use("/update-my-profile", updateUserRouter);

const userOrderRouter = require("./routes/userOrder");
app.use("/new-order", userOrderRouter);

const userPreviousOrders = require("./routes/previousOrders");
app.use("/my-orders", userPreviousOrders);

const userSavedAddresses = require("./routes/savedAddresses");
app.use("/my-addresses", userSavedAddresses);

const addNewAddress = require("./routes/addUserAddress");
app.use("/add-address", addNewAddress);

const userSavedPaymentMethods = require("./routes/savedPaymentMethods");
app.use("/my-payment-methods", userSavedPaymentMethods);

const addNewPaymentMethod = require("./routes/addPaymentMethod");
app.use("/add-payment-method", addNewPaymentMethod);

const sellerRegistration = require("./routes/sellerRegistration");
app.use("/seller-registration", sellerRegistration);

const sellerLogin = require("./routes/sellerLogin");
app.use("/seller-login", sellerLogin);

const addProduct = require("./routes/addProducts");
app.use("/add-product", addProduct);

app.listen(5000, () => {
    console.log("server is running on 5000.");
});
