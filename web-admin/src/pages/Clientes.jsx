import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api'; // Importando las funciones de api.js
import './Clientes.css';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', direccion: '' });
    const [showModal, setShowModal] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);

    // Cargar clientes al montar
    useEffect(() => {
        cargarClientes();
    }, []);

    // Obtener los clientes desde la API
    const cargarClientes = async () => {
        try {
            const data = await getClientes(); // Usando la función de api.js
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario para crear o editar cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData); // Asegúrate de que estos datos sean correctos

        try {
            if (editingCliente) {
                await updateCliente(editingCliente._id, formData); // Actualizar cliente
            } else {
                await createCliente(formData); // Crear cliente
            }
            cargarClientes();
            setShowModal(false);
            setFormData({ nombre: '', correo: '', telefono: '', direccion: '' });
            setEditingCliente(null);
        } catch (error) {
            console.error('Error al guardar el cliente:', error);
        }
    };

    // Manejar la edición de un cliente
    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        setFormData(cliente);
        setShowModal(true);
    };

    // Manejar la eliminación de un cliente
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            try {
                await deleteCliente(id); // Usando la función de api.js
                cargarClientes(); // Refrescar la lista de clientes
            } catch (error) {
                console.error('Error al eliminar el cliente:', error);
            }
        }
    };

    return (
        <div className="clientes-container">
            <h1>Clientes</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Agregar Cliente
            </Button>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente._id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.direccion}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(cliente)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(cliente._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar/editar cliente */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingCliente ? 'Editar Cliente' : 'Agregar Cliente'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editingCliente ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Clientes;
