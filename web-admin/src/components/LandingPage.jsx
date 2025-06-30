// web-admin/src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Asegúrate de tener el archivo de estilo CSS

const LandingPage = () => {
    const navigate = useNavigate();

    // Función que redirige al Login cuando se hace clic en el botón
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-text">
                <img src="/images/logo.png" alt="Venta de Extintores" className="logo-image" />
                    <h1>Bienvenido a <span className="brand-name">Alrex</span></h1>
                    <p className="tagline">Tu tienda de extintores y recargas de confianza</p>
                    <button className="cta-button" onClick={handleLoginClick}>Iniciar sesión</button>
                </div>
            </div>
            <div className="services-section">
                <h2>¿Por qué elegirnos?</h2>
                <div className="services">
                    <div className="service">
                        <img src="/images/extintor.jpeg" alt="Venta de Extintores" />
                        <h3>Venta de Extintores</h3>
                        <p>Extintores de alta calidad para garantizar tu seguridad en cualquier emergencia.</p>
                    </div>
                    <div className="service">
                        <img src="/images/recarga.jpg" alt="Recarga de Extintores" />
                        <h3>Recarga de Extintores</h3>
                        <p>Servicio de recarga rápida y eficiente para mantener tus extintores siempre listos.</p>
                    </div>
                    <div className="service">
                        <img src="/images/mantenimiento.jfif" alt="Mantenimiento" />
                        <h3>Mantenimiento</h3>
                        <p>Realizamos revisiones y mantenimientos periódicos para asegurar el buen estado de tus equipos.</p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>&copy; 2024 Alrex - Todos los derechos reservados</p>
            </div>
        </div>
    );
};

export default LandingPage;