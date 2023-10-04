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
    CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import './RegisterForm.css';


const RegisterForm = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [number, setNumber] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [ipAddress, setIPAddress] = React.useState('');
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const [permission, setPermission] = React.useState('');
    const [distanceCalculated, setDistanceCalculated] = React.useState(false);
    const [far, setFar] = React.useState(false);

    const svHost = import.meta.env.VITE_HOST;

    React.useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch(error => console.log(error));
        getUserLocation();
    }, [])

    React.useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const distance = calculateDistance(expoForum.latitude, expoForum.longitude, latitude, longitude);
            setDistanceCalculated(true);
            if (distance > 2000) { //CAMBIAR
                setFar(true);
            }
        }
    }, [latitude, longitude]);

    React.useEffect(() => {
        if (distanceCalculated && far) {
            console.log('lejos');
        }
    }, [distanceCalculated, far]);

    const validateEmail = (value) => {
        const emailRegex = /.+@.+\..+/;
        setEmail(value);
        setEmailError(!emailRegex.test(value));
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
    };

    const expoForum = {
        latitude: "29.047160560311564",
        longitude: "-110.96058749838984",
    }

    const p = {
        latitude: "29.04693376875957",
        longitude: "-110.94319573066294",
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setDistanceCalculated(false);
                    setPermission('done');
                },
                (error) => {
                    if (error.code === 1) {
                        setPermission('error')
                    }
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !number || !phone) {
            toast.error('Por favor, completa todos los campos.');
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

    if (permission === "waiting") {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Typography>
                        Dale el permiso al navegador para ver tu ubicación...
                    </Typography>
                    <CircularProgress />
                </Box>
            </Box>
        )
    } else if (permission === "error") {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', }}>
                <Box sx={{ maxWidth: "220px" }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Has denegado el permiso al navegador para saber tu ubicación. Para poder participar, debes manualmente dar los permisos correspondientes.
                    </Typography>
                </Box>
            </Box>
        )
    }

    if (!distanceCalculated) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <CircularProgress />
                </Box>
            </Box>
        )
    }

    if (distanceCalculated && far) {
        console.log('lejos')
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Tienes que estar en el lugar del evento para participar
                    </Typography>
                </Box>
            </Box>
        )
    }


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