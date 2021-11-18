import React from "react";

import {SingleProductInterface} from "./productinterface";

const SingleProduct: React.FC<SingleProductInterface> = ({
    name, price, tags, reviews, description
}) => {
    return (
        <div>
            <div>Name: {name}</div>
            <div>Price: {price}</div>
            <div>Tags: {tags}</div>
            <div>Reviews: {reviews}</div>
            <div>Description: {description}</div>
            --
        </div>
    );
};

export default SingleProduct;
