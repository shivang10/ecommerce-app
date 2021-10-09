import React, {useState} from "react";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {Avatar, Button, Grid, IconButton, InputAdornment, OutlinedInput, Paper, TextField} from "@mui/material";
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

    const [value, setValue] = useState({
        showPassword:false
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

    const paperStyle ={padding:20, height:"70vh", width:280, margin:"20px auto"};

    const avatarStyle ={backgroundColor:"blue", height:"70px", width:"70px"};

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
                        <div style={{display: "flex",  justifyContent:"center", alignItems:"center"}}>
                            <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                        </div>
                        <div style={{display: "flex",  justifyContent:"center", alignItems:"center"}}>
                            <h2 style={{fontFamily:"sans-serif"}}>Sign Up</h2>
                        </div>
                    </Grid>
                    <Grid marginBottom={1}>
                        <h3 style={{fontFamily:"sans-serif"}}>Username:</h3>
                        <TextField name="username" variant="outlined" fullWidth={true} value={userDetails.username} onChange={handleChange} type="text" />

                        <h3 style={{fontFamily:"sans-serif"}}>Email:</h3>
                        <TextField name="email" variant="outlined" fullWidth={true} value={userDetails.email} onChange={handleChange} type="text" />

                        <h3 style={{fontFamily:"sans-serif"}}>Phone Number:</h3>
                        <TextField name="phoneNumber" variant="outlined" fullWidth={true} value={userDetails.phoneNumber} onChange={handleChange} type="number" />
                    </Grid>
                    <Grid marginBottom={1}>
                        <h3 style={{fontFamily:"sans-serif"}}>Password:</h3>
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
                                        {value.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <div style={{display: "flex",  justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
                        <Button onClick={handleSubmit} variant="outlined" size="large">Sign Up</Button>
                    </div>
                </Paper>
            </Grid>
        </div>
    );
};

export default Signup;
