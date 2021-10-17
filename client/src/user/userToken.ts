import jwt_decode from "jwt-decode";

import {UserTokenInterface} from "./userInterface";

export const getUserToken = (): string | undefined => {
    const userToken = localStorage.getItem("userToken");
    let userDetails: UserTokenInterface;
    let userId;
    if (userToken) {
        userDetails = jwt_decode(userToken);
        userId = userDetails["id"];
    }
    return userId;
};