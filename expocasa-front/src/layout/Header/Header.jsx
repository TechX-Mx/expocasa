import React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { useAuth } from '../../context/AuthContext';
import {
    Box,
    Toolbar,
    Typography,
    Button,
    Link,
} from '@mui/material';

export const Header = () => {
    const { user, logout } = useAuth()

    const navigate = useNavigate();

    const handleAdmin = () => {
        navigate('/admin');
    }

    const handleExit = () => {
        logout();
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
                    {user?.admin
                        ?
                        <Box sx={{ display: 'flex', gap: 2}}>
                            <Button sx={{ bgcolor: "#E8A326", color: 'white', '&:hover': { bgcolor: "red", color: 'white', } }} onClick={() => handleAdmin()}>
                                PANEL ADMIN
                            </Button>
                            <Button sx={{ bgcolor: "#E8A326", color: 'white', '&:hover': { bgcolor: "red", color: 'white', } }} onClick={() => handleExit()}>
                                CERRAR SESIÓN
                            </Button>
                        </Box>
                        :
                        <Box></Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
