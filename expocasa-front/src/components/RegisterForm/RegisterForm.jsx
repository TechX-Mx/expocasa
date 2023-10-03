import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    SvgIcon,
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
    Button,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import './RegisterForm.css';


const RegisterForm = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [number, setNumber] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [ipAddress, setIPAddress] = React.useState('');

    const svHost = import.meta.env.VITE_HOST;

    const isMobile = useMediaQuery("(max-width:600px)");

    React.useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch(error => console.log(error))
    }, [])

    const validateEmail = (value) => {
        const emailRegex = /.+@.+\..+/;
        setEmail(value);
        setEmailError(!emailRegex.test(value));
    };

    const validateAge = (value) => {
        setAge(value);
    };

    const validateNumber = (value) => {
        value = value.replace(/[^0-9]/g, '');
        setNumber(value);
    };

    const validatePhone = (value) => {
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 3) {
            value = `${value.slice(0, 3)}-${value.slice(3)}`;
        }
        if (value.length > 7) {
            value = `${value.slice(0, 7)}-${value.slice(7)}`;
        }        
        if (value.length > 12) {
            return;
        }

        setPhone(value);
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    function isAgeGreaterThanToday(age) {
        const date = new Date();
        const formattedDate = formatDate(date);

        if (age > formattedDate) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !age || !email || !number || !phone) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        if (isAgeGreaterThanToday(age)) {
            toast.error('Fecha de Nacimiento Invalida')
            return;
        }

        if (!emailError) {
            const formData = new FormData(event.currentTarget);
            const data = {
                ip: ipAddress,
                name: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                number: formData.get("number"),
            };
            try {
                await axios.post(`${svHost}/users`, data);
                toast.success("Todo listo, ahora participas del sorteo");
                window.location.href = '/'
            } catch (error) {
                const status = error.response ? error.response.status : null;
                if (status === 401) {
                    toast.error("Mail ya ingresado...");
                }
                if (status === 402) {
                    toast.error("Ya ingresaste un número...");
                } else {
                    toast.error("Ha habido un error, por favor intente mas tarde...");
                }
            }
        }
    };

    const currentDate = new Date().toISOString().split("T")[0];

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
        >
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: "20px",
                    }}
                >
                    Registrar un número
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        placeholder="Nombre"
                        name="firstName"
                        autoComplete="given-name"
                        autoFocus
                        sx={{ bgcolor: "#8c8888", }}
                    />
                    <TextField
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        placeholder="Apellido"
                        name="lastName"
                        autoComplete="family-name"
                        sx={{ bgcolor: "#8c8888" }}
                    />                    
                    <TextField
                        onChange={(e) => validateEmail(e.target.value)}
                        value={email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        error={emailError}
                        helperText={
                            emailError ? "Dirección de correo electrónico inválida" : ""
                        }
                        sx={{ bgcolor: "#8c8888" }}
                    />
                    <TextField
                        onChange={(e) => validatePhone(e.target.value)}
                        value={phone}
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        placeholder="Número de teléfono"
                        name="phone"
                        sx={{ bgcolor: "#8c8888" }}
                    />
                    <TextField
                        onChange={(e) => validateNumber(e.target.value)}
                        value={number}
                        margin="normal"
                        required
                        fullWidth
                        id="number"
                        placeholder="Número de pelotas"
                        name="number"
                        sx={{ bgcolor: "#8c8888" }}
                    />
                    <Box
                        sx={{
                            pt: 2,
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "white",
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
        </Container>
    )
}

export default RegisterForm