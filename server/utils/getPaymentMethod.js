const PaymentMethods = require("../models/paymentMethods");

const getPaymentMethods = (paymentMethod) => {
    const { paymentType, upiId, cardNumber, nameOnCard } = paymentMethod;

    if (paymentType === "UPI") {
        return new PaymentMethods({
            paymentType,
            upiId
        });
    } else {
        return new PaymentMethods({
            paymentType,
            cardNumber,
            nameOnCard
        });
    }
};

module.exports = getPaymentMethods;
