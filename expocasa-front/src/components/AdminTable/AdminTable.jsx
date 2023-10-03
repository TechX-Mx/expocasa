import * as React from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    Avatar,
    CircularProgress,
    Divider,
    SvgIcon,
    useMediaQuery,
    Table,    
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { toast } from "react-toastify";

export const AdminTable = ({ users }) => {
    const columns = [
        {
            field: "fullName",
            headerName: "Nombre Completo",
            description: "Ésta columna no es ordenable.",
            sortable: false,
            width: 200,
            valueGetter: (params) =>
                `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },        
        {
            field: "age",
            headerName: "Fecha de nacimiento",
            width: 200,
        },
        {
            field: "email",
            headerName: "Correo electrónico",
            width: 200,
        },
        {
            field: "number",
            headerName: "Número",
            width: 200,
        },
        {
            field: "phone",
            headerName: "Telefono",
            width: 200,
        },
    ];

    const rows = users.map((user, i) => ({
        id: user.id,
        num: i + 1,
        lastName: user.lastName,
        firstName: user.name,
        age: user.age,
        email: user.email,
        number: user.number,
        phone: user.phone,
    }));

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
}
