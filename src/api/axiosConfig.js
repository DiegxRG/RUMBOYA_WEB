import axios from 'axios';
import Cookies from 'js-cookie';

// Constante para la URL base (ideal mover luego a .env)
const BASE_URL = 'https://api.cabanillas.net.pe';

// Crear instancia de Axios personaliza
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar Authorization en todas las peticiones si hay token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
