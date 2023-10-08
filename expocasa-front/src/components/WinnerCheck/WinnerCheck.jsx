import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './WinnerCheck.css';
import logo from '../../assets/logos/logo-canadevi.png'

export const WinnerCheck = ({ winner }) => {
    useEffect(() => {
        const row1TextElements = document.querySelectorAll('.row1-text.second');

        row1TextElements.forEach(element => {
            const numCharacters = element.innerText.length;
            const adjustedFontSize = 3 - (numCharacters * 0.1);

            element.style.fontSize = `${adjustedFontSize}em`;
        });
    }, []);

    return (
        <Box id="container" sx={{ display: winner ? '' : 'none' }}>
            <Box id="check">
                <Box id="inner">
                    <Box id="logo">
                        <img id='img' src={logo} />
                        <Box id='date'>
                            <Typography>XX de Agosto de 2023</Typography>
                        </Box>
                    </Box>
                    <Box id='row1-text' sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box id="border" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: "110px", }}>
                                <Typography className="row1-text first">PAGUESE POR ESTE CHEQUE A:</Typography>
                            </Box>
                            <Typography className="row1-text second">{winner?.name} {winner?.lastName}</Typography>
                        </Box>
                        <Box>
                            <Typography className="row1-text last">
                                $100.000
                            </Typography>
                        </Box>
                    </Box>
                    <Box id='row2-text' sx={{ display: 'flex', justifyContent: "space-between", height: "45px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box>
                                <Typography className="row2-text first">CIEN MIL</Typography>
                            </Box>
                            <Typography className="row2-text">. . . . . . . . . . . . . . . . .  </Typography>
                        </Box>
                        <Box>
                            <Typography className="row2-text last">
                                PESOS
                            </Typography>
                        </Box>
                    </Box>
                    <Box id='row3-text' sx={{ display: 'flex', justifyContent: "space-between", }}>
                        <Box>
                            <Typography className='row3-text' sx={{ fontWeight: 600, fontSize: "1.8em", }}>SORTEO EXPOCASA</Typography>
                            <Box sx={{ mt: 2,}}>
                                <Typography className='user-info' sx={{ fontWeight: 600, }}>NUMERO TELEFONICO: {winner?.phone}</Typography>
                                <Typography className='user-info' sx={{ fontWeight: 600, }}>PELOTAS ADIVINADAS: {winner?.number}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography className='row3-text' sx={{ fontWeight: 600, fontSize: "1.8em", }}>FIRMA</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
