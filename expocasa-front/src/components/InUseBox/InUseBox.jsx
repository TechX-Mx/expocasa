import { Box, Typography } from '@mui/material';
import React from 'react';
import './styles.css'

export const InUseBox = () => {
    return (
        <Box id="msgcontainer" >
            <Typography className='cardtext'>
                Gracias Por Participar!
            </Typography>
            <Typography className='cardtext'>
                Tu pronóstico ha sido registrado exitosamente,
            </Typography>
            <Typography className='cardtext'>
                ¡Buena Suerte!
            </Typography>
        </Box>
    )
}
