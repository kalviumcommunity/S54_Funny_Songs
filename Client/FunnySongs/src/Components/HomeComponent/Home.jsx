import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./Home.css";
import NavBar from '../NavbarComponent/NavBar';
import Landinglogo from "../Assets/LandingLogo.png";
import Footer from "../FooterComponent/Footer.jsx";

const HomeComponent = () => {
    return (
        <div>
            <NavBar />
            <div className='Landing-Container'>
                <div className='landing-image' >
                    <img src={Landinglogo} alt="" className="landing-logo" />
                </div>
                <div className='Landing-Content'>
                    <h2>
                        Welcome to the ultimate destination for laughter and joy! Dive into a world of hilarious audio content that will tickle your funny bone and uplift your spirits. Whether you're in need of a good laugh or simply want to brighten your day, our collection of funny audios and songs has you covered. Get ready to press play and embark on a journey filled with laughter, giggles, and endless entertainment. Let the fun begin!
                    </h2>
                    <div>
                        <Link to="/SignUp">
                            <Button variant="contained" color="success" size='large' >
                                Let's Laugh
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeComponent;
