import React from "react";

import {Link} from "react-router-dom";

const Profile: React.FC = () => {

    return (
        <div>
            User Profile
            <div>
                <Link to="/my-orders">My orders</Link>
            </div>
            <div>
                <Link to="/my-addresses">My addresses</Link>
            </div>
            <div>
                <Link to="/my-payment-methods">Payment Methods</Link>
            </div>
            <div>
                <Link to="/auth-services">Login and security</Link>
            </div>
        </div>
    );
};

export default Profile;
