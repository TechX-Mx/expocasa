import * as React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import logo from '../../assets/logos/EXPOCASA_logo_blanco.png';
import './styles.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InUseBox } from '../../components/InUseBox/InUseBox';

export const Register = () => {
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [permission, setPermission] = React.useState('');
  const [distanceCalculated, setDistanceCalculated] = React.useState(false);
  const [far, setFar] = React.useState(false);
  const [ipAddress, setIPAddress] = React.useState('');
  const [inUse, setInUse] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState();

  const svHost = import.meta.env.VITE_HOST;

  React.useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIPAddress(data.ip);
        checkIp(data.ip);
      })
      .catch(error => console.log(error));
  }, [])

  React.useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const distance = calculateDistance(expoForum.latitude, expoForum.longitude, latitude, longitude); //CAMBIAR
      setDistanceCalculated(true);
      if (distance > 2000) { //CAMBIAR
        setFar(true);
      }
    }
  }, [latitude, longitude]);

  React.useEffect(() => {
    getUserLocation();
  }, []);

  const expoForum = {
    latitude: "29.047160560311564",
    longitude: "-110.96058749838984",
  }

  const p = {
    latitude: "29.04693376875957",
    longitude: "-110.94319573066294",
  }

  const checkIp = async (ip) => {
    try {
      const res = await axios.post(`${svHost}/check`, { ip });
      const status = res ? res.status : null;
      if (status === 202) {
        setInUse(true);
      } else {
        setInUse(false);
      }
      setLoading(false)
    } catch (error) {
      toast.error("Ha habido un Error. Intente de nuevo mas tarde.");
    }
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
          setPermission('error')
          if (error.code === 1) {
            setStatus(1)
          } else if (error.code === 2) {
            setStatus(2)
          } else if (error.code === 3) {
            setStatus(3)
          } else if (error.code === 0) {
            setStatus(0)
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  if (permission === "waiting") {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ color: "white" }}>
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
          <Typography sx={{ textAlign: 'center', color: "white" }}>
            {
              status === 1
                ?
                "Has denegado el permiso al navegador para saber tu ubicación. Para poder participar, debes manualmente dar los permisos correspondientes."
                : status === 2
                  ?
                  "La ubicación del dispositivo está desactivada."
                  : status === 3 
                  ?
                  "Ha expirado el tiempo de espera, inténtelo de nuevo."
                  :
                  "Ha ocurrido un error"
          }

          </Typography>
        </Box>
      </Box>
    )
  }

  if (!distanceCalculated || loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (distanceCalculated && far) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ textAlign: 'center', color: "white", }}>
            Tienes que estar en el lugar del evento para participar
          </Typography>
        </Box>
      </Box>
    )
  }

  if (inUse) {
    return (
      <Box sx={{ minHeight: '90dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', my: 4, position: 'relative', }}>
        <img id='logo-expocasa' src={logo} alt='logo-expocasa'></img>
        <InUseBox />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '90dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', my: 4, position: 'relative', }}>
      <img id='logo-expocasa' src={logo} alt='logo-expocasa'></img>
      <RegisterForm ipAddress={ipAddress} />
    </Box>
  )
}
