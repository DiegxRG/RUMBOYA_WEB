import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Building2,
    Lock,
    Mail,
    Map,
    Route,
    ShieldCheck,
    Users,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const accessHighlights = [
    {
        icon: Route,
        title: 'Route Builder',
        description: 'Traza rutas, define paraderos y estructura horarios operativos.',
    },
    {
        icon: Map,
        title: 'Monitoreo en vivo',
        description: 'Supervisa combis activas, desvío de rutas e incidencias del servicio.',
    },
    {
        icon: Users,
        title: 'Flota y personal',
        description: 'Aprueba choferes, gestiona códigos y ordena la operación de empresa.',
    },
];

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLoginCompany = async (event) => {
        event.preventDefault();
        setError('');

        if (!credentials.email || !credentials.password) {
            setError('Por favor ingresa tu correo y contraseña.');
            return;
        }

        setIsLoading(true);
        const result = await login(credentials.email, credentials.password);

        if (result.success) {
            // Evaluamos el rol para redirigir
            if (result.role === 'EMPRESA') {
                navigate('/company');
            } else if (result.role === 'SUPER_ADMIN') {
                navigate('/admin');
            } else {
                // Si entra un rol que no debería estar aquí, lo expulsamos xd
                setError('Este panel es solo para Empresas o Administradores.');
            }
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    const handleLoginSuperAdmin = (event) => {
        event.preventDefault();
        // Podríamos usar el mismo login pero forzando una UI u opciones distintas.
        // Aquí simplificamos compartiendo validación.
        handleLoginCompany(event);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen overflow-hidden bg-[#07121d] px-5 py-6 text-white md:px-8 lg:px-10"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.24),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(250,204,21,0.14),transparent_20%),linear-gradient(160deg,#07111b_0%,#0b1827_48%,#050b13_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col rounded-[2rem] border border-white/[0.1] bg-[rgba(6,17,27,0.52)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-6">
                <header className="flex flex-col gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] px-5 py-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.12] bg-[#091a2c]">
                            <img src="/rumboya-logo.png" alt="RumboYa" className="h-8 w-8 object-contain" />
                        </div>
                        <div>
                            <p className="font-display text-lg uppercase tracking-[0.22em] text-white">RumboYa Admin</p>
                            <p className="text-sm text-white/[0.58]">Acceso interno para supervisión, rutas y operación.</p>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        Sistema en línea
                    </div>
                </header>

                <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="flex flex-col justify-between rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] p-7">
                        <div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                                <ShieldCheck className="h-4 w-4" />
                                Acceso de control operativo
                            </div>

                            <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.9] tracking-[-0.04em] text-white">
                                El punto de entrada al sistema web administrativo de RumboYa.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68]">
                                Desde aquí ingresan el Super Admin de RumboYa y los admins de empresa para
                                supervisar flota, aprobar choferes, registrar su empresa operadora, construir rutas
                                y organizar el flujo conectado a la app celular.
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                {accessHighlights.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <article
                                            key={item.title}
                                            className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] p-5"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-400/10 text-cyan-100">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h2 className="mt-4 font-display text-2xl text-white">{item.title}</h2>
                                            <p className="mt-3 text-sm leading-7 text-white/[0.62]">{item.description}</p>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[1.6rem] border border-white/[0.08] bg-[#06111b] p-5">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/[0.48]">Roles de acceso</p>
                                <p className="mt-3 font-display text-2xl text-white">Super Admin y Admin de Empresa</p>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    Control global para RumboYa y control operativo focalizado para cada flota.
                                </p>
                            </div>
                            <div className="rounded-[1.6rem] border border-white/[0.08] bg-[#06111b] p-5">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/[0.48]">Alcance actual</p>
                                <p className="mt-3 font-display text-2xl text-white">Control Operativo MVP</p>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    Conecta la operación web con la estructura en tiempo real de vehículos y choferes.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center">
                        <form onSubmit={handleLoginCompany} className="w-full rounded-[1.9rem] border border-white/[0.08] bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Inicio seguro</p>
                                    <h2 className="mt-2 font-display text-3xl text-white">Ingresar al panel</h2>
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#081321]">
                                    <Building2 className="h-6 w-6 text-cyan-100" />
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200 overflow-hidden"
                                    >
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-8 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-white/[0.72]">
                                        Correo electrónico
                                    </label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                            placeholder="admin@empresa.pe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-white/[0.72]">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/[0.38]" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            className="block w-full rounded-2xl border border-white/[0.1] bg-[#07111b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/[0.28] focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
                                            placeholder="••••••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-white/[0.62]">
                                    <input type="checkbox" className="h-4 w-4 rounded border-white/[0.16] bg-transparent text-primary-500" />
                                    Mantener sesión
                                </label>
                                <a href="#" className="font-medium text-cyan-100 hover:text-white transition-colors">
                                    Recuperar acceso
                                </a>
                            </div>

                            <div className="mt-8 space-y-3">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-4 py-4 font-display text-sm uppercase tracking-[0.22em] text-[#05111b] transition-all hover:-translate-y-0.5 hover:bg-cyan-300 disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {isLoading ? 'Autenticando...' : 'Entrar como empresa'}
                                    {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLoginSuperAdmin}
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-4 font-display text-sm uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] disabled:opacity-50"
                                >
                                    Entrar como super admin
                                </button>
                            </div>

                            <div className="mt-6 flex flex-col items-center justify-center gap-2">
                                <p className="text-sm text-white/[0.62]">¿Tú empresa de transporte aún no está registrada?</p>
                                <Link
                                    to="/register"
                                    className="text-sm font-medium text-cyan-100 hover:text-white transition-colors underline underline-offset-4"
                                >
                                    Registrar nueva empresa
                                </Link>
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}
