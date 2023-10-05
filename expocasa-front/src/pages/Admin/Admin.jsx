import React, { useEffect, useState } from 'react'
import { AdminTable } from '../../components/AdminTable/AdminTable'
import axios from 'axios';
import { AdminActions } from '../../components/AdminActions/AdminActions';
import { Box } from '@mui/material';

export const Admin = () => {
  const [users, setUsers] = useState([]);

  const svHost = import.meta.env.VITE_HOST;

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const userData = await axios.get(`${svHost}/users`)
    setUsers(userData.data)
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '78.2dvh', }}>
      <AdminActions users={users} getUsers={getUsers}/>
      <AdminTable users={users} />
    </Box>
  )
}
