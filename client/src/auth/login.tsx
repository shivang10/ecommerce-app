import React, {useState} from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

import {UserLoginDetailsInterface} from "./authInterface";
import {isUserLogged, loginRequest} from "./authServices";

const theme = createTheme();

const Login: React.FC = () => {

    const [userDetails, updateUserDetails] = useState<UserLoginDetailsInterface>({
        email: "",
        password: "",
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
                            Sign in
                        </Typography>
                        <Box sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange} type="text"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={userDetails.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
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
                        {loginSuccessful && <div style={{
                            fontFamily: "sans-serif",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            color: "green"
                        }}> Logged in successfully </div>}
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Login;
