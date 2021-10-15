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
import {Link, Redirect, useHistory} from "react-router-dom";

import MessageBar from "../components/MessageBar/MessageBar";
import {UserSignupDetailsInterface} from "./authInterface";
import {signupServerLink} from "./authLink";
import {axiosPostMethod, isUserLogged} from "./authServices";


const theme = createTheme();

const Signup: React.FC = () => {

    const history = useHistory();

    const {register, handleSubmit} = useForm<UserSignupDetailsInterface>();

    const [registerSuccessful, updateRegisterSuccessful] = useState({
        message: "",
        response: "",
    });

    const onSubmit: SubmitHandler<UserSignupDetailsInterface> = async (data) => {
        updateRegisterSuccessful({
            message: "Submitting your details",
            response: "loading"
        });

        axios({
            "url": signupServerLink,
            "method": axiosPostMethod,
            "data": data
        })
            .then((res) => {
                updateRegisterSuccessful({
                    message: "Your account has been successfully created",
                    response: "success"
                });
                setTimeout(() => {
                    updateRegisterSuccessful({
                        message: "",
                        response: ""
                    });
                    history.push("/login");
                }, 3000);
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                updateRegisterSuccessful({
                    message: "Some error came up. Please try again.",
                    response: "error"
                });
                setTimeout(() => {
                    updateRegisterSuccessful({
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
                            Sign up
                        </Typography>
                        <Box sx={{mt: 3}}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("username", {required: true, maxLength: 30})} />
                                <input {...register("email", {required: true, maxLength: 30})} />
                                <input type="password" {...register("password", {required: true})} />
                                <input type="number" {...register("phoneNumber", {
                                    required: true,
                                    min: 1000000000,
                                    max: 9999999999
                                })} />
                                <input type="submit"/>
                            </form>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" className="btn-link__form">
                                        Already a user? Login
                                    </Link>
                                </Grid>
                            </Grid>
                            <MessageBar
                                responseType={registerSuccessful.response}
                                messageType={registerSuccessful.message}
                            />
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Signup;
