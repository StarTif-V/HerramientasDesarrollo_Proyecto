import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Importa tu Sidebar

const ProtectedLayout = () => {
    const [selectedMenu, setSelectedMenu] = useState('dashboard');

    return (
        <div className="protected-layout">
            {/* Sidebar siempre visible */}
            <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            
            {/* Contenido principal cambia según la ruta */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;
