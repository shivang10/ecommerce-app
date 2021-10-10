import React, {useState} from "react";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {Avatar, Button, Grid, InputAdornment, OutlinedInput, Paper, TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {Redirect} from "react-router-dom";

import {UserLoginDetailsInterface} from "./authInterface";
import {loginRequest, isUserLogged} from "./authServices";

const Login: React.FC = () => {

    const [userDetails, updateUserDetails] = useState<UserLoginDetailsInterface>({
        email: "",
        password: "",
    });

    const [value, setValue] = useState({
        showPassword: false
    });

    const [loginSuccessful, updateLoginSuccessful] = useState(false);

    const handleSubmit = async () => {
        const res = await loginRequest(userDetails);
        if (res) {
            updateLoginSuccessful(true);
            setTimeout(() => {
                localStorage.setItem("userToken", res.data.data);
                window.location.reload();
            }, 2000);
        } else {
            updateLoginSuccessful(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    if (isUserLogged) {
        return <Redirect to="/"/>;
    }

    const paperStyle = {padding: 20, height: "70vh", width: 280, margin: "20px auto"};

    const avatarStyle = {backgroundColor: "blue", height: "70px", width: "70px"};

    const handleClickShowPassword = () => {
        setValue({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <h2 style={{fontFamily: "sans-serif"}}>Login</h2>
                        </div>
                    </Grid>
                    <Grid marginBottom={1}>
                        <h3 style={{fontFamily: "sans-serif"}}>Username:</h3>
                        <TextField name="email" variant="outlined" fullWidth={true} value={userDetails.email}
                            onChange={handleChange} type="text"/>
                    </Grid>
                    <Grid marginBottom={1}>
                        <h3 style={{fontFamily: "sans-serif"}}>Password:</h3>
                        <OutlinedInput
                            name="password"
                            type={value.showPassword ? "text" : "password"}
                            value={userDetails.password}
                            onChange={handleChange}
                            fullWidth={true}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
                        <Button onClick={handleSubmit} variant="outlined" size="large">Login</Button>
                    </div>
                    {loginSuccessful && <div style={{
                        fontFamily: "sans-serif",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        color: "green"
                    }}> Logged in successfully </div>}
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;
