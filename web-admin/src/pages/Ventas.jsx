import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { createVentaRecarga, getVentasRecargas, deleteVentaRecarga, updateVentaRecarga } from '../api';
import './Ventas.css';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [formData, setFormData] = useState({ tipo: 'venta', cliente: '', producto: '', cantidad: '', precio: '' });
    const [showModal, setShowModal] = useState(false);
    const [editingVenta, setEditingVenta] = useState(null);

    // Cargar ventas y recargas al montar
    useEffect(() => {
        cargarVentasRecargas();
    }, []);

    // Obtener ventas y recargas desde la API
    const cargarVentasRecargas = async () => {
        try {
            const data = await getVentasRecargas(); // Usando la función de api.js
            setVentas(data);
        } catch (error) {
            console.error('Error al cargar las ventas y recargas:', error);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario para crear o editar venta/recarga
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData); // Asegúrate de que estos datos sean correctos
    
        try {
            if (editingVenta) {
                await updateVentaRecarga(editingVenta._id, formData); // Actualizar venta/recarga
            } else {
                await createVentaRecarga(formData); // Crear venta/recarga
            }
            cargarVentasRecargas();
            setShowModal(false);
            setFormData({ tipo: 'venta', cliente: '', producto: '', cantidad: '', precio: '' });
            setEditingVenta(null);
        } catch (error) {
            console.error('Error al guardar la venta:', error);
        }
    };

    // Manejar la edición de una venta/recarga
    const handleEdit = (venta) => {
        setEditingVenta(venta);
        setFormData(venta);  // Llenamos el formulario con los datos de la venta/recarga seleccionada
        setShowModal(true);
    };

    // Manejar la eliminación de una venta/recarga
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta venta/recarga?')) {
            try {
                await deleteVentaRecarga(id); // Usando la función de api.js para eliminar
                cargarVentasRecargas(); // Refrescar la lista de ventas/recargas
            } catch (error) {
                console.error('Error al eliminar la venta/recarga:', error);
            }
        }
    };

    // Filtrar ventas y recargas
    const ventasFiltradas = ventas.filter(venta => venta.tipo === 'venta');
    const recargasFiltradas = ventas.filter(venta => venta.tipo === 'recarga');

    return (
        <div className="ventas-container">
            <h1>Ventas y Recargas</h1>
            <br />
            <Button variant="primary" onClick={() => setShowModal(true)}> 
                Agregar Venta/Recarga
            </Button>
            <br />

            {/* Sección de Ventas */}
            <h2 className="mt-5">Ventas</h2>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasFiltradas.map((venta) => (
                        <tr key={venta._id}>
                            <td>{venta.cliente}</td>
                            <td>{venta.producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.precio}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(venta)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(venta._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Sección de Recargas */}
            <h2 className="mt-5">Recargas</h2>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recargasFiltradas.map((recarga) => (
                        <tr key={recarga._id}>
                            <td>{recarga.cliente}</td>
                            <td>{recarga.producto}</td>
                            <td>{recarga.cantidad}</td>
                            <td>{recarga.precio}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(recarga)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(recarga._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar/editar venta/recarga */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingVenta ? 'Editar Venta/Recarga' : 'Agregar Venta/Recarga'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                            >
                                <option value="venta">Venta</option>
                                <option value="recarga">Recarga</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="cliente"
                                value={formData.cliente}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="producto"
                                value={formData.producto}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                name="cantidad"
                                value={formData.cantidad}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editingVenta ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Ventas;
