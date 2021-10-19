import React from "react";

import NavBar from "../components/NavBar";
import Routes from "../routes/routes";

const Homepage: React.FC = () => {

    return (
        <div>
            <NavBar/>
            <Routes/>
        </div>
    );
};

export default Homepage;
