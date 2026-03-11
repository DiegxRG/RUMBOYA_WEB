import React, { useState, useEffect, useCallback } from 'react';
import {
    Copy, Key, CheckCircle2, XCircle, Clock, Smartphone,
    Globe, Info, Users, Shield, BusFront,
    UserCheck, UserX, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

const shellCard = 'rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.76)] p-6 backdrop-blur-xl';
const PAGE_SIZE = 8;

export default function InviteCodesPage() {
    const { companyDetails } = useAuth();

    const [drivers, setDrivers] = useState({ approved: [], rejected: [], pending: [] });
    const [cobradores, setCobradores] = useState({ approved: [], rejected: [], pending: [] });

    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('choferes');
    const [statusFilter, setStatusFilter] = useState('PENDIENTE'); // PENDIENTE | APROBADA | RECHAZADA
    const [actionLoading, setActionLoading] = useState(null);
    const [page, setPage] = useState(0);

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        try {
            const [apDr, reDr, peDr, apCob, reCob, peCob] = await Promise.all([
                api.get('/api/empresas/me/conductores?estado=APROBADA'),
                api.get('/api/empresas/me/conductores?estado=RECHAZADA'),
                api.get('/api/empresas/me/conductores?estado=PENDIENTE'),
                api.get('/api/empresas/me/cobradores?estado=APROBADA').catch(() => ({ data: [] })),
                api.get('/api/empresas/me/cobradores?estado=RECHAZADA').catch(() => ({ data: [] })),
                api.get('/api/empresas/me/cobradores?estado=PENDIENTE').catch(() => ({ data: [] })),
            ]);
            setDrivers({ approved: apDr.data || [], rejected: reDr.data || [], pending: peDr.data || [] });
            setCobradores({ approved: apCob.data || [], rejected: reCob.data || [], pending: peCob.data || [] });
        } catch (err) {
            console.error('Error fetching staff data', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // Reset page when tab or filter changes
    useEffect(() => { setPage(0); }, [activeTab, statusFilter]);

    const syncCode = companyDetails?.codigoSincronizacion;
    const codeExpiry = companyDetails?.codigoExpiracion;
    const isCodeActive = syncCode && codeExpiry && new Date(codeExpiry) > new Date();

    const handleCopy = () => {
        if (syncCode) {
            navigator.clipboard.writeText(syncCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleString('es-PE', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    // Approbar/Rechazar conductor — PUT /me/conductores/{id}/sincronizacion?aprobar=true|false
    const handleDriverAction = async (driverId, aprobar) => {
        const key = `driver-${driverId}-${aprobar}`;
        setActionLoading(key);
        try {
            await api.put(`/api/empresas/me/conductores/${driverId}/sincronizacion?aprobar=${aprobar}`);
            await fetchAll();
        } catch (err) {
            console.error('Error actualizando conductor', err);
        } finally {
            setActionLoading(null);
        }
    };

    // Aprobar/Rechazar cobrador — PUT /me/cobradores/{id}/sincronizacion?aprobar=true|false
    const handleCobradorAction = async (cobradorId, aprobar) => {
        const key = `cobrador-${cobradorId}-${aprobar}`;
        setActionLoading(key);
        try {
            await api.put(`/api/empresas/me/cobradores/${cobradorId}/sincronizacion?aprobar=${aprobar}`);
            await fetchAll();
        } catch (err) {
            console.error('Error actualizando cobrador', err);
        } finally {
            setActionLoading(null);
        }
    };

    // Datos activos según tab + filtro
    const currentData = activeTab === 'choferes'
        ? (statusFilter === 'PENDIENTE' ? drivers.pending : statusFilter === 'APROBADA' ? drivers.approved : drivers.rejected)
        : (statusFilter === 'PENDIENTE' ? cobradores.pending : statusFilter === 'APROBADA' ? cobradores.approved : cobradores.rejected);

    const totalPages = Math.ceil(currentData.length / PAGE_SIZE);
    const pageData = currentData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const totalPending = drivers.pending.length + cobradores.pending.length;

    const statusConfig = {
        PENDIENTE: { label: 'Pendientes', color: 'amber', icon: Clock },
        APROBADA: { label: 'Aprobados', color: 'emerald', icon: CheckCircle2 },
        RECHAZADA: { label: 'Rechazados', color: 'red', icon: XCircle },
    };

    const colorMap = {
        amber: { tab: 'bg-amber-500/20 text-amber-300 border border-amber-500/20', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-300', dot: 'bg-amber-400' },
        emerald: { tab: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300', dot: 'bg-emerald-400' },
        red: { tab: 'bg-red-500/20 text-red-300 border border-red-500/20', badge: 'bg-red-500/10 border-red-500/20 text-red-300', dot: 'bg-red-400' },
    };

    return (
        <div className="space-y-6">
            {/* Hero header */}
            <div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/[0.72]">Vinculación de flota</p>
                <h2 className="mt-2 font-display text-4xl text-white">Código de sincronización de empresa.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                    El código de sincronización permite a tus choferes y cobradores vincularse a tu empresa desde la app móvil.
                    Se genera automáticamente y tiene una duración de <span className="text-cyan-300 font-medium">24 horas</span>.
                </p>
            </div>

            {/* Sync code + how it works */}
            <div className="grid gap-6 xl:grid-cols-2">
                {/* Sync code */}
                <div className={shellCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-900/30 border border-cyan-400/20 text-cyan-400">
                            <Key className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Código activo</p>
                            <h3 className="font-display text-xl text-white">Tu código de empresa</h3>
                        </div>
                    </div>
                    {syncCode ? (
                        <>
                            <div className="flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-900/10 px-6 py-8 mb-5">
                                <p className="font-display text-5xl tracking-[0.4em] text-white select-all">{syncCode}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${isCodeActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${isCodeActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                                    {isCodeActive ? 'Activo' : 'Caducado'}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-white/[0.5]">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Expira: {formatDate(codeExpiry)}</span>
                                </div>
                                <button onClick={handleCopy} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all border ${copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-white/[0.05] border-white/[0.08] text-white/[0.72] hover:bg-white/[0.1] hover:text-white'}`}>
                                    {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                    {copied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <Key className="h-10 w-10 text-white/[0.2]" />
                            <p className="text-sm text-white/[0.5]">Tu empresa no tiene un código activo en este momento.</p>
                        </div>
                    )}
                </div>

                {/* How it works */}
                <div className={shellCard}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-900/30 border border-amber-400/20 text-amber-400">
                            <Info className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Guía</p>
                            <h3 className="font-display text-xl text-white">¿Cómo funciona?</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { icon: Smartphone, color: 'text-cyan-400 bg-cyan-900/30 border-cyan-400/20', title: 'App Móvil', desc: 'El personal entra a Ajustes → Vincular empresa → ingresa el código y envía su solicitud.' },
                            { icon: Globe, color: 'text-emerald-400 bg-emerald-900/30 border-emerald-400/20', title: 'Panel Web (Empresa)', desc: 'Recibes la solicitud aquí. Puedes aprobarla o rechazarla desde el Resumen Operativo.' },
                            { icon: Shield, color: 'text-amber-400 bg-amber-900/30 border-amber-400/20', title: 'Código de 24 horas', desc: 'El código caduca automáticamente para mantener la seguridad de la vinculación.' },
                            { icon: BusFront, color: 'text-purple-400 bg-purple-900/30 border-purple-400/20', title: 'Vinculación completada', desc: 'Una vez aprobado, aparece en tu sección "Flota y Equipo" del panel web.' },
                        ].map(({ icon: Icon, color, title, desc }) => (
                            <div key={title} className="flex items-start gap-3">
                                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${color}`}><Icon className="h-4 w-4" /></div>
                                <div>
                                    <p className="text-sm font-medium text-white">{title}</p>
                                    <p className="text-xs leading-5 text-white/[0.5] mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Resumen Operativo ─────────────────────────────────────── */}
            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-900/30 border border-amber-400/20 text-amber-400">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Resumen Operativo</p>
                            <h3 className="font-display text-xl text-white flex items-center gap-2">
                                Solicitudes de vinculación
                                {totalPending > 0 && (
                                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-amber-500 text-[11px] font-bold text-black">
                                        {totalPending}
                                    </span>
                                )}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={fetchAll}
                        disabled={isLoading}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/[0.5] hover:text-white hover:bg-white/[0.08] transition-colors disabled:opacity-40"
                        title="Actualizar"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Tabs tipo / filtro estado — en una sola fila de controles */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-4 border-b border-white/[0.05] bg-white/[0.01]">
                    {/* Tab: Choferes / Cobradores */}
                    <div className="flex p-1 space-x-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
                        {['choferes', 'cobradores'].map((tab) => {
                            const pending = tab === 'choferes' ? drivers.pending.length : cobradores.pending.length;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] rounded-lg transition-all flex items-center gap-1.5 ${activeTab === tab
                                        ? tab === 'choferes' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20'
                                        : 'text-white/[0.5] hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    {tab === 'choferes' ? 'Choferes' : 'Cobradores'}
                                    {pending > 0 && (
                                        <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-amber-500/80 text-[10px] font-bold text-black">
                                            {pending}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Filtro de estado */}
                    <div className="flex p-1 space-x-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
                        {Object.entries(statusConfig).map(([key, { label, color, icon: Icon }]) => {
                            const c = colorMap[color];
                            const count = activeTab === 'choferes'
                                ? (key === 'PENDIENTE' ? drivers.pending : key === 'APROBADA' ? drivers.approved : drivers.rejected).length
                                : (key === 'PENDIENTE' ? cobradores.pending : key === 'APROBADA' ? cobradores.approved : cobradores.rejected).length;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setStatusFilter(key)}
                                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${statusFilter === key ? c.tab : 'text-white/[0.4] hover:text-white/[0.7] hover:bg-white/[0.04]'}`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {label}
                                    <span className="ml-0.5 text-[10px] opacity-70">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-white/[0.38]">
                            <tr>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">DNI</th>
                                <th className="px-6 py-3">{activeTab === 'choferes' ? 'Placa' : 'Código'}</th>
                                <th className="px-6 py-3">Estado</th>
                                {statusFilter === 'PENDIENTE' && <th className="px-6 py-3 text-right">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06]">
                            {isLoading ? (
                                <tr><td colSpan="5" className="px-6 py-10 text-center text-white/[0.4]">Cargando...</td></tr>
                            ) : pageData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users className="h-8 w-8 text-white/[0.1]" />
                                            <p className="text-sm text-white/[0.4]">
                                                No hay {activeTab} {statusConfig[statusFilter].label.toLowerCase()} en este momento.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pageData.map((item) => {
                                    const sc = statusConfig[statusFilter];
                                    const c = colorMap[sc.color];
                                    const isApproving = actionLoading === `${activeTab === 'choferes' ? 'driver' : 'cobrador'}-${item.id}-true`;
                                    const isRejecting = actionLoading === `${activeTab === 'choferes' ? 'driver' : 'cobrador'}-${item.id}-false`;
                                    const busy = isApproving || isRejecting;
                                    const subtitle = activeTab === 'choferes' ? item.placaAuto : item.codigoCobrador;

                                    return (
                                        <tr key={item.id} className="hover:bg-white/[0.03] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.06] font-display text-sm text-white/[0.8]">
                                                        {(item.user?.firstName?.[0] || '?').toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-white">
                                                        {item.user?.firstName} {item.user?.lastName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white/[0.6]">{item.dni || '—'}</td>
                                            <td className="px-6 py-4 font-mono text-cyan-200/80">{subtitle || '—'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${c.badge}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${c.dot} ${statusFilter === 'PENDIENTE' ? 'animate-pulse' : ''}`} />
                                                    {sc.label.replace(/s$/, '')}
                                                </span>
                                            </td>
                                            {statusFilter === 'PENDIENTE' && (
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => activeTab === 'choferes' ? handleDriverAction(item.id, true) : handleCobradorAction(item.id, true)}
                                                            disabled={busy}
                                                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-40"
                                                        >
                                                            {isApproving
                                                                ? <span className="h-3 w-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                                                : <UserCheck className="h-3.5 w-3.5" />
                                                            }
                                                            Aprobar
                                                        </button>
                                                        <button
                                                            onClick={() => activeTab === 'choferes' ? handleDriverAction(item.id, false) : handleCobradorAction(item.id, false)}
                                                            disabled={busy}
                                                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-40"
                                                        >
                                                            {isRejecting
                                                                ? <span className="h-3 w-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                                                                : <UserX className="h-3.5 w-3.5" />
                                                            }
                                                            Rechazar
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
                        <p className="text-xs text-white/[0.4]">
                            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, currentData.length)} de {currentData.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/[0.5] hover:text-white hover:bg-white/[0.08] disabled:opacity-30 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-xs text-white/[0.5]">Pág {page + 1} / {totalPages}</span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/[0.5] hover:text-white hover:bg-white/[0.08] disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
