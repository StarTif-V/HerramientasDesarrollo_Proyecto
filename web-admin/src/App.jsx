import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Clientes from './pages/Clientes';
import Proveedores from './pages/Proveedores';
import Ventas from './pages/Ventas';
import ProtectedLayout from './layouts/ProtectedLayout'; // Importa el nuevo layout

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para la Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas con Sidebar */}
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="productos" element={<Productos />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="proveedores" element={<Proveedores />} />
                    <Route path="ventas" element={<Ventas />} />
                </Route>

                {/* Redirigir cualquier otra ruta a la Landing Page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

//nuevo comentario