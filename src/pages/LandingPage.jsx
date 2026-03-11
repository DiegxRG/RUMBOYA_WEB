import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    ArrowRight,
    BarChart3,
    Building2,
    Clock3,
    Map,
    Navigation,
    Radio,
    Route,
    ScanSearch,
    ShieldCheck,
    Ticket,
    Users,
} from 'lucide-react';

const signalCards = [
    {
        label: 'Flota conectada',
        value: '148',
        detail: 'unidades activas entre rutas troncales, urbanas y VIP',
    },
    {
        label: 'Incidencias visibles',
        value: '09',
        detail: 'eventos listos para soporte, seguimiento y moderacion',
    },
    {
        label: 'Operaciones del dia',
        value: '3.4K',
        detail: 'pasajeros movilizados y tickets validados en simulacion',
    },
];

const moduleCards = [
    {
        icon: Navigation,
        title: 'Monitoreo en vivo',
        description: 'Visualiza combis, rutas criticas y ventanas de desvio desde una sola vista.',
    },
    {
        icon: Route,
        title: 'Route Builder',
        description: 'Traza recorridos, define paraderos y ordena horarios para cada empresa.',
    },
    {
        icon: Users,
        title: 'Control de personal',
        description: 'Aprueba choferes, valida invitaciones y sigue altas pendientes sin perder contexto.',
    },
    {
        icon: Ticket,
        title: 'Operacion y tickets',
        description: 'Resume actividad diaria, productividad por unidad y flujo general de pasajeros.',
    },
];

const roleCards = [
    {
        icon: Building2,
        title: 'Admin de Empresa',
        description: 'Panel enfocado en flota, choferes, codigos de invitacion y decisiones operativas del dia.',
    },
    {
        icon: Users,
        title: 'Flota y personal',
        description: 'Aprueba choferes y cobradores, gestiona solicitudes y supervisa asignaciones en tiempo real.',
    },
];

