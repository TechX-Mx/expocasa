import { Box, alertTitleClasses } from '@mui/material';
import React from 'react';
import logoblanco from '../../assets/logos/CANADEVI_logo_blanco.png'
import './Footer.css';

export const Footer = () => {
    return (
        <Box id="footer">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>

            <img id="footer-image" src={logoblanco} alt='logo-empresa'></img>
        </Box>
        </Box>
    )
}
