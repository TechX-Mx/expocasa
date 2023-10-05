import React from 'react';
import { Box, Button, SvgIcon, TextField } from '@mui/material';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);    

    const { login } = useAuth();

    const validateEmail = (value) => {
        const emailRegex = /.+@.+\..+/;
        setEmail(value);
        setEmailError(!emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(value.length === 0);
    };

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            if (!emailError && !passwordError) {
                const formData = new FormData(event.currentTarget);
                const data = {
                    email: formData.get("email"),
                    password: formData.get("password"),
                };
                login(data);
            }
        } catch (error) {
            return toast.error("Ha ocurrido un error. Intente de nuevo mas tarde")
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '78.2vh' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    onChange={(e) => validateEmail(e.target.value)}
                    sx={{ borderRadius: "5px", bgcolor: "rgba(131, 131, 131, 0.22)" }}
                    value={email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={emailError}
                    helperText={emailError ? "Invalid email address" : ""}
                />
                <TextField
                    onChange={(e) => validatePassword(e.target.value)}
                    sx={{ borderRadius: "5px", bgcolor: "rgba(131, 131, 131, 0.22)" }}
                    value={password}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError ? "Password is required" : ""}
                />
                <Box
                    sx={{
                        display: "flex",                        
                        justifyContent: 'flex-end',
                        mt: 2,
                        mb: 3
                    }}
                >                    
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "6rem",
                            height: "2.5rem",
                            borderRadius: "20px",
                            "&:hover": { bgcolor: "red" },
                        }}
                    >
                        <SvgIcon component={ArrowForwardIosIcon}></SvgIcon>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
