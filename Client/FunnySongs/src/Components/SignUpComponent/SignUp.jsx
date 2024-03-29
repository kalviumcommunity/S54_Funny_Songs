// SignUp.jsx

import React, { useState, useContext,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from "../NavbarComponent/NavBar.jsx"
import { AppContext } from '../Context/Context.jsx'; 

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        EmailAddress: '',
        Password: '',
        receiveNotifications: false
    });
    
    const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);

    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('https://songs-sand.vercel.app/signup', formData);
            
            const token = response.data.token;

            Cookies.set('firstName', formData.FirstName, { expires: 7 });
            Cookies.set('token', token, { expires: 7 });

            // toast.success('Signup successful!');
            setTimeout(() => {
                setIsLoggedIn(true);
                navigate('/Main');
            }, 2000);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    

    if (isLoggedIn) {
        navigate('/Main');
    }

    return (
        <div>
            <NavBar/>
            <ToastContainer />
            <ThemeProvider theme={createTheme()}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="FirstName"
                                        required
                                        fullWidth
                                        id="FirstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.FirstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="LastName"
                                        label="Last Name"
                                        name="LastName"
                                        autoComplete="family-name"
                                        value={formData.LastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="EmailAddress"
                                        label="EmailAddress"
                                        name="EmailAddress"
                                        autoComplete="EmailAddress"
                                        value={formData.EmailAddress}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="Password"
                                        label="Password"
                                        type="Password"
                                        id="Password"
                                        autoComplete="new-Password"
                                        value={formData.Password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item mt={3} xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox name="receiveNotifications" color="primary" />}
                                        label="I want to receive notifications about new Funny Songs."
                                        checked={formData.receiveNotifications}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 11.4 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid> */}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default SignUp;
