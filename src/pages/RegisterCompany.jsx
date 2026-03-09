import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Building2,
    Lock,
    Mail,
    User,
    FileText,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterCompany() {
    const navigate = useNavigate();
    const { registerCompany } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        empresaRuc: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMsg('');
        setIsLoading(true);

        const result = await registerCompany(formData);

        if (result.success) {
            setSuccessMsg('Empresa registrada correctamente. Redirigiendo...');
            // Espera un momento para que el usuario lea el mensaje y luego redirige
            setTimeout(() => {
                navigate('/company'); // Como el back devuelve token, se autologuea
            }, 1500);
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen overflow-y-auto bg-[#07121d] px-5 py-6 text-white md:px-8 lg:px-10 flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.15),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(250,204,21,0.1),transparent_20%),linear-gradient(160deg,#07111b_0%,#0b1827_48%,#050b13_100%)] fixed" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30 fixed" />

            <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/[0.1] bg-[rgba(6,17,27,0.72)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-8">

                <header className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Suma tu flota</p>
                        <h2 className="mt-2 font-display text-3xl text-white">Registro de Empresa</h2>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#081321]">
                        <Building2 className="h-6 w-6 text-cyan-100" />
                    </div>
                </header>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200"
                        >
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>{error}</p>
                        </motion.div>
                    )}
                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200"
                        >
                            <CheckCircle2 className="h-5 w-5 shrink-0" />
                            <p>{successMsg}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/[0.72]">Nombres</label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                    placeholder="Juan"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/[0.72]">Apellidos</label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                    placeholder="Pérez"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/[0.72]">RUC Empresa (11 dígitos)</label>
                        <div className="relative">
                            <FileText className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                            <input
                                type="text"
                                name="empresaRuc"
                                value={formData.empresaRuc}
                                onChange={handleChange}
                                required
                                maxLength="11"
                                pattern="\d{11}"
                                className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                placeholder="20123456789"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/[0.72]">Correo de acceso</label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                placeholder="admin@empresa.pe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/[0.72]">Contraseña</label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-4 py-4 font-display text-sm uppercase tracking-[0.22em] text-[#05111b] transition-all hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {isLoading ? 'Registrando...' : 'Registrar Empresa'}
                            {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-white/[0.62]">
                        ¿Ya tienes una cuenta registrada?{' '}
                        <Link to="/login" className="font-medium text-cyan-100 hover:text-white transition-colors">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </form>
            </div>
        </motion.div>
    );
}
