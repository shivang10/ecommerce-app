import React from "react";

import {Link} from "react-router-dom";

import {isUserLogged, logoutUser} from "../auth/authServices";

const Homepage: React.FC = () => {

    const handleLogoutUser = () => {
        logoutUser();
        window.location.reload();
    };

    return(
        <div>
            E-commerce App HomePage
            {isUserLogged ?
                <>
                    <div>user is there</div>
                    <button onClick={handleLogoutUser}>Logout </button>
                </>
                :
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">SignUP</Link>
                </>
            }
        </div>
    );
};

export default Homepage;
