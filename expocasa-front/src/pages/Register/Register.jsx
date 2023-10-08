import * as React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export const Register = () => {
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [permission, setPermission] = React.useState('');
  const [distanceCalculated, setDistanceCalculated] = React.useState(false);
  const [far, setFar] = React.useState(false);

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
    <Box sx={{ minHeight: '90dvh', display: 'flex', alignItems: 'center',}}>
      <RegisterForm />
    </Box>
  )
}
