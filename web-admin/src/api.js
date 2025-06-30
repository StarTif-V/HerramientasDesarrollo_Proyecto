import axios from 'axios';

// URLs de las APIs
const USERS_API_URL = 'http://localhost:5002/api/users'; // URL de la API para usuarios
const CLIENTES_API_URL = 'http://localhost:5002/api/clientes'; // URL de la API para clientes
const PROVEEDORES_API_URL = 'http://localhost:5002/api/proveedores'; // URL de la API para proveedores
const VENTAS_RECARGAS_API_URL = 'http://localhost:5002/api/ventas-recargas'; // URL de la API para ventas y recargas

// **Funciones para USUARIOS**
export const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5002/api/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5002/api/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`http://localhost:5002/api/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:5002/api/users/${id}`);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};

// **Funciones para CLIENTES**
export const getClientes = async () => {
    try {
        const response = await axios.get('http://localhost:5002/api/clientes');
        return response.data;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        return [];
    }
};

export const createCliente = async (clienteData) => {
    try {
        const response = await axios.post('http://localhost:5002/api/clientes', clienteData);
        return response.data;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    }
};

export const updateCliente = async (id, clienteData) => {
    try {
        const response = await axios.put(`http://localhost:5002/api/clientes/${id}`, clienteData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        throw error;
    }
};

export const deleteCliente = async (id) => {
    try {
        await axios.delete(`http://localhost:5002/api/clientes/${id}`);
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw error;
    }
};

// **Funciones para PROVEEDORES**
export const getProveedores = async () => {
    try {
        const response = await axios.get('http://localhost:5002/api/proveedores');
        return response.data;
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        return [];
    }
};

export const createProveedor = async (proveedorData) => {
    try {
        const response = await axios.post('http://localhost:5002/api/proveedores', proveedorData);
        return response.data;
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        throw error;
    }
};

export const updateProveedor = async (id, proveedorData) => {
    try {
        const response = await axios.put(`http://localhost:5002/api/proveedores/${id}`, proveedorData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        throw error;
    }
};

export const deleteProveedor = async (id) => {
    try {
        await axios.delete(`http://localhost:5002/api/proveedores/${id}`);
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        throw error;
    }
};

// **Funciones para VENTAS y RECARGAS (unificadas)**
export const getVentasRecargas = async (tipo = '') => {
    try {
        const response = await axios.get(`${VENTAS_RECARGAS_API_URL}?tipo=${tipo}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener ventas o recargas:', error);
        return [];
    }
};

export const createVentaRecarga = async (ventaRecargaData) => {
    try {
        const response = await axios.post(VENTAS_RECARGAS_API_URL, ventaRecargaData);
        return response.data;
    } catch (error) {
        console.error('Error al crear venta o recarga:', error);
        throw error;
    }
};

export const deleteVentaRecarga = async (id) => {
    try {
        await axios.delete(`${VENTAS_RECARGAS_API_URL}/${id}`);
    } catch (error) {
        console.error('Error al eliminar venta o recarga:', error);
    }
};
// **Funciones para VENTAS y RECARGAS (unificadas)**
export const updateVentaRecarga = async (id, ventaRecargaData) => {
    try {
        const response = await axios.put(`${VENTAS_RECARGAS_API_URL}/${id}`, ventaRecargaData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar venta o recarga:', error);
        throw error;
    }
};
