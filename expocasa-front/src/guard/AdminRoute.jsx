import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    return (
        user?.admin ? children : <Navigate to='/' replace />
    )
}
