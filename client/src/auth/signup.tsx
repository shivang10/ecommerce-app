import React, {useState} from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Redirect, useHistory} from "react-router-dom";

import {UserSignupDetailsInterface} from "./authInterface";
import {signupRequest, isUserLogged} from "./authServices";


const theme = createTheme();

const Signup: React.FC = () => {

    const history = useHistory();

    const [userDetails, updateUserDetails] = useState<UserSignupDetailsInterface>({
        username: "",
        email: "",
        phoneNumber: undefined,
        password: "",
    });

    const [registerSuccessful, updateRegisterSuccessful] = useState(false);

    const handleSubmit = async () => {
        const res = await signupRequest(userDetails);
        console.log(userDetails);
        if (res.status === 200) {
            updateRegisterSuccessful(true);
            setTimeout(() => {
                history.push("/login");
            }, 1200);
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

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="number"
                                        id="phoneNumber"
                                        autoComplete="phoneNumber"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" className="btn-link__form">
                                       Already a user? Login
                                    </Link>
                                </Grid>
                            </Grid>
                            {registerSuccessful && <div style={{
                                fontFamily: "sans-serif",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "20px",
                                color: "green"
                            }}> Logged in successfully </div>}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Signup;
