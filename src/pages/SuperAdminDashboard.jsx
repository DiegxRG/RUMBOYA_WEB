import React from 'react';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import {
    Activity,
    BarChart3,
    Building2,
    Clock3,
    Map,
    Radio,
    Route as RouteIcon,
    Settings,
    ShieldAlert,
    Ticket,
    Users,
} from 'lucide-react';
import { mockCompanies, mockFleet, mockIncidents } from '../data/dummyData';
import CompanyManagement from './admin/CompanyManagement';

const shellCard =
    'rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] p-6 backdrop-blur-xl';

function SuperAdminLayout() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07121d] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(14,165,233,0.22),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(250,204,21,0.12),transparent_20%),linear-gradient(160deg,#07111b_0%,#0b1827_46%,#050b13_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

            <div className="relative z-10 flex min-h-screen gap-6 px-5 py-5 md:px-6 lg:px-8">
                <aside className="hidden w-[18rem] shrink-0 flex-col rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.82)] p-5 backdrop-blur-xl md:flex">
                    <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.05] p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#081321]">
                            <img src="/rumboya-logo.png" alt="RumboYa" className="h-8 w-8 object-contain" />
                        </div>
                        <div>
                            <p className="font-display text-lg uppercase tracking-[0.18em] text-white">RumboYa</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/[0.72]">Super Admin</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <Link
                            to="/admin"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${
                                isActive('/admin')
                                    ? 'border border-cyan-300/20 bg-cyan-400/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                            }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span>Vista global</span>
                        </Link>
                        <Link
                            to="/admin/empresas"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${
                                isActive('/admin/empresas')
                                    ? 'border border-cyan-300/20 bg-cyan-400/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                            }`}
                        >
                            <Building2 className="h-4 w-4" />
                            <span>Empresas</span>
                        </Link>
                        <Link
                            to="/admin/rutas"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${
                                isActive('/admin/rutas')
                                    ? 'border border-cyan-300/20 bg-cyan-400/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                            }`}
                        >
                            <RouteIcon className="h-4 w-4" />
                            <span>Route Builder</span>
                        </Link>
                        <Link
                            to="/admin/moderacion"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${
                                isActive('/admin/moderacion')
                                    ? 'border border-cyan-300/20 bg-cyan-400/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                            }`}
                        >
                            <ShieldAlert className="h-4 w-4" />
                            <span>Moderacion</span>
                        </Link>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Cobertura</p>
                        <p className="mt-3 font-display text-3xl text-white">94%</p>
                        <p className="mt-3 text-sm leading-6 text-white/[0.62]">
                            Visibilidad de flota, actividad por empresa e incidentes del servicio.
                        </p>
                    </div>

                    <button className="mt-auto flex items-center justify-center gap-2 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/[0.68] transition-all hover:bg-white/[0.08] hover:text-white">
                        <Settings className="h-4 w-4" />
                        Configuracion global
                    </button>
                </aside>

                <main className="min-w-0 flex-1">
                    <div className="rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.62)] p-5 backdrop-blur-xl md:p-6">
                        <header className="flex flex-col gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Centro de control RumboYa</p>
                                <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">Supervision global del sistema web administrativo.</h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                                    Monitorea empresas, rutas, vehiculos, actividad del servicio e incidencias
                                    reportadas desde la experiencia movil.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
                                <span className="rounded-full border border-cyan-300/18 bg-cyan-400/10 px-3 py-2 text-cyan-100">Live monitoring</span>
                                <span className="rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-2 text-amber-100">Rutas y paraderos</span>
                                <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-white/[0.7]">Panel interno</span>
                            </div>
                        </header>

                        <div className="mt-6">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function GlobalDashboardHome() {
    const activeFleet = mockFleet.filter((vehicle) => vehicle.status === 'En Ruta').length;
    const activeIncidents = mockIncidents.filter((incident) => incident.status === 'Activo').length;

    const statCards = [
        { label: 'Empresas afiliadas', value: mockCompanies.length, icon: Building2, tone: 'text-cyan-100' },
        { label: 'Vehiculos en ruta', value: activeFleet, icon: Activity, tone: 'text-cyan-100' },
        { label: 'Incidencias activas', value: activeIncidents, icon: ShieldAlert, tone: 'text-amber-100' },
        { label: 'Rutas monitoreadas', value: 7, icon: RouteIcon, tone: 'text-cyan-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-4">
                {statCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <article key={card.label} className={shellCard}>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">{card.label}</p>
                                    <p className="mt-4 font-display text-4xl text-white">{card.value}</p>
                                </div>
                                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] ${card.tone}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className={`${shellCard} overflow-hidden`}>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Operacion en vivo</p>
                            <h2 className="mt-2 font-display text-3xl text-white">Flota, rutas e incidencias en una sola vista.</h2>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
                            <Radio className="h-4 w-4" />
                            Online
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/10 bg-[#091a2a] p-5">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:90px_90px] opacity-30" />
                            <svg viewBox="0 0 520 260" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                                <path d="M34 205C92 174 145 169 184 140C235 102 274 65 332 59C380 54 433 76 490 102" stroke="rgba(56,189,248,0.9)" strokeWidth="5" strokeLinecap="round" />
                                <path d="M67 231C120 230 170 216 224 188C275 162 329 154 380 174C420 189 454 210 494 228" stroke="rgba(250,204,21,0.9)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" />
                                <circle cx="184" cy="140" r="8" fill="#f8fafc" />
                                <circle cx="332" cy="59" r="8" fill="#f8fafc" />
                                <circle cx="380" cy="174" r="8" fill="#facc15" />
                            </svg>
                            <div className="relative z-10 flex h-full flex-col justify-between">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="rounded-2xl border border-white/[0.08] bg-[rgba(7,19,30,0.72)] px-4 py-3">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/[0.46]">Corredor critico</p>
                                        <p className="mt-2 font-display text-xl text-white">Centro - Norte</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-right">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/[0.46]">Riesgo</p>
                                        <p className="mt-2 text-sm text-white/[0.72]">Paraderos saturados</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-white/[0.08] bg-[#06111b] p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/[0.46]">Combis rastreadas</p>
                                        <p className="mt-3 font-display text-3xl text-white">18</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/[0.08] bg-[#06111b] p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/[0.46]">Alertas recientes</p>
                                        <p className="mt-3 font-display text-3xl text-white">04</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <article className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/[0.46]">Incidencias visibles</p>
                                <div className="mt-4 space-y-3">
                                    {mockIncidents.map((incident) => (
                                        <div key={incident.id} className="rounded-2xl border border-white/[0.08] bg-[#07111b] p-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="font-medium text-white">{incident.type}</p>
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${incident.status === 'Activo' ? 'bg-amber-300/[0.15] text-amber-100' : 'bg-emerald-400/[0.15] text-emerald-100'}`}>
                                                    {incident.status}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm text-white/[0.58]">{incident.location}</p>
                                            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/[0.42]">{incident.reportedAt}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <article className={shellCard}>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Estado por empresa</p>
                        <div className="mt-4 space-y-3">
                            {mockCompanies.map((company) => (
                                <div key={company.id} className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-medium text-white">{company.name}</p>
                                            <p className="mt-1 text-sm text-white/[0.56]">{company.fleetSize} combis registradas</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${company.status === 'Activa' ? 'bg-emerald-400/[0.15] text-emerald-100' : company.status === 'Pendiente' ? 'bg-amber-300/[0.15] text-amber-100' : 'bg-red-400/[0.15] text-red-100'}`}>
                                            {company.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className={shellCard}>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Resumen del dia</p>
                        <div className="mt-4 grid gap-3">
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex items-center gap-3 text-cyan-100">
                                    <Users className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Pasajeros proyectados</span>
                                </div>
                                <p className="mt-3 font-display text-3xl text-white">3,492</p>
                            </div>
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex items-center gap-3 text-cyan-100">
                                    <Ticket className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Tickets y flujo</span>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    El panel resume actividad del servicio sin tocar pagos complejos en esta etapa del MVP.
                                </p>
                            </div>
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex items-center gap-3 text-amber-100">
                                    <Clock3 className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Ventana critica</span>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    Hora punta entre 6:30 y 8:30. Requiere supervision de flota y soporte.
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}

function FeaturePlaceholder({ title, description, icon: Icon }) {
    return (
        <div className={`${shellCard} flex min-h-[18rem] flex-col items-start justify-between`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-cyan-400/10 text-cyan-100">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h2 className="font-display text-3xl text-white">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.64]">{description}</p>
            </div>
        </div>
    );
}

function SuperAdminDashboard() {
    return (
        <Routes>
            <Route path="/" element={<SuperAdminLayout />}>
                <Route index element={<GlobalDashboardHome />} />
                <Route path="empresas" element={<CompanyManagement />} />
                <Route
                    path="rutas"
                    element={
                        <FeaturePlaceholder
                            title="Route Builder"
                            description="Aqui se consolidara el trazado visual de rutas, paraderos oficiales y horarios operativos de cada empresa."
                            icon={RouteIcon}
                        />
                    }
                />
                <Route
                    path="moderacion"
                    element={
                        <FeaturePlaceholder
                            title="Moderacion social"
                            description="Espacio para revisar incidencias, comentarios y reportes enviados por la comunidad desde la app movil."
                            icon={ShieldAlert}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}

export default SuperAdminDashboard;
