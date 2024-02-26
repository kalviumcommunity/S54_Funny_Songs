// NavBar.jsx

import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../Assets/NavLogo.png";
import Cookies from 'js-cookie'; // Import js-cookie library
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: 'px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(8),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in based on cookie
    useEffect(() => {
        const firstName = Cookies.get('firstName'); // Change to match the cookie name storing the first name
        if (firstName) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        
        // Update isLoggedIn state to false
        setIsLoggedIn(false);
    
        // Navigate to main page
        navigate('/'); // assuming '/' is the path for the main page
    };
    

    const handleLogin = () => {
        // Navigate to signup page
        navigate('/signup'); // replace '/signup' with the actual path for the signup page
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar style={{ padding:"10px", backgroundColor:"rgb(0,0,0,0.9)", boxShadow: "0 0px 100px black", marginBottom: "0",fontFamily:"Kumbh Sans" }}>

                <img src={logo} width={"350px"} alt="Logo"/>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon style={{ color: 'white', fontSize: 30 }} /> 
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <div>
                        {isLoggedIn ? (
                            <Button variant='contained' color="error" sx={{marginRight: '40px'}} onClick={handleLogout}>Logout</Button>
                        ) : (
                            <Button variant="contained" color="success" sx={{marginRight: '40px'}} onClick={handleLogin}>Login</Button>
                        )}
                    </div>
                </Box>
            </Toolbar>
        </Box>
    );
}
