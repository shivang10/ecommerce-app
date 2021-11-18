import React from "react";

import {useLocation, useParams} from "react-router-dom";

import SingleProduct from "./SingleProduct";


const DisplayProducts: React.FC = () => {

    const {option}: { option: string } = useParams();
    const location = useLocation();
    const data: any = location.state;
    let tags: string[];

    const products = data["data"].map((product: any) => {
        tags = product["tags"];
        if (option == "all") {
            return <SingleProduct
                key={product["_id"]}
                name={product["name"]}
                price={product["price"]}
                tags={product["tags"]}
                reviews={product["reviews"]}
                description={product["description"]}/>;
        } else if (tags.includes(option)) {
            return <SingleProduct
                key={product["_id"]}
                name={product["name"]}
                price={product["price"]}
                tags={product["tags"]}
                reviews={product["reviews"]}
                description={product["description"]}/>;
        }
    });

    return (
        <div>
            <p>{products}</p>
        </div>
    );
};

export default DisplayProducts;
