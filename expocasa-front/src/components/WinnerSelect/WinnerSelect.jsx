import { Box, Button, TextField, Typography, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { WinnerCheck } from '../WinnerCheck/WinnerCheck';

export const WinnerSelect = ({ users }) => {
    const [number, setNumber] = useState('');
    const [found, setFound] = useState('waiting');
    const [winner, setWinner] = useState();
    const [loading, setLoading] = useState(false);

    const validateNumber = (value) => {
        value = value.replace(/[^0-9]/g, '');
        setNumber(value);
    };

    const handleSend = () => {
        if (!number) {
            return toast.error('Debes ingresar un número');
        }

        const inputNumber = parseInt(number, 10);

        if (isNaN(inputNumber)) {
            return toast.error('Número inválido');
        }

        setLoading(true);

        let closestUser = null;
        let closestDifference = Infinity;

        for (const user of users) {
            if (user.admin) {
                continue;
            }

            const userNumber = user.number;

            if (userNumber <= inputNumber && inputNumber - userNumber < closestDifference) {
                closestDifference = inputNumber - userNumber;
                closestUser = user;
            }
        }

        setTimeout(() => {
            setLoading(false);
            if (closestUser) {
                setFound('found');
                setWinner(closestUser);
            } else {
                setFound('notFound');
            }
        }, 3000);
    };

    return (
        <Box>
            <Typography sx={{ mb: 1, fontSize: "2em", }}>
                Buscar un Ganador
            </Typography>
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
            {loading && <LinearProgress sx={{ mb: 2 }} />}
            {loading ? (
                <Typography sx={{ mb: 2,}}>
                    Cargando...
                </Typography>
            ) : (
                found === 'found' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, gap: 1, }}>
                        <Typography sx={{ fontSize: "1.5em"}}>
                            Ganador encontrado:
                        </Typography>
                        <Typography sx={{ fontSize: "1em"}}>
                            {`${winner.name} ${winner.lastName}`}
                        </Typography>
                        <Typography sx={{ fontSize: "1em"}}>
                            {`Número telefónico: ${winner.phone}`}
                        </Typography>
                        <Typography sx={{ fontSize: "1em"}}>
                            {`Número de pelotas ingresado: ${winner.number}`}
                        </Typography>
                    </Box>
                ) : (
                    found === 'notFound' ? (
                        <Box sx={{ mb: 2, }}>
                            <Typography>
                                No encontrado
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ mb: 2, }}>
                            <Typography>
                                Esperando
                            </Typography>
                        </Box>
                    )
                )
            )}
            <Button onClick={handleSend} variant="contained" color="primary">
                Enviar
            </Button>            
        </Box>
    );
};
