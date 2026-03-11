import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      setLoading(false);
      return;
    }

    try {
      await forgotPassword(email);
      setSubmitted(true);
      setMessage('Se ha enviado un enlace de recuperación a tu correo. Por favor verifica tu bandeja de entrada.');
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (err) {
      setError(err.response?.data || 'Error al solicitar recuperación de contraseña. Intenta nuevamente.');
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
          <h2 className="mt-2 font-display text-3xl text-white">Recuperar contraseña</h2>
          <p className="mt-2 text-sm text-white/[0.72]">Te enviaremos un enlace para restablecer tu contraseña.</p>
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
            <p className="text-emerald-300 font-semibold mb-2">¡Enlace enviado!</p>
            <p className="text-white/[0.78] text-sm mb-4">{message}</p>
            <p className="text-white/[0.52] text-xs">Redirigiendo a login en 5 segundos...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/[0.82] mb-2">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@empresa.pe"
                className="block w-full rounded-2xl border border-white/[0.06] bg-[#07111b] py-3 px-4 text-sm text-white outline-none placeholder:text-white/[0.28] focus:ring-2 focus:ring-cyan-300/10"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-4 py-4 font-display text-sm uppercase tracking-[0.22em] text-[#05111b] disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>

            <div className="text-center">
              <p className="text-white/[0.62] text-sm">¿Recuerdas tu contraseña? <Link to="/login" className="text-cyan-100 font-semibold hover:text-white">Volver al login</Link></p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
