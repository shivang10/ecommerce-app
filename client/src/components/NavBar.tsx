import React from "react";

import {Link} from "react-router-dom";

import {isUserLogged, logoutUser, isSellerLogged, logoutSeller} from "../auth/authServices";

const NavBar: React.FC = () => {

    const handleLogoutUser = () => {
        logoutUser();
        window.location.reload();
    };

    const handleLogoutSeller = () => {
        logoutSeller();
        window.location.reload();
    };

    let profileMenu = (
        <>
            <Link className="btn-link__navBar" to="/login">Login</Link>
            <Link className="btn-link__navBar" to="/register">Register</Link>
            <Link className="btn-link__navBar" to="/seller-login">Seller Login</Link>
            <Link className="btn-link__navBar" to="/seller-register">Seller Register</Link>
        </>
    );

    if(isUserLogged){
        profileMenu = (
            <>
                Hello User
                <button onClick={handleLogoutUser}>Logout</button>
            </>
        );
    }

    if(isSellerLogged){
        profileMenu = (
            <>
                Hello Seller
                <button onClick={handleLogoutSeller}>Logout</button>
            </>
        );
    }

    return (
        <>
            ShoppingTime
            <input type="search" />
            {profileMenu}
        </>
    );
};

export default NavBar;