const timeline = [
    'Supervision global de empresas, flota, usuarios y metricas de plataforma.',
    'Panel de empresa para choferes, codigos de invitacion y actividad diaria.',
    'Route Builder para trazar rutas, definir paraderos y ordenar horarios.',
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#06111b] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.28),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(250,204,21,0.16),transparent_22%),linear-gradient(145deg,#07131f_0%,#0a1a2a_42%,#030812_100%)]" />
            <div className="route-grid absolute inset-0 opacity-40" />
            <div className="route-noise absolute inset-0 opacity-20" />
            <div className="route-scan absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary-500/[0.12] blur-[140px]" />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-6 md:px-8 lg:px-10">
                <motion.header
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    custom={0}
                    className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-3 backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.12] bg-[#091a2c] shadow-[0_10px_40px_rgba(2,132,199,0.18)]">
                                <img
                                    src="/rumboya-logo.png"
                                    alt="RumboYa"
                                    className="h-8 w-8 object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-display text-lg font-semibold uppercase tracking-[0.22em] text-white/[0.92]">
                                    RumboYa Admin
                                </p>
                                <p className="text-sm text-white/[0.55]">
                                    Sistema web para control operativo, rutas y flota metropolitana
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/[0.68]">
                            <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-2">
                                Live ops
                            </span>
                            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-2">
                                Route builder
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">
                                Fleet control
                            </span>
                        </div>
                    </div>
                </motion.header>

                <main className="flex-1">
                    <section className="grid items-center gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
                        {/* Columna de texto */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.1}
                            className="max-w-xl"
                        >
                            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                                <Radio className="h-4 w-4" />
                                Panel web administrativo RumboYa
                            </div>

                            <h1 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-white">
                                Administra tu flota, rutas y personal desde un solo panel de control.
                            </h1>

                            <p className="mt-5 max-w-lg text-base leading-7 text-white/[0.68]">
                                Conecta la operación web con la app móvil RumboYa. Supervisa choferes,
                                aprueba cobradores y sigue tus combis en tiempo real.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-400 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#05111b] transition-all hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_20px_50px_rgba(34,211,238,0.25)]"
                                >
                                    Entrar al sistema
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>

                            {/* Stats compactas */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                {[
                                    { label: 'Flota conectada', value: '148+' },
                                    { label: 'Operaciones/día', value: '3.4K' },
                                    { label: 'Tiempo real', value: '24/7' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-3">
                                        <p className="font-display text-xl text-white">{value}</p>
                                        <p className="mt-0.5 text-xs uppercase tracking-widest text-white/40">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mock app móvil — más grande */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.2}
                            className="relative flex justify-center py-8"
                        >
                            {/* Glow de fondo */}
                            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full bg-cyan-400/[0.08] blur-[100px]" />

                            {/* Teléfono principal */}
                            <motion.div
                                animate={{ y: [0, -14, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative w-[320px] rounded-[3rem] border-2 border-white/[0.15] bg-[#050e18] shadow-[0_50px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden z-10"
                            >
                                {/* Status bar */}
                                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                                    <span className="text-[11px] uppercase tracking-widest text-white/30 font-medium">RumboYa!</span>
                                    <div className="flex gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-cyan-400 route-pulse" />
                                        <span className="h-2 w-2 rounded-full bg-white/15" />
                                        <span className="h-2 w-2 rounded-full bg-white/15" />
                                    </div>
                                </div>

                                {/* Mapa SVG más grande */}
                                <div className="relative mx-4 overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#091a2a]" style={{ height: '210px' }}>
                                    <div className="route-grid absolute inset-0 opacity-20" />
                                    <svg viewBox="0 0 320 210" className="absolute inset-0 h-full w-full" fill="none">
                                        <path d="M16 175 C60 155 95 135 140 108 C185 81 218 62 304 52" stroke="rgba(56,189,248,0.95)" strokeWidth="4" strokeLinecap="round" className="route-path" />
                                        <path d="M16 192 C70 175 115 158 162 147 C208 135 242 137 304 155" stroke="rgba(250,204,21,0.75)" strokeWidth="3" strokeLinecap="round" strokeDasharray="9 10" className="route-dash" />
                                        <circle cx="140" cy="108" r="6" fill="#f8fafc" opacity="0.9" />
                                        <circle cx="210" cy="78" r="5" fill="#facc15" />
                                        <circle cx="280" cy="55" r="5" fill="#f8fafc" opacity="0.7" />
                                        <circle cx="110" cy="122" r="9" fill="#22d3ee" className="route-pulse-dot" />
                                        <circle cx="110" cy="122" r="16" fill="rgba(34,211,238,0.12)" className="route-pulse-dot" />
                                    </svg>
                                    {/* Badge */}
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl border border-white/[0.1] bg-[rgba(7,18,29,0.88)] px-3.5 py-2 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 route-pulse" />
                                            <span className="text-[10px] uppercase tracking-widest text-white/60">En ruta</span>
                                        </div>
                                        <span className="text-[10px] font-medium text-cyan-300">AUN-248</span>
                                    </div>
                                </div>

                                {/* Solicitud */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="mx-4 mt-3.5 rounded-2xl border border-cyan-400/25 bg-cyan-900/20 px-4 py-3"
                                >
                                    <p className="text-[10px] uppercase tracking-widest text-cyan-300/70">Nueva solicitud</p>
                                    <p className="mt-1 text-sm text-white/85">Pepe Flores quiere unirse a tu flota.</p>
                                </motion.div>

                                {/* Accesos rápidos */}
                                <div className="mx-4 mt-3.5 mb-5 grid grid-cols-3 gap-2.5">
                                    {[
                                        { icon: Navigation, label: 'Rutas', color: 'text-cyan-300' },
                                        { icon: Users, label: 'Personal', color: 'text-amber-300' },
                                        { icon: ShieldCheck, label: 'Aprobar', color: 'text-emerald-300' },
                                    ].map(({ icon: Icon, label, color }) => (
                                        <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.04] py-3.5">
                                            <Icon className={`h-5 w-5 ${color}`} />
                                            <span className="text-[10px] text-white/50">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Home indicator */}
                                <div className="flex justify-center pb-4">
                                    <div className="h-1 w-20 rounded-full bg-white/20" />
                                </div>
                            </motion.div>

                            {/* Tarjeta flotante izquierda */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                                className="absolute left-0 top-[32%] w-[148px] rounded-2xl border border-amber-300/20 bg-[rgba(8,20,34,0.92)] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl z-20"
                            >
                                <p className="text-[9px] uppercase tracking-widest text-white/40">Pendientes</p>
                                <p className="mt-2 font-display text-3xl text-amber-300">3</p>
                                <p className="mt-1 text-[11px] leading-4 text-white/50">choferes esperando aprobación</p>
                            </motion.div>

                            {/* Tarjeta flotante derecha */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                                className="absolute right-0 bottom-[18%] w-[138px] rounded-2xl border border-emerald-400/20 bg-[rgba(8,20,34,0.92)] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl z-20"
                            >
                                <p className="text-[9px] uppercase tracking-widest text-white/40">Flota activa</p>
                                <p className="mt-2 font-display text-3xl text-emerald-300">12</p>
                                <p className="mt-1 text-[11px] leading-4 text-white/50">combis operando ahora</p>
                            </motion.div>
                        </motion.div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={fadeUp}
                            custom={0.05}
                            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl"
                        >
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Base funcional del sistema web</p>
                            <h2 className="mt-3 font-display text-3xl text-white">La web administra la misma operacion que ya existe en la app movil.</h2>
                            <div className="mt-6 space-y-4 text-sm leading-7 text-white/[0.68]">
                                <p>Passenger ve combis en vivo, consulta rutas, reserva pasajes y reporta incidencias desde el mapa.</p>
                                <p>Driver y collector operan el viaje, transmiten ubicacion y validan el flujo del servicio en ruta.</p>
                                <p>La capa web concentra ese contexto para que RumboYa y cada empresa puedan supervisar flota, personal, rutas, tickets e incidentes.</p>
                            </div>
                        </motion.div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {moduleCards.map((card, index) => {
                                const Icon = card.icon;

                                return (
                                    <motion.article
                                        key={card.title}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.25 }}
                                        variants={fadeUp}
                                        custom={0.12 + index * 0.06}
                                        whileHover={{ y: -6 }}
                                        className="rounded-[1.8rem] border border-white/10 bg-[rgba(8,19,32,0.78)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-400/10 text-cyan-100">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 font-display text-2xl text-white">{card.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-white/[0.64]">{card.description}</p>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="grid gap-4 md:grid-cols-2">
                            {roleCards.map((card, index) => {
                                const Icon = card.icon;

                                return (
                                    <motion.article
                                        key={card.title}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.25 }}
                                        variants={fadeUp}
                                        custom={0.1 + index * 0.08}
                                        className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#07131f] text-cyan-100">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-display text-2xl text-white">{card.title}</h3>
                                        </div>
                                        <p className="mt-4 text-sm leading-7 text-white/[0.66]">{card.description}</p>
                                    </motion.article>
                                );
                            })}
                        </div>

                        <motion.article
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={fadeUp}
                            custom={0.16}
                            className="rounded-[2rem] border border-white/10 bg-[rgba(8,19,32,0.78)] p-7 backdrop-blur-xl"
                        >
                            <p className="text-xs uppercase tracking-[0.24em] text-amber-100/[0.72]">Que centraliza este sistema</p>
                            <h2 className="mt-3 font-display text-3xl text-white">Un panel para operar la red de transporte, no solo mostrar un dashboard bonito.</h2>
                            <ul className="mt-6 space-y-4">
                                {timeline.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/[0.66]">
                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    </section>

                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={fadeUp}
                        custom={0.12}
                        className="mt-6 rounded-[2.2rem] border border-cyan-300/14 bg-gradient-to-r from-cyan-400/14 via-white/6 to-amber-300/14 p-7 backdrop-blur-xl"
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/[0.76]">Acceso interno</p>
                                <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
                                    Diseñado para empresas de transporte que quieren operar con visibilidad real.
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-white/[0.66]">
                                    Desde aquí se gestionan choferes, cobradores, códigos de vinculación
                                    y el estado operativo de cada unidad conectada a la app móvil.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center justify-center gap-3 self-start rounded-full border border-white/[0.12] bg-white px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#06111b] transition-all hover:-translate-y-0.5"
                            >
                                Ingresar al acceso seguro
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.section>
                </main>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .route-grid {
                            background-image:
                                linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
                            background-size: 120px 120px;
                            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 92%);
                        }

                        .route-noise {
                            background-image:
                                radial-gradient(rgba(255, 255, 255, 0.08) 0.7px, transparent 0.7px);
                            background-size: 18px 18px;
                        }

                        .route-scan::before {
                            content: "";
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(180deg, transparent, rgba(34, 211, 238, 0.1), transparent);
                            animation: routeScan 7s linear infinite;
                        }

                        .route-panel::after {
                            content: "";
                            position: absolute;
                            inset: 1px;
                            border-radius: 1.95rem;
                            pointer-events: none;
                            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
                        }

                        .route-path {
                            filter: drop-shadow(0 0 18px rgba(34, 211, 238, 0.45));
                        }

                        .route-dash {
                            animation: routeDash 16s linear infinite;
                        }

                        .route-pulse,
                        .route-pulse-dot {
                            animation: routePulse 1.8s ease-in-out infinite;
                        }

                        @keyframes routeScan {
                            0% {
                                transform: translateY(-100%);
                            }
                            100% {
                                transform: translateY(100%);
                            }
                        }

                        @keyframes routeDash {
                            0% {
                                stroke-dashoffset: 0;
                            }
                            100% {
                                stroke-dashoffset: -160;
                            }
                        }

                        @keyframes routePulse {
                            0%,
                            100% {
                                opacity: 1;
                                transform: scale(1);
                            }
                            50% {
                                opacity: 0.55;
                                transform: scale(1.25);
                            }
                        }
                    `,
                }}
            />
        </div >
    );
}
