import React, { useEffect, useState } from 'react'
import { AdminTable } from '../../components/AdminTable/AdminTable'
import axios from 'axios';

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
    <AdminTable users={users}/>
  )
}
