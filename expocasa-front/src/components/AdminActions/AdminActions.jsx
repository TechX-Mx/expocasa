import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { AdminModal } from '../AdminModal/AdminModal'

export const AdminActions = ({ users, getUsers }) => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');

    const handleWinner = () => {
        setOpen(true);
        setAction('winner');
    }
    const handleAddUser = () => {
        setOpen(true);
        setAction('addUser');
    }

    return (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', mb: 3}}>
            <Button onClick={handleWinner}>
                BUSCAR UN GANADOR
            </Button>
            <Button onClick={handleAddUser}>
                AÑADIR USUARIO
            </Button>
            <AdminModal users={users} open={open} onClose={() => setOpen(false)} action={action} getUsers={getUsers}/>
        </Box>
    )
}