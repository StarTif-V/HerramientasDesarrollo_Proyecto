import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaTachometerAlt, FaBox, FaUsers, FaMoneyBillWave, FaTruck } from "react-icons/fa"; // Importa iconos

const Sidebar = ({ selectedMenu, setSelectedMenu }) => {
  const navigate = useNavigate();

  const handleSidebarClick = (menu) => {
    setSelectedMenu(menu);
    navigate(`/${menu}`);
  };

  return (
    <aside className="sidebar d-flex flex-column">
      <div className="sidebar-header text-center py-3">
        <h2>Alrex</h2>
        <img src="/images/logo.png" alt="Venta de Extintores" className="logo-image" />
      </div>
      <ul className="sidebar-menu list-unstyled flex-grow-1">
        <li
          className={`menu-item ${selectedMenu === "dashboard" ? "active" : ""}`}
          onClick={() => handleSidebarClick("dashboard")}
        >
          <FaTachometerAlt className="menu-icon" /> Dashboard
        </li>
        <li
          className={`menu-item ${selectedMenu === "productos" ? "active" : ""}`}
          onClick={() => handleSidebarClick("productos")}
        >
          <FaBox className="menu-icon" /> Productos
        </li>
        <li
          className={`menu-item ${selectedMenu === "ventas" ? "active" : ""}`}
          onClick={() => handleSidebarClick("ventas")}
        >
          <FaMoneyBillWave className="menu-icon" /> Ventas y Recargas
        </li>
        <li
          className={`menu-item ${selectedMenu === "clientes" ? "active" : ""}`}
          onClick={() => handleSidebarClick("clientes")}
        >
          <FaUsers className="menu-icon" /> Clientes
        </li>
        <li
          className={`menu-item ${selectedMenu === "proveedores" ? "active" : ""}`}
          onClick={() => handleSidebarClick("proveedores")}
        >
          <FaTruck className="menu-icon" /> Proveedores
        </li>
      </ul>
      <footer className="sidebar-footer text-center py-3">
        <span>&copy; 2024 Alrex</span>
      </footer>
    </aside>
  );
};

export default Sidebar;
