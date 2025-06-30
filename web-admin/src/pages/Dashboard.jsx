import React, { useState } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js';
import { Card } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const Dashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Estado para el menú seleccionado

    // Datos para los gráficos
    const ventasData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
            {
                label: 'Ventas ($)',
                data: [10000, 15000, 8000, 20000],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
            },
        ],
    };

    const recargasData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
            {
                label: 'Recargas Completadas',
                data: [20, 35, 25, 45],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: true,
                hoverBackgroundColor: 'rgba(255, 205, 86, 0.8)',
            },
        ],
    };

    const productosVendidosData = {
        labels: ['Extintores', 'Señales de Seguridad', 'Accesorios'],
        datasets: [
            {
                data: [300, 150, 50],
                backgroundColor: ['#FF5733', '#FFC300', '#DAF7A6'],
                hoverBackgroundColor: ['#C70039', '#FF5733', '#900C3F'],
            },
        ],
    };

    const clientesData = {
        labels: ['Activos', 'Inactivos'],
        datasets: [
            {
                data: [80, 20],
                backgroundColor: ['#900C3F', '#FF5733'],
                hoverBackgroundColor: ['#581845', '#C70039'],
            },
        ],
    };

    // Opciones generales para los gráficos
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#343a40',
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutBounce',
        },
    };

    return (
        <div className="dashboard-container d-flex">
            {/* Sidebar */}
            <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Dashboard - Alrex</h1>
                </header>

                {/* Contenido dinámico basado en el menú seleccionado */}
                {selectedMenu === 'dashboard' && (
                    <>
                        {/* Tarjetas superiores */}
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <Card className="dashboard-card">
                                    <Card.Body>
                                        <h5>Ventas Totales</h5>
                                        <h2>$40,000</h2>
                                        <p className="text-success">+10% este mes</p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card className="dashboard-card">
                                    <Card.Body>
                                        <h5>Recargas Completadas</h5>
                                        <h2>120</h2>
                                        <p className="text-success">+15% este mes</p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card className="dashboard-card">
                                    <Card.Body>
                                        <h5>Nuevos Clientes</h5>
                                        <h2>36</h2>
                                        <p className="text-success">+20% este mes</p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card className="dashboard-card">
                                    <Card.Body>
                                        <h5>Solicitudes Pendientes</h5>
                                        <h2>5</h2>
                                        <p className="text-danger">-5% este mes</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        {/* Gráficos */}
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <Card>
                                    <Card.Header>Gráfico de Ventas</Card.Header>
                                    <Card.Body>
                                        <Bar data={ventasData} options={options} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-6 mb-4">
                                <Card>
                                    <Card.Header>Gráfico de Recargas</Card.Header>
                                    <Card.Body>
                                        <Line data={recargasData} options={options} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <Card>
                                    <Card.Header>Productos Vendidos</Card.Header>
                                    <Card.Body>
                                        <Doughnut data={productosVendidosData} options={options} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-md-6 mb-4">
                                <Card>
                                    <Card.Header>Estado de Clientes</Card.Header>
                                    <Card.Body>
                                        <Pie data={clientesData} options={options} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
