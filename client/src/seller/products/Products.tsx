import React, {useEffect, useState} from "react";

import axios from "axios";
import {Link} from "react-router-dom";

import {addProduct} from "../../routes/routesLink";
import {axiosPostMethod} from "../../utils/axiosMethods";
import {myProductsLink} from "../sellerLinks";
import {getSellerToken} from "../sellerToken";
import SingleProduct from "./SingleProduct";

const Products: React.FC = () => {
    const [myProducts, updateMyProducts] = useState([]);

    useEffect(() => {
        const sellerId = getSellerToken();
        axios({
            "url": myProductsLink,
            "method": axiosPostMethod,
            "data": {sellerId}
        })
            .then((res) => {
                updateMyProducts(res.data.response);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const productTags = (tags: []): JSX.Element[] => tags.map((tag, index) => <span key={index}>{tag}</span>);

    const allProducts = myProducts.map((product) => <SingleProduct
        key={product["_id"]}
        name={product["name"]}
        price={product["price"]}
        tags={productTags(product["tags"])}
        description={product["description"]}
        stockQuantity={product["stockQuantity"]}
    />
    );

    return (
        <div>
            My products
            <Link to={addProduct}>Add new product</Link>
            {allProducts}
        </div>
    );

};

export default Products;
