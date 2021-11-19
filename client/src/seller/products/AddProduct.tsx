import React, {useState} from "react";

import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";

import {isUserLogged} from "../../auth/authServices";
import MessageBar from "../../components/MessageBar/MessageBar";
import {axiosPostMethod} from "../../utils/axiosMethods";
import {getSellerToken} from "../sellerToken";
import {AddProductInterface} from "./productsInterface";
import {addProductLink} from "./productsLink";


const AddProduct: React.FC = () => {

    const {register, handleSubmit} = useForm<AddProductInterface>();

    const [tagValue, updateTagValue] = useState("");
    const [productTags, updateProductTags] = useState<string[]>([]);

    const [addProductSuccessful, updateAddProductSuccessful] = useState({
        message: "",
        response: ""
    });

    const handleTagValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        updateTagValue(event.target.value);

    const handleTagAddition = () => updateProductTags([...productTags, tagValue]);

    const onSubmit: SubmitHandler<AddProductInterface> = async (data) => {
        updateAddProductSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        const sellerDetails = {
            "id": getSellerToken()
        };
        const sellerData = {
            ...data,
            sellerDetails,
            tags: productTags
        };

        axios({
            "url": addProductLink,
            "method": axiosPostMethod,
            "data": sellerData
        })
            .then((res) => {
                updateAddProductSuccessful({
                    message: "Product is successfully added",
                    response: "success"
                });

                setTimeout(() => {
                    updateAddProductSuccessful({
                        message: "",
                        response: ""
                    });
                    console.log(res);
                }, 2500);
            })
            .catch((err) => {
                updateAddProductSuccessful({
                    message: "Some error came up. Please try again",
                    response: "error"
                });

                setTimeout(() => {
                    updateAddProductSuccessful({
                        message: "",
                        response: ""
                    });
                }, 2500);
                console.log(err.response);
            });
    };

    if (isUserLogged) {
        return <Redirect to="/"/>;
    }

    const productTagsList = productTags.map((tag, index) => <span key={index}>{tag}</span>);

    return (
        <div>
            Add Product

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Product name" {...register("name", {required: true})} />
                <input
                    placeholder="Price" type="number"
                    {...register("price", {required: true})} />
                <div>
                    {productTagsList}
                    <input placeholder="Tags" value={tagValue} onChange={handleTagValue}/>
                    <button onClick={handleTagAddition}>+</button>
                </div>
                <input placeholder="Description" {...register("description", {required: true})} />
                <input
                    placeholder="Stock Quantity" type="number"
                    {...register("stockQuantity", {required: true})} />
                <input type="submit"/>
            </form>
            <MessageBar
                responseType={addProductSuccessful.response}
                messageType={addProductSuccessful.message}
            />
        </div>
    );
};

export default AddProduct;
