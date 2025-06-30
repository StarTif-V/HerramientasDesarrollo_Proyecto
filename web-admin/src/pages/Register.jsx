import React, { useState } from 'react';
import { createUser } from '../api'; // Importar la función para crear usuarios
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(userData); // Crear el nuevo usuario
            navigate('/dashboard'); // Redirigir al Dashboard
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Registrar Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
