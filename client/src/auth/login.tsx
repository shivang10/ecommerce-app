import React, {useState} from "react";

import {Redirect} from "react-router-dom";

import {UserLoginDetailsInterface} from "./authInterface";
import {loginRequest, isUserLogged} from "./authServices";

const Login: React.FC = ()=> {

    const [userDetails, updateUserDetails] = useState<UserLoginDetailsInterface>({
        email: "",
        password: "",
    });

    const [loginSuccessful, updateLoginSuccessful] = useState(false);

    const handleSubmit = async () => {
        const res = await loginRequest(userDetails);
        if(res){
            updateLoginSuccessful(true);
            setTimeout(() => {
                localStorage.setItem("userToken", res.data.data);
                window.location.reload();
            }, 2000);
        } else  {
            updateLoginSuccessful(false);
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
            Login
            <input onChange={handleChange} value={userDetails.email} name="email" type="text" />
            <input onChange={handleChange} value={userDetails.password} name="password" type="password" />
            <button onClick={handleSubmit}>Submit</button>
            {loginSuccessful && <div> Logged in successfully </div>}
        </div>
    );
};

export default Login;
