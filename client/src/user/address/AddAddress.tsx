import React,{useState} from "react";

import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import MessageBar from "../../components/MessageBar/MessageBar";
import {axiosPostMethod} from "../../utils/axiosMethods";
import {getUserToken} from "../userToken";
import {addAddressLink} from "./addAddressLink";
import {AddressInterface} from "./addressInterface";

const AddAddress: React.FC = () => {

    const history = useHistory();

    const {register, handleSubmit} = useForm<AddressInterface>();

    const [additionSuccessful, updateAdditionSuccessful] = useState({
        message: "",
        response: "",
    });

    const onSubmit: SubmitHandler<AddressInterface> = async (data) => {
        updateAdditionSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        const userId = getUserToken();
        const userData = {
            ...data,
            userId
        };

        axios({
            "url": addAddressLink,
            "method": axiosPostMethod,
            "data": userData
        })
            .then((res) => {
                updateAdditionSuccessful({
                    message: "Your address has been successfully added",
                    response: "success"
                });
                setTimeout(() => {
                    updateAdditionSuccessful({
                        message: "",
                        response: ""
                    });
                    history.push("/my-addresses");
                }, 3000);
                console.log(res.data);
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
            })
        ;
    };

    return(
        <div>
            Add Address
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("houseNumber", {required: true, maxLength: 40})}
                    placeholder="House Number"
                />
                <input {...register("locality", {required: true, maxLength: 40})}
                    placeholder="Locality"
                />
                <input {...register("city", {required: true, maxLength: 40})}
                    placeholder="City"
                />
                <input {...register("state", {required: true, maxLength: 40})}
                    placeholder="State"
                />
                <input type="number" {...register("pinCode", {required: true, maxLength: 6})}
                    placeholder="PinCode"
                />
                <input type="number" {...register("phoneNumber", {required: true, maxLength: 40})}
                    placeholder="Phone Number"
                />
                <input {...register("anyDirection")}
                    placeholder="Any Direction"
                />
                <input type="submit" />
            </form>
            <MessageBar
                responseType={additionSuccessful.response}
                messageType={additionSuccessful.message}
            />
        </div>
    );
};

export default AddAddress;
