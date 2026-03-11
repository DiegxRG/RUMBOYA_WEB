import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axiosConfig';

// Creación del Contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente en los componentes
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Al montar la app, verifica si ya teníamos un token guardado.
        const token = Cookies.get('token');
        const userDataString = localStorage.getItem('user');
        const companyDataString = localStorage.getItem('companyData');

        if (token && userDataString) {
            try {
                setUser(JSON.parse(userDataString));
                if (companyDataString) {
                    setCompanyDetails(JSON.parse(companyDataString));
                }
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Error al parear datos locales:", e);
                logout();
            }
        }
        setIsLoading(false);
    }, []);

    // Función para manejar el inicio de sesión
    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });

            const data = response.data;

            // Guardar token en las cookies por seguridad y para axios
            Cookies.set('token', data.token, { expires: 1 }); // expira en 1 día

            // Guardamos la información del usuario en state
            setUser(data.user);
            setIsAuthenticated(true);

            // Si el usuario trae datos de empresa, los guardamos también (como el frontend será usado por EMPRESA)
            if (data.empresa) {
                setCompanyDetails(data.empresa);
                localStorage.setItem('companyData', JSON.stringify(data.empresa));
            }

            // Persistir los datos del usuario en localStorage para que no se pierdan al refrescar
            localStorage.setItem('user', JSON.stringify(data.user));

            return { success: true, role: data.user.role };

        } catch (error) {
            console.error("Error validando Login: ", error.response?.data);
            return {
                success: false,
                message: error.response?.data?.message || 'Error al iniciar sesión',
            };
        }
    };

    // Función para registrar la empresa
    const registerCompany = async (companyData) => {
        try {
            // El payload espera un RegisterRequest (firstName, lastName, email, password, role, etc)
            // Agregamos "role" por defecto
            const payload = {
                ...companyData,
                role: 'EMPRESA'
            };

            const response = await api.post('/api/auth/register', payload);

            // NOTA: Algunas APIs devuelven el token directamente tras registro.
            // Según AUTH_DOCS.md, el response incluye un "token". Así que podemos autologuearlos.
            const data = response.data;
            if (data.token) {
                Cookies.set('token', data.token, { expires: 1 });
                setUser(data.user);
                if (data.empresa) {
                    setCompanyDetails(data.empresa);
                    localStorage.setItem('companyData', JSON.stringify(data.empresa));
                }
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsAuthenticated(true);
            }

            return { success: true };

        } catch (error) {
            console.error("Error al registrar: ", error.response?.data);
            // Concatenar errores si es array o mandar el mensaje genérico
            let msg = 'Error en el registro';
            if (error.response?.data && typeof error.response.data === 'object' && !error.response.data.message) {
                msg = Object.values(error.response.data).join(', ');
            } else {
                msg = error.response?.data?.message || msg;
            }

            return {
                success: false,
                message: msg,
            };
        }
    };

    // Solicitar recuperación de contraseña
    const forgotPassword = async (email) => {
        try {
            const response = await api.post(`/api/auth/forgot-password?email=${encodeURIComponent(email)}`);
            return response.data;
        } catch (error) {
            console.error("Error al solicitar recuperación de contraseña: ", error.response?.data);
            throw error;
        }
    };

    // Restablecer contraseña con token
    const resetPassword = async (token, newPassword, confirmPassword) => {
        try {
            const response = await api.post('/api/auth/reset-password', null, {
                params: {
                    token,
                    newPassword,
                    confirmPassword
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al restablecer contraseña: ", error.response?.data);
            throw error;
        }
    };

    // Cierra sesión
    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('companyData');
        setUser(null);
        setCompanyDetails(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
                companyDetails,
                login,
                registerCompany,
                forgotPassword,
                resetPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
