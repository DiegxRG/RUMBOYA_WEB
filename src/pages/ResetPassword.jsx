import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!token) {
      setError('Enlace inválido o expirado. Por favor, solicita uno nuevo.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('Enlace inválido. Por favor, solicita uno nuevo.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, newPassword, confirmPassword);
      setSubmitted(true);
      setMessage('Tu contraseña ha sido actualizada exitosamente.');
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (err) {
      setError(err.response?.data || err.message || 'Error al restablecer contraseña. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07121d] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-[1.9rem] border border-white/[0.08] bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8"
      >
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Acceso seguro</p>
          <h2 className="mt-2 font-display text-3xl text-white">Nueva contraseña</h2>
          <p className="mt-2 text-sm text-white/[0.72]">Ingresa tu nueva contraseña para acceder al sistema.</p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="mb-4">
              <svg className="w-16 h-16 text-emerald-400 mx-auto" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" className="opacity-20" />
              </svg>
            </div>
            <p className="text-emerald-300 font-semibold mb-2">¡Contraseña actualizada!</p>
            <p className="text-white/[0.78] text-sm mb-4">{message}</p>
            <p className="text-white/[0.52] text-xs">Redirigiendo a login en 5 segundos...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-white/[0.82] mb-2">Nueva contraseña</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                className="block w-full rounded-2xl border border-white/[0.06] bg-[#07111b] py-3 px-4 text-sm text-white outline-none placeholder:text-white/[0.28] focus:ring-2 focus:ring-cyan-300/10"
                disabled={loading || !token}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/[0.82] mb-2">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                className="block w-full rounded-2xl border border-white/[0.06] bg-[#07111b] py-3 px-4 text-sm text-white outline-none placeholder:text-white/[0.28] focus:ring-2 focus:ring-cyan-300/10"
                disabled={loading || !token}
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-4 py-4 font-display text-sm uppercase tracking-[0.22em] text-[#05111b] disabled:opacity-50 hover:bg-cyan-300 transition-colors"
            >
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>

            <div className="text-center">
              <p className="text-white/[0.62] text-sm"><Link to="/login" className="text-cyan-100 font-semibold hover:text-white">Volver al login</Link></p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
