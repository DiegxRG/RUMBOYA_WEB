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
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07121d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#091a2c] shadow-[0_0_40px_rgba(14,165,233,0.2)]">
            <img src="/rumboya-logo.png" alt="RumboYa" className="h-10 w-10 object-contain animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
            <p className="font-display tracking-[0.2em] text-xs uppercase text-cyan-100/[0.6]">Autenticando Sesión</p>
          </div>
        </div>
      </div>
    );
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

