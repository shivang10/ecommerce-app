const UserAddress = require("../models/userAddress");

const getUserAddress = (data) => {
    const {
        houseNumber, locality, city, state,
        pinCode, phoneNumber, anyDirection
    } = data;

    return new UserAddress({
        houseNumber,
        locality,
        city,
        state,
        pinCode,
        phoneNumber,
        anyDirection
    });
};

module.exports = getUserAddress;
