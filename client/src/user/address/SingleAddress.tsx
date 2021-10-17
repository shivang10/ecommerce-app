import React from "react";

import {AddressInterface} from "./addressInterface";

const SingleAddress: React.FC<AddressInterface> = ({
    houseNumber, locality, city, state,
    pinCode, phoneNumber, anyDirection
}) => {
    return (
        <div>
            <div>House Number:  {houseNumber}</div>
            <div>Locality: {locality}</div>
            <div>City: {city}</div>
            <div>State: {state}</div>
            <div>PinCode: {pinCode}</div>
            <div>Phone Number: {phoneNumber}</div>
            <div>Any Direction: {anyDirection}</div>
            --
        </div>
    );
};

export default SingleAddress;
