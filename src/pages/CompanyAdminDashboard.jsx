import React from 'react';
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Building2,
    Clock3,
    KeyRound,
    Route as RouteIcon,
    LogOut,
    BusFront,
    UserCheck,
    Clock,
    AlertTriangle,
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

function CompanyLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, companyDetails, logout } = useAuth();
    const [pendingCount, setPendingCount] = React.useState(0);
    const [hasUnread, setHasUnread] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);

    const showNotification = (title, message, isWarning = false) => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-sm w-full bg-[rgba(10,24,40,0.95)] shadow-[0_24px_50px_rgba(0,0,0,0.4)] rounded-2xl pointer-events-auto flex ring-1 ring-white/[0.1] backdrop-blur-xl border border-white/[0.08] p-4`}
            >
                <div className="flex-1 w-0">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isWarning ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`}>
                                <Bell className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-white">
                                {title}
                            </p>
                            <p className="mt-1 text-sm leading-5 text-white/[0.6]">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-4 flex flex-shrink-0 items-center">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="inline-flex rounded-full p-1.5 text-white/[0.4] hover:bg-white/[0.08] hover:text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        ), {
            id: title, // Usar el titulo como ID previene duplicados (ej. en StrictMode)
            duration: 5000,
        });
    };

    React.useEffect(() => {
        let isMounted = true;
        const checkPendingRequests = async () => {
            try {
                const res = await api.get('/api/empresas/me/conductores?estado=PENDIENTE');
                const newCount = res.data?.length || 0;

                if (isMounted) {
                    setPendingCount(prev => {
                        if (initialLoad) {
                            if (newCount > 0) {
                                showNotification(
                                    'Solicitudes en espera',
                                    `Tienes ${newCount} ${newCount === 1 ? 'solicitud' : 'solicitudes'} pendiente${newCount === 1 ? '' : 's'} por revisar.`,
                                    true
                                );
                                setHasUnread(true);
                            }
                        } else {
                            if (newCount > prev) {
                                showNotification(
                                    'Nueva solicitud recibida',
                                    'Un chofer acaba de enviar una solicitud para unirse a tu flota.',
                                    false
                                );
                                setHasUnread(true);
                            } else if (newCount === 0) {
                                setHasUnread(false);
                            }
                        }
                        return newCount;
                    });
                    setInitialLoad(false);
                }
            } catch (error) {
                console.error("Error polling requests", error);
            }
        };

        checkPendingRequests();
        // Poll every 15 seconds
        const interval = setInterval(checkPendingRequests, 15000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [initialLoad]);

    // Si logged user tiene un 'empresa' o 'razonSocial' lo pintamos
    const companyName = companyDetails?.razonSocial || user?.firstName || 'Mi Empresa';

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07121d] text-white">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'rgba(8,19,32,0.9)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)'
                    }
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(14,165,233,0.18),transparent_22%),radial-gradient(circle_at_86%_18%,rgba(250,204,21,0.16),transparent_22%),linear-gradient(160deg,#07111b_0%,#0b1827_48%,#050b13_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

            <div className="relative z-10 flex min-h-screen gap-6 px-5 py-5 md:px-6 lg:px-8">
                <aside className="hidden w-[18rem] shrink-0 flex-col rounded-[2rem] border border-white/[0.08] bg-[rgba(6,17,27,0.82)] p-5 backdrop-blur-xl md:flex">
                    <Link
                        to="/company/perfil"
                        className="group flex items-center gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08] hover:border-cyan-400/30"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900 border border-cyan-400/50 transition-colors group-hover:border-cyan-400">
                            <span className="font-display text-lg text-cyan-200">{companyName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-display text-sm uppercase tracking-[0.16em] text-white truncate group-hover:text-cyan-100 transition-colors">{companyName}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/[0.72] group-hover:text-cyan-300 transition-colors">Ver Perfil</p>
                        </div>
                    </Link>

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

                            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
                                <button
                                    onClick={() => setHasUnread(false)}
                                    title="Notificaciones"
                                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] hover:bg-white/[0.1] transition-colors group"
                                >
                                    <Bell className="h-4 w-4 text-white/[0.7] group-hover:text-white" />
                                    {hasUnread && pendingCount > 0 && (
                                        <span className="absolute top-2 right-2.5 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                </button>
                                <span className="rounded-full border border-amber-300/18 bg-amber-300/10 px-3 py-2 text-amber-100 hidden sm:inline-block">Flota activa</span>
                                <span className="rounded-full border border-cyan-300/18 bg-cyan-400/10 px-3 py-2 text-cyan-100 hidden sm:inline-block">Choferes y códigos</span>
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
    const { companyDetails } = useAuth();
    const [pendingConductores, setPendingConductores] = React.useState([]);
    const [activeConductores, setActiveConductores] = React.useState([]);
    const [isLoadingRequests, setIsLoadingRequests] = React.useState(true);
    const [actionLoading, setActionLoading] = React.useState(null);

    const activeFleet = activeConductores.filter(v => v.placaAuto).length;
    const activeCodes = companyDetails?.codigoSincronizacion ? 1 : 0;
    const activeIncidents = 0; // Temporarily 0 until incidents API is available

    const fetchRequests = async () => {
        try {
            setIsLoadingRequests(true);
            const [pendingRes, approvedRes] = await Promise.all([
                api.get('/api/empresas/me/conductores?estado=PENDIENTE'),
                api.get('/api/empresas/me/conductores?estado=APROBADA')
            ]);
            setPendingConductores(pendingRes.data || []);
            setActiveConductores(approvedRes.data || []);
        } catch (error) {
            console.error("Error fetching requests", error);
        } finally {
            setIsLoadingRequests(false);
        }
    };

    React.useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (conductorId, aprobar) => {
        try {
            setActionLoading(conductorId);
            await api.put(`/api/empresas/me/conductores/${conductorId}/sincronizacion?aprobar=${aprobar}`);
            // Recargar la lista después de la acción
            fetchRequests();
        } catch (error) {
            console.error("Error resolviendo la solicitud", error);
            alert("No se pudo procesar la solicitud. Intenta de nuevo.");
        } finally {
            setActionLoading(null);
        }
    };

    if (isLoadingRequests) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                <p className="font-display text-lg tracking-wide text-white/[0.6]">Cargando tu operación...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-4">
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Combis activas</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-900/30 border border-cyan-400/20 text-cyan-400">
                            <BusFront className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeFleet}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Unidades transmitiendo actividad en la ruta.</p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Choferes registrados</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900/30 border border-emerald-400/20 text-emerald-400">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeConductores.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Operadores vinculados y listos para supervisión.</p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Solicitudes pendientes</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-900/30 border border-amber-400/20 text-amber-400">
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="font-display text-4xl text-white">{pendingConductores.length}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">Choferes esperando sincronizar con tu flota.</p>
                </article>
                <article className={shellCard}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Alertas del servicio</p>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-900/30 border border-red-400/20 text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="font-display text-4xl text-white">{activeIncidents}</p>
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
                        {isLoadingRequests ? (
                            <p className="text-sm text-white/[0.5] py-4 text-center">Cargando solicitudes...</p>
                        ) : pendingConductores.length === 0 ? (
                            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] p-8 text-center">
                                <p className="text-sm text-white/[0.5]">No hay solicitudes pendientes en este momento.</p>
                            </div>
                        ) : (
                            pendingConductores.map((driver) => (
                                <div key={driver.id} className="rounded-[1.5rem] border border-cyan-400/20 bg-cyan-900/10 p-4 relative overflow-hidden">
                                    {actionLoading === driver.id && (
                                        <div className="absolute inset-0 bg-[#07111b]/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                            <div className="h-5 w-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <p className="font-medium text-white">{driver.user?.firstName} {driver.user?.lastName}</p>
                                            <p className="mt-1 flex items-center gap-2 text-sm text-white/[0.58]">
                                                <span className="inline-block bg-white/[0.1] px-2 py-0.5 rounded text-xs">{driver.codigoConductor}</span>
                                                • Placa: <span className="text-cyan-200">{driver.placaAuto}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => handleAction(driver.id, false)}
                                                disabled={actionLoading === driver.id}
                                                className="rounded-full border border-red-400/30 bg-red-400/10 hover:bg-red-400/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-200 transition-colors disabled:opacity-50"
                                            >
                                                Rechazar
                                            </button>
                                            <button
                                                onClick={() => handleAction(driver.id, true)}
                                                disabled={actionLoading === driver.id}
                                                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400 hover:text-emerald-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 transition-colors disabled:opacity-50"
                                            >
                                                Aprobar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {activeConductores.filter(d => d.placaAuto).map((driver) => (
                            <div key={driver.id} className="rounded-[1.5rem] border border-white/[0.08] bg-[#07111b] p-4">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="font-medium text-white">Combi {driver.placaAuto}</p>
                                        <p className="mt-1 text-sm text-white/[0.56] flex items-center gap-2">
                                            <span>Conductor: {driver.user?.firstName} {driver.user?.lastName}</span>
                                            {driver.ruta && <span className="px-2 py-0.5 rounded bg-white/[0.05] text-xs truncate max-w-[200px]">{driver.ruta}</span>}
                                        </p>
                                    </div>
                                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-400/[0.15] text-emerald-100">
                                        En Ruta
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
                            {companyDetails?.codigoSincronizacion ? (
                                <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-900/10 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-display text-xl text-white">{companyDetails.codigoSincronizacion}</p>
                                        <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-400/[0.15] text-emerald-100">
                                            Activo
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-white/[0.58]">Válido hasta {new Date(companyDetails.codigoExpiracion || new Date()).toLocaleString()}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-white/[0.5]">No se encontró un código de invitación activo.</p>
                            )}
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
                <Route path="perfil" element={<CompanyProfilePage />} />
            </Route>
        </Routes>
    );
}

export default CompanyAdminDashboard;

