import React from 'react';
import './Footer.css';
import logo from "../Assets/Logo.png"
import { Container, Typography, IconButton, Link } from '@mui/material';
import {Instagram}  from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Container className="footer">
      <div className="mainfooter">
        <div className="left">
          <div className="Heading">
          <img src={logo} alt="Logo" style={{ height: '120px', marginRight: '10px' }} />
          </div>
          <div className="othertext">
            <span>&copy;2024</span>

            <span>Kalvium</span>

            <span>LPU</span>

          </div>
        </div>
        <div className="right">
          <div className="Social">
            <IconButton href="https://www.linkedin.com/in/nivaash-b3ba231b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://github.com/QuietBooth" target='_blank' color="rgb(0,0,0)">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://www.instagram.com/i_am_nivaash?igsh=MWQ1dW91cWxsZm41MQ==" target='_blank' color="secondary">
              <Instagram />
            </IconButton>
          </div>
          <div className="othertext">
            <span>About</span>

            <span>FQA</span>

            <span>Contact</span>

            <span>Blog</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
