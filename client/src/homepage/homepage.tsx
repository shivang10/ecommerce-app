import React, {useEffect, useState} from "react";

import axios from "axios";
import {Link} from "react-router-dom";

import {myProductsLink} from "../user/userLinks";
import {axiosPostMethod} from "../utils/axiosMethods";

const Homepage: React.FC = () => {

    const [products, updateProducts] = useState([]);

    useEffect(() => {
        axios(
            {
                "url": myProductsLink,
                "method": axiosPostMethod,
            })
            .then(res => {
                updateProducts(res.data.response);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);
    return (
        <div>
            <nav className={"subnavigation"}>
                <ul className={"submenu"}>
                    <Link to={{pathname: "/searchresults/all", state: {data: products}}}>
                        <li>All</li>
                    </Link>
                    <Link to={{pathname: "/searchresults/Books", state: {data: products}}}>
                        <li>Books</li>
                    </Link>
                    <Link to={{pathname: "/searchresults/Mobiles", state: {data: products}}}>
                        <li>Mobiles</li>
                    </Link>
                    <Link to={{pathname: "/searchresults/Electronics", state: {data: products}}}>
                        <li>Electronics</li>
                    </Link>
                    <Link to={{pathname: "/searchresults/Fashion", state: {data: products}}}>
                        <li>Fashion</li>
                    </Link>
                    <Link to={{pathname: "/searchresults/Clothing", state: {data: products}}}>
                        <li>Clothing</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Homepage;
