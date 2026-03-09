import React from 'react';
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Building2,
    Clock3,
    KeyRound,
    Route as RouteIcon,
    ShieldCheck,
    Users,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockDrivers, mockFleet, mockIncidents, mockInviteCodes } from '../data/dummyData';
import FleetPage from './company/FleetPage';
import InviteCodesPage from './company/InviteCodesPage';

const shellCard =
    'rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.76)] p-6 backdrop-blur-xl';

function CompanyLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, companyDetails, logout } = useAuth();

    // Si logged user tiene un 'empresa' o 'razonSocial' lo pintamos
    const companyName = companyDetails?.razonSocial || user?.firstName || 'Mi Empresa';

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07121d] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(14,165,233,0.18),transparent_22%),radial-gradient(circle_at_86%_18%,rgba(250,204,21,0.16),transparent_22%),linear-gradient(160deg,#07111b_0%,#0b1827_48%,#050b13_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

            <div className="relative z-10 flex min-h-screen gap-6 px-5 py-5 md:px-6 lg:px-8">
                <aside className="hidden w-[18rem] shrink-0 flex-col rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.82)] p-5 backdrop-blur-xl md:flex">
                    <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.05] p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900 border border-cyan-400">
                            <span className="font-display text-lg text-cyan-200">{companyName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-display text-sm uppercase tracking-[0.16em] text-white truncate">{companyName}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-amber-100/[0.72]">Panel empresa</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col flex-1 space-y-2">
                        <Link
                            to="/company"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${isActive('/company')
                                    ? 'border border-amber-300/20 bg-amber-300/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                                }`}
                        >
                            <Building2 className="h-4 w-4" />
                            <span>Resumen operativo</span>
                        </Link>
                        <Link
                            to="/company/flota"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${isActive('/company/flota')
                                    ? 'border border-amber-300/20 bg-amber-300/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                                }`}
                        >
                            <Users className="h-4 w-4" />
                            <span>Flota y choferes</span>
                        </Link>
                        <Link
                            to="/company/codigos"
                            className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${isActive('/company/codigos')
                                    ? 'border border-amber-300/20 bg-amber-300/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                                }`}
                        >
                            <KeyRound className="h-4 w-4" />
                            <span>Códigos</span>
                        </Link>

                        <div className="mt-auto pt-6 border-t border-white/[0.08]">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium text-red-400/[0.8] hover:bg-red-500/10 hover:text-red-400 transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <div className="rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.62)] p-5 backdrop-blur-xl md:p-6 min-h-full">
                        <header className="flex flex-col gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-amber-100/[0.72]">Portal administrativo de empresa</p>
                                <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">Operación interna de flota y personal.</h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                                    Supervisa la actividad de tus combis, revisa solicitudes de choferes y organiza el
                                    flujo operativo conectado a la app móvil de RumboYa.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
                                <span className="rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-2 text-amber-100">Flota activa</span>
                                <span className="rounded-full border border-cyan-300/18 bg-cyan-400/10 px-3 py-2 text-cyan-100">Choferes y códigos</span>
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

function DashboardHome() {
    const activeFleet = mockFleet.filter((vehicle) => vehicle.status === 'En Ruta').length;
    const pendingDrivers = mockDrivers.filter((driver) => driver.status === 'Pendiente');
    const activeCodes = mockInviteCodes.filter((invite) => invite.status === 'Activo').length;
    const activeIncidents = mockIncidents.filter((incident) => incident.status === 'Activo').length;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-4">
                <article className={shellCard}>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Combis activas</p>
                    <p className="mt-4 font-display text-4xl text-white">{activeFleet}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Unidades transmitiendo actividad en la ruta.</p>
                </article>
                <article className={shellCard}>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Choferes registrados</p>
                    <p className="mt-4 font-display text-4xl text-white">{mockDrivers.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Operadores vinculados y listos para supervisión.</p>
                </article>
                <article className={shellCard}>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Solicitudes pendientes</p>
                    <p className="mt-4 font-display text-4xl text-white">{pendingDrivers.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Choferes que esperan aprobación con código de invitación.</p>
                </article>
                <article className={shellCard}>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Alertas del servicio</p>
                    <p className="mt-4 font-display text-4xl text-white">{activeIncidents}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Incidencias y desvío operativo que afectan la jornada.</p>
                </article>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <section className={shellCard}>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Actividad reciente</p>
                            <h2 className="mt-2 font-display text-3xl text-white">Choferes, códigos y estado de flota.</h2>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-amber-100">
                            <ShieldCheck className="h-4 w-4" />
                            Supervisado
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        {pendingDrivers.map((driver) => (
                            <div key={driver.id} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="font-medium text-white">{driver.name}</p>
                                        <p className="mt-1 text-sm text-white/[0.58]">
                                            Solicitud pendiente con código {driver.inviteCode}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.68]">
                                            Rechazar
                                        </button>
                                        <button className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#05111b]">
                                            Aprobar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {mockFleet.map((vehicle) => (
                            <div key={vehicle.id} className="rounded-[1.5rem] border border-white/[0.08] bg-[#07111b] p-4">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="font-medium text-white">Combi {vehicle.plate}</p>
                                        <p className="mt-1 text-sm text-white/[0.56]">Última actualización: {vehicle.lastUpdate}</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${vehicle.status === 'En Ruta' ? 'bg-emerald-400/[0.15] text-emerald-100' : vehicle.status === 'Detenida' ? 'bg-amber-300/[0.15] text-amber-100' : 'bg-red-400/[0.15] text-red-100'}`}>
                                        {vehicle.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <article className={shellCard}>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Códigos de invitación</p>
                        <p className="mt-3 font-display text-4xl text-white">{activeCodes}</p>
                        <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                            Códigos activos para vincular nuevos choferes desde la app móvil.
                        </p>

                        <div className="mt-5 space-y-3">
                            {mockInviteCodes.map((invite) => (
                                <div key={invite.code} className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-display text-xl text-white">{invite.code}</p>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${invite.status === 'Activo' ? 'bg-emerald-400/[0.15] text-emerald-100' : 'bg-white/[0.08] text-white/[0.68]'}`}>
                                            {invite.status}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-white/[0.58]">Generado el {invite.generatedAt}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className={shellCard}>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Contexto operativo</p>
                        <div className="mt-4 space-y-3">
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex items-center gap-3 text-amber-100">
                                    <RouteIcon className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Rutas asignadas</span>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    La empresa administra rutas, horarios y paraderos desde el panel web.
                                </p>
                            </div>
                            <div className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-4">
                                <div className="flex items-center gap-3 text-cyan-100">
                                    <Clock3 className="h-4 w-4" />
                                    <span className="text-xs uppercase tracking-[0.2em]">Jornada crítica</span>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                                    Hora punta y soporte a incidencias requieren coordinación entre flota y soporte.
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}

function CompanyAdminDashboard() {
    return (
        <Routes>
            <Route path="/" element={<CompanyLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="flota" element={<FleetPage />} />
                <Route path="codigos" element={<InviteCodesPage />} />
            </Route>
        </Routes>
    );
}

export default CompanyAdminDashboard;

