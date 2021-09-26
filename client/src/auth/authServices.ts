import axios from "axios";

import {UserLoginDetailsInterface, UserSignupDetailsInterface} from "./authInterface";
import {signupServerLink, loginServerLink} from "./authLink";

const axiosPostMethod = "post";

export const loginRequest: any = (userDetails: UserLoginDetailsInterface) => {
    return axios({
        "url": loginServerLink,
        "method": axiosPostMethod,
        "data": userDetails
    })
        .then((res) => res)
        .catch((err) => err);
};


export const signupRequest: any = (userDetails: UserSignupDetailsInterface) => {
    return axios({
        "url": signupServerLink,
        "method": axiosPostMethod,
        "data": userDetails
    })
        .then((res) => res)
        .catch((err) => err);
};

export const isUserLogged = localStorage.getItem("userToken");

export const logoutUser = () => localStorage.removeItem("userToken");