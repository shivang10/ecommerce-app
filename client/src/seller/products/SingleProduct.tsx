import React from "react";

import {ProductInterface} from "./productsInterface";

const SingleProduct: React.FC<ProductInterface> = ({
    name, description,
    tags, price, stockQuantity
}) => {
    return (
        <div>
            <div>Name: {name}</div>
            <div>Description: {description}</div>
            <div>Price: {price}</div>
            <div>Stock Quantity: {stockQuantity}</div>
            <div>Tags: {tags}</div>
        </div>
    );
};

export default SingleProduct;
