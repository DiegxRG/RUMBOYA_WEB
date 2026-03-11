import React from 'react';
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Building2,
    KeyRound,
    LogOut,
    BusFront,
    UserCheck,
    Clock,
    Bell,
    Users,
    ShieldCheck,
    X
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import FleetPage from './company/FleetPage';
import InviteCodesPage from './company/InviteCodesPage';
import CompanyProfilePage from './company/CompanyProfilePage';
import api from '../api/axiosConfig';

const shellCard =
    'rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.76)] p-6 backdrop-blur-xl';

// Configuración de rutas para el header dinámico
const routeConfig = {
    '/company': {
        label: 'Portal administrativo de empresa',
        title: 'Operación interna de flota y personal.',
        subtitle: 'Supervisa la actividad de tus combis, revisa solicitudes de choferes y cobradores, y organiza el flujo operativo.',
        actions: [
            { label: 'Flota activa', style: 'amber', to: '/company/flota' },
            { label: 'Choferes y códigos', style: 'cyan', to: '/company/codigos' },
        ],
    },
    '/company/flota': {
        label: 'Gestión de flota',
        title: 'Flota y personal operativo.',
        subtitle: 'Choferes activos, cobradores y unidades de la empresa. Supervisa asignaciones y estado actual.',
        actions: [
            { label: 'Resumen', style: 'amber', to: '/company' },
            { label: 'Vincular personal', style: 'cyan', to: '/company/codigos' },
        ],
    },
    '/company/codigos': {
        label: 'Vinculación de flota',
        title: 'Solicitudes y códigos.',
        subtitle: 'Aprueba o rechaza solicitudes de choferes y cobradores. Gestiona los códigos de sincronización.',
        actions: [
            { label: 'Ver flota', style: 'amber', to: '/company/flota' },
            { label: 'Resumen', style: 'cyan', to: '/company' },
        ],
    },
    '/company/perfil': {
        label: 'Ajustes de cuenta',
        title: 'Perfil de empresa.',
        subtitle: 'Información registrada, código de sincronización y datos de acceso al panel.',
        actions: [
            { label: 'Resumen', style: 'amber', to: '/company' },
            { label: 'Ver flota', style: 'cyan', to: '/company/flota' },
        ],
    },
};

// Badge estático (solo muestra info, no navega)
const BadgePill = ({ label, style }) => {
    const styles = {
        amber: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
        cyan: 'border-cyan-300/25 bg-cyan-400/10 text-cyan-100',
    };
    return (
        <span className={`hidden sm:inline-flex items-center rounded-full border px-3 py-2 text-xs uppercase tracking-[0.2em] ${styles[style]}`}>
            {label}
        </span>
    );
};

function CompanyLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, companyDetails, logout } = useAuth();
    const [pendingCount, setPendingCount] = React.useState(0);
    const [hasUnread, setHasUnread] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);

    const showNotification = (title, message, isWarning = false) => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[rgba(10,24,40,0.95)] shadow-[0_24px_50px_rgba(0,0,0,0.4)] rounded-2xl pointer-events-auto flex ring-1 ring-white/[0.1] backdrop-blur-xl border border-white/[0.08] p-4`}>
                <div className="flex-1 w-0">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isWarning ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`}>
                                <Bell className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-white">{title}</p>
                            <p className="mt-1 text-sm leading-5 text-white/[0.6]">{message}</p>
                        </div>
                    </div>
                </div>
                <div className="ml-4 flex flex-shrink-0 items-center">
                    <button onClick={() => toast.dismiss(t.id)} className="inline-flex rounded-full p-1.5 text-white/[0.4] hover:bg-white/[0.08] hover:text-white transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        ), { id: title, duration: 5000 });
    };

    React.useEffect(() => {
        let isMounted = true;
        let prevDriverCount = -1;
        let prevCobradorCount = -1;
        let isFirstFetch = true;

        const checkPendingRequests = async () => {
            try {
                const [driversRes, cobradoresRes] = await Promise.all([
                    api.get('/api/empresas/me/conductores?estado=PENDIENTE'),
                    api.get('/api/empresas/me/cobradores?estado=PENDIENTE').catch(() => ({ data: [] })),
                ]);
                if (!isMounted) return;

                const driverCount = driversRes.data?.length || 0;
                const cobradorCount = cobradoresRes.data?.length || 0;
                const total = driverCount + cobradorCount;

                if (isFirstFetch) {
                    if (total > 0) {
                        const parts = [];
                        if (driverCount > 0) parts.push(`${driverCount} chofer${driverCount > 1 ? 'es' : ''}`);
                        if (cobradorCount > 0) parts.push(`${cobradorCount} cobrador${cobradorCount > 1 ? 'es' : ''}`);
                        showNotification('Solicitudes en espera', `Tienes solicitudes pendientes de: ${parts.join(' y ')}.`, true);
                        setHasUnread(true);
                    }
                    isFirstFetch = false;
                } else {
                    if (driverCount > prevDriverCount && prevDriverCount >= 0) {
                        showNotification('Nuevo chofer', 'Un chofer acaba de enviar una solicitud para unirse a tu flota.', false);
                        setHasUnread(true);
                    }
                    if (cobradorCount > prevCobradorCount && prevCobradorCount >= 0) {
                        showNotification('Nuevo cobrador', 'Un cobrador acaba de enviar una solicitud para unirse a tu flota.', false);
                        setHasUnread(true);
                    }
                    if (total === 0) setHasUnread(false);
                }

                prevDriverCount = driverCount;
                prevCobradorCount = cobradorCount;
                setPendingCount(total);
            } catch (error) {
                console.error("Error polling requests", error);
            }
        };

        checkPendingRequests();
        const interval = setInterval(checkPendingRequests, 15000);
        return () => { isMounted = false; clearInterval(interval); };
    }, []);

    const companyName = companyDetails?.razonSocial || user?.firstName || 'Mi Empresa';
    const isActive = (path) => location.pathname === path;
    const handleLogout = () => { logout(); navigate('/login'); };

    const currentRoute = routeConfig[location.pathname] || routeConfig['/company'];
    const isHome = location.pathname === '/company';

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07121d] text-white">
            <Toaster position="top-right" toastOptions={{ style: { background: 'rgba(8,19,32,0.9)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' } }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(14,165,233,0.18),transparent_22%),radial-gradient(circle_at_86%_18%,rgba(250,204,21,0.16),transparent_22%),linear-gradient(160deg,#07111b_0%,#0b1827_48%,#050b13_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

            <div className="relative z-10 flex min-h-screen gap-6 px-5 py-5 md:px-6 lg:px-8">
                {/* Sidebar */}
                <aside className="hidden w-[18rem] shrink-0 flex-col rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.82)] p-5 backdrop-blur-xl md:flex">
                    <Link to="/company/perfil" className="group flex items-center gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08] hover:border-cyan-400/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900 border border-cyan-400/50 transition-colors group-hover:border-cyan-400">
                            <span className="font-display text-lg text-cyan-200">{companyName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-display text-sm uppercase tracking-[0.16em] text-white truncate group-hover:text-cyan-100 transition-colors">{companyName}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/[0.72] group-hover:text-cyan-300 transition-colors">Ver Perfil</p>
                        </div>
                    </Link>

                    <div className="mt-6 flex flex-col flex-1 space-y-2">
                        {[
                            { to: '/company', label: 'Resumen operativo', icon: Building2 },
                            { to: '/company/flota', label: 'Flota y choferes', icon: Users },
                            { to: '/company/codigos', label: 'Códigos y solicitudes', icon: KeyRound },
                        ].map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-all ${isActive(to)
                                    ? 'border border-amber-300/20 bg-amber-300/10 text-white'
                                    : 'text-white/[0.62] hover:bg-white/[0.05] hover:text-white'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </Link>
                        ))}

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

                        {/* ── Header — mismo recuadro en todas las vistas ── */}
                        <header className="flex flex-col gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.05] px-5 py-4 lg:flex-row lg:items-center lg:justify-between mb-6">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-amber-100/[0.72]">{currentRoute.label}</p>
                                <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">{currentRoute.title}</h1>
                                {isHome && (
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">{currentRoute.subtitle}</p>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                {/* Campana */}
                                <button
                                    onClick={() => setHasUnread(false)}
                                    title="Notificaciones"
                                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] hover:bg-white/[0.1] transition-colors group"
                                >
                                    <Bell className="h-4 w-4 text-white/[0.7] group-hover:text-white" />
                                    {hasUnread && pendingCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                </button>
                                {/* Badges estáticos informativos */}
                                {currentRoute.actions.map(({ label, style }) => (
                                    <BadgePill key={label} label={label} style={style} />
                                ))}
                            </div>
                        </header>

                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

function DashboardHome() {
    const { companyDetails } = useAuth();
    const [pendingDrivers, setPendingDrivers] = React.useState([]);
    const [pendingCobradores, setPendingCobradores] = React.useState([]);
    const [activeDrivers, setActiveDrivers] = React.useState([]);
    const [activeCobradores, setActiveCobradores] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [actionLoading, setActionLoading] = React.useState(null);

    const activeFleet = activeDrivers.filter(v => v.placaAuto).length;
    const activeCodes = companyDetails?.codigoSincronizacion ? 1 : 0;
    const totalPending = pendingDrivers.length + pendingCobradores.length;
    const isNewAdmin = !isLoading && activeDrivers.length === 0 && activeCobradores.length === 0;

    const fetchRequests = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const [pendingDr, approvedDr, pendingCob, approvedCob] = await Promise.all([
                api.get('/api/empresas/me/conductores?estado=PENDIENTE'),
                api.get('/api/empresas/me/conductores?estado=APROBADA'),
                api.get('/api/empresas/me/cobradores?estado=PENDIENTE').catch(() => ({ data: [] })),
                api.get('/api/empresas/me/cobradores?estado=APROBADA').catch(() => ({ data: [] })),
            ]);
            setPendingDrivers(pendingDr.data || []);
            setActiveDrivers(approvedDr.data || []);
            setPendingCobradores(pendingCob.data || []);
            setActiveCobradores(approvedCob.data || []);
        } catch (error) {
            console.error("Error fetching requests", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const handleDriverAction = async (id, aprobar) => {
        setActionLoading(`driver-${id}`);
        try {
            await api.put(`/api/empresas/me/conductores/${id}/sincronizacion?aprobar=${aprobar}`);
            fetchRequests();
        } catch (err) {
            console.error("Error en acción de conductor", err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleCobradorAction = async (id, aprobar) => {
        setActionLoading(`cobrador-${id}`);
        try {
            await api.put(`/api/empresas/me/cobradores/${id}/sincronizacion?aprobar=${aprobar}`);
            fetchRequests();
        } catch (err) {
            console.error("Error en acción de cobrador", err);
        } finally {
            setActionLoading(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                <p className="font-display text-lg tracking-wide text-white/[0.6]">Cargando tu operación...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* KPIs */}
            <div className="grid gap-4 xl:grid-cols-4">
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Combis activas</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-900/30 border border-cyan-400/20 text-cyan-400"><BusFront className="h-5 w-5" /></div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeFleet}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Unidades transmitiendo actividad en la ruta.</p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Choferes registrados</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900/30 border border-emerald-400/20 text-emerald-400"><UserCheck className="h-5 w-5" /></div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeDrivers.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Operadores vinculados y listos para supervisión.</p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Solicitudes pendientes</p>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${totalPending > 0 ? 'bg-amber-900/30 border border-amber-400/20 text-amber-400' : 'bg-white/[0.04] border border-white/[0.08] text-white/[0.4]'}`}>
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>
                    <p className={`font-display text-4xl ${totalPending > 0 ? 'text-amber-300' : 'text-white'}`}>{totalPending}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">
                        {pendingDrivers.length > 0 && `${pendingDrivers.length} chofer${pendingDrivers.length > 1 ? 'es' : ''}`}
                        {pendingDrivers.length > 0 && pendingCobradores.length > 0 && ' · '}
                        {pendingCobradores.length > 0 && `${pendingCobradores.length} cobrador${pendingCobradores.length > 1 ? 'es' : ''}`}
                        {totalPending === 0 && 'Sin solicitudes pendientes.'}
                    </p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Cobradores activos</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-900/30 border border-purple-400/20 text-purple-400"><Users className="h-5 w-5" /></div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeCobradores.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Cobradores vinculados y operando con la flota.</p>
                </article>
            </div>

            {/* Banner onboarding — solo para admin sin personal aún */}
            {isNewAdmin && (
                <div className="rounded-[1.6rem] border border-amber-300/20 bg-amber-300/[0.06] p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-300/70">Primeros pasos</p>
                            <p className="mt-2 font-display text-xl text-white">Vincula tu primer chofer en 3 pasos.</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs">
                            {[
                                { n: '1', label: 'Comparte el código de la empresa' },
                                { n: '2', label: 'El chofer solicita desde la app' },
                                { n: '3', label: 'Aprueba aquí en Solicitudes' },
                            ].map(({ n, label }) => (
                                <div key={n} className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-white/70">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-300/20 text-[10px] font-bold text-amber-200">{n}</span>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                {/* Actividad reciente */}
                <section className={shellCard}>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Actividad reciente</p>
                            <h2 className="mt-2 font-display text-2xl text-white">Choferes, cobradores y estado de flota.</h2>
                        </div>
                        <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-amber-100 shrink-0">
                            <ShieldCheck className="h-4 w-4" />
                            Supervisado
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        {totalPending === 0 && (
                            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] p-8 text-center">
                                <p className="text-sm text-white/[0.5]">No hay solicitudes pendientes en este momento.</p>
                            </div>
                        )}

                        {/* Pendientes — Choferes */}
                        {pendingDrivers.length > 0 && (
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/70 mb-2 px-1">Choferes • Pendientes</p>
                                {pendingDrivers.map((driver) => (
                                    <PendingCard
                                        key={`dr-${driver.id}`}
                                        name={`${driver.user?.firstName} ${driver.user?.lastName}`}
                                        sub={driver.codigoConductor}
                                        detail={driver.placaAuto ? `Placa: ${driver.placaAuto}` : driver.user?.email}
                                        isLoading={actionLoading === `driver-${driver.id}`}
                                        onApprove={() => handleDriverAction(driver.id, true)}
                                        onReject={() => handleDriverAction(driver.id, false)}
                                        color="cyan"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pendientes — Cobradores */}
                        {pendingCobradores.length > 0 && (
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/70 mb-2 px-1">Cobradores • Pendientes</p>
                                {pendingCobradores.map((cob) => (
                                    <PendingCard
                                        key={`cob-${cob.id}`}
                                        name={`${cob.user?.firstName} ${cob.user?.lastName}`}
                                        sub={cob.codigoCobrador}
                                        detail={`DNI: ${cob.dni || '—'}`}
                                        isLoading={actionLoading === `cobrador-${cob.id}`}
                                        onApprove={() => handleCobradorAction(cob.id, true)}
                                        onReject={() => handleCobradorAction(cob.id, false)}
                                        color="purple"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Combis activas */}
                        {activeDrivers.filter(d => d.placaAuto).slice(0, 4).map((driver) => (
                            <div key={driver.id} className="rounded-[1.5rem] border border-white/[0.08] bg-[#07111b] p-4">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="font-medium text-white">Combi {driver.placaAuto}</p>
                                        <p className="mt-1 text-sm text-white/[0.56] flex items-center gap-2">
                                            <span>Conductor: {driver.user?.firstName} {driver.user?.lastName}</span>
                                            {driver.ruta && <span className="px-2 py-0.5 rounded bg-white/[0.05] text-xs truncate max-w-[200px]">{driver.ruta}</span>}
                                        </p>
                                    </div>
                                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-400/[0.15] text-emerald-100">En Ruta</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sidebar derecho — solo código de sincronización */}
                <section>
                    <article className={shellCard}>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Código de vinculación</p>
                        <p className="mt-3 text-sm text-white/[0.58]">Comparte este código con choferes y cobradores para que puedan solicitar unirse desde la app.</p>
                        <div className="mt-5">
                            {companyDetails?.codigoSincronizacion ? (
                                <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-900/10 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-display text-2xl text-white tracking-widest">{companyDetails.codigoSincronizacion}</p>
                                        <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-400/[0.15] text-emerald-100">Activo</span>
                                    </div>
                                    <p className="mt-2 text-xs text-white/[0.45]">Válido hasta {new Date(companyDetails.codigoExpiracion || new Date()).toLocaleString()}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-white/[0.5]">No hay código activo. Ve a tu perfil para generarlo.</p>
                            )}
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}

/* Tarjeta de solicitud pendiente reutilizable */
function PendingCard({ name, sub, detail, isLoading, onApprove, onReject, color }) {
    const borderColor = color === 'purple' ? 'border-purple-400/20 bg-purple-900/10' : 'border-cyan-400/20 bg-cyan-900/10';
    return (
        <div className={`rounded-[1.5rem] border ${borderColor} p-4 relative overflow-hidden mb-2`}>
            {isLoading && (
                <div className="absolute inset-0 bg-[#07111b]/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
                </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white/[0.58]">
                        {sub && <span className="inline-block bg-white/[0.1] px-2 py-0.5 rounded text-xs">{sub}</span>}
                        {detail && <span className="text-white/[0.5]">{detail}</span>}
                    </p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={onReject} disabled={isLoading} className="rounded-full border border-red-400/30 bg-red-400/10 hover:bg-red-400/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-200 transition-colors disabled:opacity-50">
                        Rechazar
                    </button>
                    <button onClick={onApprove} disabled={isLoading} className="rounded-full border border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400 hover:text-emerald-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 transition-colors disabled:opacity-50">
                        Aprobar
                    </button>
                </div>
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
                <Route path="perfil" element={<CompanyProfilePage />} />
            </Route>
        </Routes>
    );
}

export default CompanyAdminDashboard;
