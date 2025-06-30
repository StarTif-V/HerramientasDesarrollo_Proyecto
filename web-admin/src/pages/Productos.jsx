import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap'; // Usamos Bootstrap para el diseño
import './Productos.css';

// Definir los productos con sus precios y opciones de peso
const productos = [
    {
        nombre: 'Extintor ABC',
        imagen: '/images/extinguidor_abc.jpg', // Ruta de la imagen
        opcionesPeso: [
            { peso: 2, precio: 30 },
            { peso: 4, precio: 50 },
            { peso: 6, precio: 70 },
        ],
    },
    {
        nombre: 'Extintor CO2',
        imagen: '/images/extinguidor_co2.jpg', // Ruta de la imagen
        opcionesPeso: [
            { peso: 2, precio: 40 },
            { peso: 4, precio: 60 },
            { peso: 6, precio: 80 },
        ],
    },
    {
        nombre: 'Extintor de Agua',
        imagen: '/images/extinguidor_agua.jpg', // Ruta de la imagen
        opcionesPeso: [
            { peso: 2, precio: 20 },
            { peso: 4, precio: 40 },
            { peso: 6, precio: 60 },
        ],
    },
];

const Productos = () => {
    const [seleccion, setSeleccion] = useState({}); // Guardará la selección de peso y precio

    const handleChange = (producto, pesoSeleccionado) => {
        setSeleccion((prevSeleccion) => ({
            ...prevSeleccion,
            [producto]: pesoSeleccionado,
        }));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5">Nuestros Productos</h2>
            <Row>
                {productos.map((producto, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={producto.imagen} />
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Form.Group controlId={`producto-${producto.nombre}`}>
                                    <Form.Label>Selecciona el peso</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => handleChange(producto.nombre, e.target.value)}
                                    >
                                        {producto.opcionesPeso.map((opcion, i) => (
                                            <option key={i} value={opcion.peso}>
                                                {opcion.peso} kg
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                {seleccion[producto.nombre] && (
                                    <div className="mt-3">
                                        <h5>Precio: ${producto.opcionesPeso.find((opcion) => opcion.peso === parseInt(seleccion[producto.nombre])).precio}</h5>
                                    </div>
                                )}
                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Productos;
