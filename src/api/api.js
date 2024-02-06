// /utils/api.js
import axios from 'axios';

// Función para obtener los trabajadores desde el endpoint
export const fetchWorkers = async () => {
  try {
    const response = await axios.get('/endpoint-trabajadores'); // Ajusta el endpoint
    // Ajusta según la estructura de tu respuesta
    return response.data.map(worker => worker.nombre);
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    return ['Vicente Diaz', 'Libardo Sanchez']; // Devuelve un array default en caso de error
  }
};

// Función para obtener las herramientas desde el endpoint
export const fetchSupplies = async () => {
  try {
    const response = await axios.get('/endpoint-herramientas'); // Ajusta el endpoint
    // Ajusta según la estructura de tu respuesta
    return response.data.map(supply => supply.nombre);
  } catch (error) {
    console.error("Error al obtener las herramientas:", error);
    return ['Guadaña 1', 'Guadaña 2']; // Devuelve un array default en caso de error
  }
};