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
            field: "email",
            headerName: "Correo electrónico",
            width: 200,
        },
        {
            field: "number",
            headerName: "Número",
            width: 170,
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
        email: user.email,
        number: user.number,
        phone: user.phone,
    }));

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[ 5, 10, ]}
                checkboxSelection
                disableSelectionOnClick
                sx={{ maxHeight: "1200px" }}
            />
        </Box>
    )
}