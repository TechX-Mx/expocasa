import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const WinnerSelect = ({ users }) => {
    const [number, setNumber] = useState('');
    const [found, setFound] = useState();
    const [winner, setWinner] = useState();

    useEffect(() => {
        setFound('waiting');
    }, [])

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
            return toast.error('Número invalido');
        }

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

        if (closestUser) {
            setFound('found');
            setWinner(closestUser);
        } else {
            setFound('notFound');
        }
    }

    return (
        <Box>
            <Typography sx={{ mb: 1 }}>
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
            {
                found === 'found'
                    ?
                    <Box>
                        <Typography>
                            Encontrado {`${winner.name} ${winner.lastName}`}
                        </Typography>
                    </Box>
                    :
                    found === 'notFound'
                        ?
                        <Box>
                            <Typography>
                                No encontrado
                            </Typography>
                        </Box>
                        :
                        <Box>
                            <Typography>
                                Esperando
                            </Typography>
                        </Box>
            }
            <Button onClick={handleSend} variant="contained" color="primary">
                Enviar
            </Button>
        </Box>
    )
}
