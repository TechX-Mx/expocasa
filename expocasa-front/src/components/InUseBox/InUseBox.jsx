import { Box, Typography } from '@mui/material';
import React from 'react';
import './styles.css'

export const InUseBox = () => {
    return (
        <Box id="msgcontainer" >
            <Typography sx={{ fontSize: "2em", color: "white" }}>
                Gracias Por Participar!
            </Typography>
            <Typography sx={{ fontSize: "2em", color: "white", textAlign: "center" }}>
                Tu pronóstico ha sido registrado exitosamente,
            </Typography>
            <Typography sx={{ fontSize: "2em", color: "white",  }}>
                ¡Buena Suerte!
            </Typography>
        </Box>
    )
}
