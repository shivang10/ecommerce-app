import React, {useState} from "react";

import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";

import MessageBar from "../components/MessageBar/MessageBar";
import {axiosPostMethod} from "../utils/axiosMethods";
import {SellerLoginDetailsInterface, UserLoginDetailsInterface} from "./authInterface";
import {sellerLoginLink} from "./authLink";
import {isSellerLogged} from "./authServices";

const SellerLogin: React.FC = () => {
    const {register, handleSubmit} = useForm<SellerLoginDetailsInterface>();

    const [sellerLoginSuccessful, updateSellerLoginSuccessful] = useState({
        message: "",
        response: ""
    });

    const onSubmit: SubmitHandler<UserLoginDetailsInterface> = async (data) => {
        updateSellerLoginSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        axios({
            "url": sellerLoginLink,
            "method": axiosPostMethod,
            "data": data
        })
            .then((res) => {
                updateSellerLoginSuccessful({
                    message: "Your are successfully logged in",
                    response: "success"
                });
                setTimeout(() => {
                    updateSellerLoginSuccessful({
                        message: "",
                        response: ""
                    });
                    localStorage.setItem("sellerToken", res.data.data);
                    window.location.reload();
                }, 3000);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                updateSellerLoginSuccessful({
                    message: "Some error came up. Please try again.",
                    response: "error"
                });
                setTimeout(() => {
                    updateSellerLoginSuccessful({
                        message: "",
                        response: ""
                    });
                }, 3000);
            });
    };

    if (isSellerLogged) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            Seller Login
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" {...register("email", {required: true, maxLength: 30})} />
                <input placeholder="Password"
                    type="password" {...register("password", {required: true})} />
                <input type="submit"/>
            </form>
            <MessageBar
                responseType={sellerLoginSuccessful.response}
                messageType={sellerLoginSuccessful.message}
            />
        </div>
    );
};

export default SellerLogin;
