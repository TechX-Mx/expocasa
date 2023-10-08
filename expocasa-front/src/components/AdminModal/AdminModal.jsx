import React from 'react';
import { Modal, Box, } from "@mui/material";
import RegisterForm from '../RegisterForm/RegisterForm';
import { WinnerSelect } from '../WinnerSelect/WinnerSelect';

export const AdminModal = ({ open, onClose, action, getUsers, users }) => {    

    return (
        <Modal open={open} onClose={onClose} sx={{ overflowX: 'auto',}}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'gray',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxWidth: "1000px",
                    
                }}
            >
                {
                    action === 'winner'
                        ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <WinnerSelect users={users} />
                        </Box>
                        :
                        <Box>
                            <RegisterForm admin={true} getUsers={getUsers} />
                        </Box>
                }
            </Box>
        </Modal>
    )
}
