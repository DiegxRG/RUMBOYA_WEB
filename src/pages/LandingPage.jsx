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
        icon: ShieldCheck,
        title: 'Super Admin RumboYa',
        description: 'Vista macro de empresas, rutas activas, estados globales e indicadores de plataforma.',
    },
    {
        icon: Building2,
        title: 'Admin de Empresa',
        description: 'Panel enfocado en flota, choferes, codigos de invitacion y decisiones operativas del dia.',
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
                    <section className="grid items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-[4.5rem]">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.1}
                            className="max-w-3xl"
                        >
                            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                                <Radio className="h-4 w-4" />
                                Panel web administrativo RumboYa
                            </div>

                            <h1 className="font-display text-[clamp(3.2rem,9vw,7.2rem)] leading-[0.86] tracking-[-0.04em] text-white">
                                Administra rutas, flota y operacion de RumboYa desde un solo centro de control.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.72] md:text-xl">
                                Este sistema web nace de la app movil Chapa Tu Combi: pasajeros que buscan
                                rutas, choferes que transmiten ubicacion, cobradores que validan tickets y
                                empresas que necesitan ordenar su operacion diaria con visibilidad real.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-400 px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#05111b] transition-all hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_20px_50px_rgba(34,211,238,0.25)]"
                                >
                                    Entrar al sistema
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.08] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/[0.88] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12]"
                                >
                                    Ver demo admin
                                </button>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {signalCards.map((card, index) => (
                                    <motion.article
                                        key={card.label}
                                        initial="hidden"
                                        animate="show"
                                        variants={fadeUp}
                                        custom={0.18 + index * 0.08}
                                        className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
                                    >
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/[0.48]">{card.label}</p>
                                        <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-white">
                                            {card.value}
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-white/[0.58]">{card.detail}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            custom={0.2}
                            className="relative"
                        >
                            <div className="route-panel relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[rgba(8,19,32,0.88)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.26em] text-white/[0.42]">
                                            Simulacion conceptual
                                        </p>
                                        <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                                            Centro de operacion metropolitana
                                        </h2>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
                                        <span className="h-2 w-2 rounded-full bg-emerald-300 route-pulse" />
                                        En linea
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-white/[0.45]">Rutas activas</p>
                                        <p className="mt-3 font-display text-3xl text-white">07</p>
                                        <p className="mt-2 text-sm text-white/[0.55]">2 corredores VIP y 5 lineas urbanas.</p>
                                    </div>
                                    <div className="rounded-2xl border border-cyan-300/18 bg-cyan-400/10 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/[0.8]">Flujo operativo</p>
                                        <p className="mt-3 font-display text-3xl text-white">94%</p>
                                        <p className="mt-2 text-sm text-white/[0.65]">Cobertura alta de unidades seguidas en tiempo real.</p>
                                    </div>
                                </div>

                                <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-cyan-300/10 bg-[#091a2a] p-4">
                                    <div className="route-grid absolute inset-0 opacity-25" />
                                    <svg
                                        viewBox="0 0 520 300"
                                        className="absolute inset-0 h-full w-full"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 238C84 202 126 186 164 170C211 150 243 119 274 91C313 55 360 42 493 48"
                                            stroke="rgba(56,189,248,0.88)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            className="route-path"
                                        />
                                        <path
                                            d="M68 273C132 253 183 222 228 190C277 154 305 150 336 167C377 189 410 221 492 244"
                                            stroke="rgba(250,204,21,0.88)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray="10 12"
                                            className="route-dash"
                                        />
                                        <circle cx="164" cy="170" r="8" fill="#f8fafc" />
                                        <circle cx="274" cy="91" r="8" fill="#f8fafc" />
                                        <circle cx="336" cy="167" r="7" fill="#facc15" />
                                        <circle cx="492" cy="244" r="7" fill="#f8fafc" />
                                        <circle cx="409" cy="48" r="10" fill="#22d3ee" className="route-pulse-dot" />
                                    </svg>

                                    <div className="relative z-10 flex items-start justify-between gap-4">
                                        <div className="rounded-2xl border border-white/10 bg-[rgba(7,19,30,0.78)] px-4 py-3">
                                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.45]">Eje principal</p>
                                            <p className="mt-2 font-display text-xl text-white">Ruta A1 Centro - Norte</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-right">
                                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.45]">Ventana critica</p>
                                            <p className="mt-2 text-sm text-white/[0.78]">18:10 - 19:00</p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-28 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-white/10 bg-[rgba(6,17,27,0.8)] p-4">
                                            <div className="flex items-center gap-3 text-cyan-100">
                                                <Activity className="h-4 w-4" />
                                                <span className="text-xs uppercase tracking-[0.2em]">Estado de flota</span>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-white/[0.7]">
                                                18 combis en ruta, 4 en pausa operativa y 2 bajo revision.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-[rgba(6,17,27,0.8)] p-4">
                                            <div className="flex items-center gap-3 text-amber-200">
                                                <ScanSearch className="h-4 w-4" />
                                                <span className="text-xs uppercase tracking-[0.2em]">Incidencias visibles</span>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-white/[0.7]">
                                                Trafico, paraderos saturados y reportes listos para soporte.
                                            </p>
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute right-4 top-[4.5rem] z-10 w-[14rem] rounded-[1.6rem] border border-cyan-300/18 bg-[rgba(7,19,31,0.88)] p-4 shadow-[0_20px_60px_rgba(6,182,212,0.18)] backdrop-blur-xl"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/[0.45]">Unidad conectada</p>
                                            <Navigation className="h-4 w-4 text-cyan-200" />
                                        </div>
                                        <p className="mt-3 font-display text-2xl text-white">RY-214</p>
                                        <p className="mt-2 text-sm text-white/[0.62]">
                                            4 min de desfase. 32 pasajeros proyectados.
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="mt-5 grid gap-3 md:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                        <div className="flex items-center gap-2 text-white/[0.72]">
                                            <Clock3 className="h-4 w-4 text-cyan-200" />
                                            <span className="text-xs uppercase tracking-[0.2em]">Turno pico</span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-white/[0.62]">Mayor intensidad entre 6:30 y 8:30 con supervision prioritaria.</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                        <div className="flex items-center gap-2 text-white/[0.72]">
                                            <BarChart3 className="h-4 w-4 text-amber-200" />
                                            <span className="text-xs uppercase tracking-[0.2em]">Metricas clave</span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-white/[0.62]">Vista corta de tickets, ocupacion y salud operativa por empresa.</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                        <div className="flex items-center gap-2 text-white/[0.72]">
                                            <Map className="h-4 w-4 text-cyan-200" />
                                            <span className="text-xs uppercase tracking-[0.2em]">Topologia visual</span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-white/[0.62]">Capas de mapa, nodos y rutas para que el admin entienda rapido el contexto.</p>
                                    </div>
                                </div>
                            </div>
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
                                    Diseñado para Super Admin RumboYa, admins de empresa y equipos de soporte operativo.
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-white/[0.66]">
                                    Desde aqui se proyectan el monitoreo en vivo, la gestion de choferes, el route builder,
                                    la moderacion de incidencias y las metricas generales del servicio.
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
        </div>
    );
}
