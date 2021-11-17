import jwt_decode from "jwt-decode";

import {SellerTokenInterface} from "./sellerInterface";

export const getSellerToken = (): string | undefined => {
    const sellerToken = localStorage.getItem("sellerToken");
    let sellerDetails: SellerTokenInterface;
    let sellerId;
    if (sellerToken) {
        sellerDetails = jwt_decode(sellerToken);
        sellerId = sellerDetails["id"];
    }
    return sellerId;
};