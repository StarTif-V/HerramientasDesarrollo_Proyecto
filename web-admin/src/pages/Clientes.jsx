import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api';
import './Clientes.css';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', direccion: '' });
    const [showModal, setShowModal] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const cargarClientes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getClientes();
            setClientes(data);
            setError('');
        } catch (error) {
            setError('Error al cargar los clientes. Intenta de nuevo más tarde.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarClientes();
    }, [cargarClientes]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (editingCliente) {
                await updateCliente(editingCliente._id, formData);
            } else {
                await createCliente(formData);
            }
            cargarClientes();
            setShowModal(false);
            setFormData({ nombre: '', correo: '', telefono: '', direccion: '' });
            setEditingCliente(null);
        } catch (error) {
            setError('Error al guardar el cliente. Verifica los datos e intenta de nuevo.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        setFormData(cliente);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            setLoading(true);
            try {
                await deleteCliente(id);
                cargarClientes();
            } catch (error) {
                setError('Error al eliminar el cliente. Intenta de nuevo más tarde.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="clientes-container">
            <h1>Clientes</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Agregar Cliente
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
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
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : (editingCliente ? 'Actualizar' : 'Guardar')}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Clientes;
