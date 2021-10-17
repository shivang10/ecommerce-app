import React,{useEffect, useState} from "react";

import axios from "axios";

import {axiosPostMethod} from "../../utils/axiosMethods";
import {myAddressesLink} from "../userLinks";
import {getUserToken} from "../userToken";
import SingleAddress from "./SingleAddress";

const Address: React.FC = () => {

    const [myAddresses, updateMyAddresses] = useState([]);

    useEffect(() => {
        const userId = getUserToken();
        axios(
            {
                "url": myAddressesLink,
                "method": axiosPostMethod,
                "data": {userId}
            }
        )
            .then((res) => {
                updateMyAddresses(res.data.response.address);
            })
            .catch((err) => {
                console.log(err.response);
            });
    },[]);

    const allSavedAddress = myAddresses.map((address) =>
        <SingleAddress
            key={address["_id"]}
            houseNumber={address["houseNumber"]}
            locality={address["locality"]}
            city={address["city"]}
            state={address["state"]}
            pinCode={address["pinCode"]}
            phoneNumber={address["phoneNumber"]}
            anyDirection={address["anyDirection"]}
        />
    );

    return (
        <div>
            My Saved Address
            {allSavedAddress}
        </div>
    );
};

export default Address;
