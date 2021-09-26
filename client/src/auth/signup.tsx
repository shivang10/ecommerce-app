import React, {useState} from "react";

import {Redirect, useHistory} from "react-router-dom";

import {UserSignupDetailsInterface} from "./authInterface";
import {signupRequest, isUserLogged} from "./authServices";

const Signup: React.FC = ()=> {

    const history = useHistory();

    const [userDetails, updateUserDetails] = useState<UserSignupDetailsInterface>({
        username: "",
        email: "",
        phoneNumber: undefined,
        password: "",
    });

    const handleSubmit = async () => {
        const res = await signupRequest(userDetails);
        if(res.status === 200) {
            history.push("/login");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    if(isUserLogged) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            Signup
            <input onChange={handleChange} value={userDetails.username} name="username" type="text" />
            <input onChange={handleChange} value={userDetails.email} name="email" type="text" />
            <input onChange={handleChange} value={userDetails.phoneNumber} name="phoneNumber" type="number" />
            <input onChange={handleChange} value={userDetails.password} name="password" type="password" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Signup;
