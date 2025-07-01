// src/pages/Users.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import api from '../api'; // Importa el archivo de configuración de la API

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

    // Cargar los usuarios al inicio
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await api.post('/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({ name: '', email: '', password: '' }); // Limpiar formulario
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Box p={3}>
            <h1>Gestión de Usuarios</h1>
            <Box mb={2}>
                <TextField
                    label="Nombre"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <TextField
                    label="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <Button variant="contained" onClick={handleAddUser}>
                    Agregar Usuario
                </Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {/* Aquí puedes agregar botones para editar o eliminar usuarios */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Users;
