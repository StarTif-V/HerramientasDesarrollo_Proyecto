import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../api'; // Asegúrate de tener estas funciones en api.js
import './Proveedores.css';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', direccion: '', empresa: '' });
    const [showModal, setShowModal] = useState(false);
    const [editingProveedor, setEditingProveedor] = useState(null);

    // Cargar proveedores al montar
    useEffect(() => {
        cargarProveedores();
    }, []);

    // Obtener los proveedores desde la API
    const cargarProveedores = async () => {
        try {
            const data = await getProveedores(); // Usando la función de api.js
            setProveedores(data);
        } catch (error) {
            console.error('Error al cargar los proveedores:', error);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario para crear o editar proveedor
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData); // Asegúrate de que estos datos sean correctos
    
        try {
            if (editingProveedor) {
                await updateProveedor(editingProveedor._id, formData); // Actualizar proveedor
            } else {
                await createProveedor(formData); // Crear proveedor
            }
            cargarProveedores();
            setShowModal(false);
            setFormData({ nombre: '', correo: '', telefono: '', direccion: '', empresa: '' });
            setEditingProveedor(null);
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
        }
    };

    // Manejar la edición de un proveedor
    const handleEdit = (proveedor) => {
        setEditingProveedor(proveedor);
        setFormData(proveedor);
        setShowModal(true);
    };

    // Manejar la eliminación de un proveedor
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            try {
                await deleteProveedor(id); // Usando la función de api.js
                cargarProveedores(); // Refrescar la lista de proveedores
            } catch (error) {
                console.error('Error al eliminar el proveedor:', error);
            }
        }
    };

    return (
        <div className="proveedores-container">
            <h1>Proveedores</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Agregar Proveedor
            </Button>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Empresa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor._id}>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.correo}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.empresa}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(proveedor)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(proveedor._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar/editar proveedor */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProveedor ? 'Editar Proveedor' : 'Agregar Proveedor'}</Modal.Title>
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
                            <Form.Label>Email</Form.Label>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editingProveedor ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Proveedores;
//mejora añadidagit 