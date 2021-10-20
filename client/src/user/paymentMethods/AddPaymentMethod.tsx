import React, {useState} from "react";

import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import MessageBar from "../../components/MessageBar/MessageBar";
import {axiosPostMethod} from "../../utils/axiosMethods";
import {getUserToken} from "../userToken";
import {addPaymentMethodLink} from "./addPaymentMethodLink";
import {SinglePaymentInterface} from "./paymentsInterface";

const AddPaymentMethod: React.FC = () => {

    const history = useHistory();

    const {register, handleSubmit} = useForm<SinglePaymentInterface>();
    const [methodType, updateMethodType] = useState("UPI");

    const [additionSuccessful, updateAdditionSuccessful] = useState({
        message: "",
        response: "",
    });

    const changePaymentMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateMethodType(event.target.value);
    };

    const onSubmit: SubmitHandler<SinglePaymentInterface> = async (data) => {
        console.log(data);
        updateAdditionSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        const userId = getUserToken();
        let userData;
        if (methodType === "UPI") {
            userData = {
                userId,
                upiId: data["upiId"]
            };
        } else {
            userData = {
                userId,
                nameOnCard: data["nameOnCard"],
                cardNumber: data["cardNumber"]
            };
        }

        axios({
            "url": addPaymentMethodLink,
            "method": axiosPostMethod,
            "data": userData
        })
            .then((res) => {
                console.log(res.data);
                updateAdditionSuccessful({
                    message: "Your payment method has been successfully added.",
                    response: "success"
                });
                setTimeout(() => {
                    updateAdditionSuccessful({
                        message: "",
                        response: ""
                    });
                    history.push("/my-payment-methods");
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response);
                updateAdditionSuccessful({
                    message: "Some error came up. Please try again.",
                    response: "error"
                });
                setTimeout(() => {
                    updateAdditionSuccessful({
                        message: "",
                        response: ""
                    });
                }, 3000);
            });
    };


    return (
        <div>
            Add Payment method

            <select onChange={changePaymentMethod}>
                <option value="UPI">UPI ID</option>
                <option value="CARD">Debit/Credit Card</option>
            </select>
            <form onSubmit={handleSubmit(onSubmit)}>
                {methodType === "UPI" ?
                    <input {...register("upiId", {required: true, maxLength: 40})}
                        placeholder="UPI ID"
                    /> :
                    <>
                        <input {...register("nameOnCard", {required: true, maxLength: 40})}
                            placeholder="Name on card"
                        />
                        <input type="number" {...register("cardNumber", {required: true, maxLength: 9})}
                            placeholder="Card Number"
                        />
                    </>
                }
                <input type="submit"/>
            </form>

            <MessageBar
                responseType={additionSuccessful.response}
                messageType={additionSuccessful.message}
            />
        </div>
    );
};

export default AddPaymentMethod;
