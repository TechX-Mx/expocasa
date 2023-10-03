import React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import {
    Box,
    Toolbar,
    Typography,
    Button,
    Link,
} from '@mui/material';

export const Header = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link sx={{ textDecoration: 'none', color: 'white' }} href="/">
                            EXPOCASA
                        </Link>
                    </Typography>
                    <Button sx={{ bgcolor: "#E8A326", color: 'white', '&:hover': { bgcolor: "red", color: 'white', } }} onClick={() => handleRegister()}>
                        Registra tu número
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
