import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RegisterCompany from './pages/RegisterCompany';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CompanyAdminDashboard from './pages/CompanyAdminDashboard';

// Rutas Generales de la App
function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterCompany />} />

        {/* Rutas Privadas */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="SUPER_ADMIN">
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/company/*" element={
          <ProtectedRoute requiredRole="EMPRESA">
            <CompanyAdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

// Componente para proteger las rutas privadas
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#07121d] text-white">Cargando aplicación...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta exigía un rol particular que el usuario no tiene:
  if (requiredRole && user?.role && user.role !== requiredRole) {
    // Si es empresa y está intentando acceder a admin lo mandamos a company
    if (user.role === 'EMPRESA') return <Navigate to="/company" replace />;
    // Caso contrario al login general
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-secondary-50 text-secondary-900 font-sans selection:bg-primary-500 selection:text-white">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

