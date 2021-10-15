import React, {useState} from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";

import MessageBar from "../components/MessageBar/MessageBar";
import {UserLoginDetailsInterface} from "./authInterface";
import {loginServerLink} from "./authLink";
import {axiosPostMethod, isUserLogged} from "./authServices";

const theme = createTheme();

const Login: React.FC = () => {

    const {register, handleSubmit} = useForm<UserLoginDetailsInterface>();

    const [loginSuccessful, updateLoginSuccessful] = useState({
        message: "",
        response: "",
    });

    const onSubmit: SubmitHandler<UserLoginDetailsInterface> = async (data) => {
        updateLoginSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        axios({
            "url": loginServerLink,
            "method": axiosPostMethod,
            "data": data
        })
            .then((res) => {
                updateLoginSuccessful({
                    message: "Logged in successfully",
                    response: "success"
                });
                setTimeout(() => {
                    updateLoginSuccessful({
                        message: "",
                        response: ""
                    });
                    localStorage.setItem("userToken", res.data.data);
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response);
                updateLoginSuccessful({
                    message: "Some error came up. Please try again.",
                    response: "error"
                });
                setTimeout(() => {
                    updateLoginSuccessful({
                        message: "",
                        response: ""
                    });
                }, 3000);
            });
    };

    if (isUserLogged) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box sx={{mt: 1}}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("email", {required: true, maxLength: 20})} />
                                <input {...register("password", {required: true})} />
                                <input type="submit"/>
                            </form>
                        </Box>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" className="btn-link__form">
                                    Home
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link to="/register" className="btn-link__form">
                                    New user? Register
                                </Link>
                            </Grid>
                        </Grid>
                        <MessageBar
                            responseType={loginSuccessful.response}
                            messageType={loginSuccessful.message}
                        />
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Login;
