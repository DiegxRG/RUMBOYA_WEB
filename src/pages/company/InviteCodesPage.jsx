import React, { useState, useEffect } from 'react';
import {
    Copy, Key, CheckCircle2, XCircle, Clock, Smartphone,
    Globe, Info, Users, Shield, BusFront
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

const shellCard = 'rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.76)] p-6 backdrop-blur-xl';

export default function InviteCodesPage() {
    const { companyDetails } = useAuth();
    const [approvedDrivers, setApprovedDrivers] = useState([]);
    const [rejectedDrivers, setRejectedDrivers] = useState([]);
    const [pendingDrivers, setPendingDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchAllDrivers = async () => {
            try {
                const [approvedRes, rejectedRes, pendingRes] = await Promise.all([
                    api.get('/api/empresas/me/conductores?estado=APROBADA'),
                    api.get('/api/empresas/me/conductores?estado=RECHAZADA'),
                    api.get('/api/empresas/me/conductores?estado=PENDIENTE'),
                ]);
                setApprovedDrivers(approvedRes.data || []);
                setRejectedDrivers(rejectedRes.data || []);
                setPendingDrivers(pendingRes.data || []);
            } catch (err) {
                console.error('Error fetching drivers', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllDrivers();
    }, []);

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

    return (
        <div className="space-y-6">
            {/* Hero header */}
            <div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/[0.72]">Vinculación de flota</p>
                <h2 className="mt-2 font-display text-4xl text-white">Código de sincronización de empresa.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                    El código de sincronización permite a tus choferes vincularse a tu empresa desde la app móvil.
                    Se genera automáticamente y tiene una duración de <span className="text-cyan-300 font-medium">24 horas</span>.
                </p>
            </div>

            {/* Main two-col layout */}
            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                {/* Sync code card */}
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
                            <div className="relative flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-900/10 px-6 py-8 mb-5">
                                <p className="font-display text-5xl tracking-[0.4em] text-white select-all">{syncCode}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${isCodeActive
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                        : 'bg-red-500/10 border-red-500/20 text-red-300'
                                    }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${isCodeActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                                    {isCodeActive ? 'Activo' : 'Caducado'}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-white/[0.5]">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Expira: {formatDate(codeExpiry)}</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all border ${copied
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                            : 'bg-white/[0.05] border-white/[0.08] text-white/[0.72] hover:bg-white/[0.1] hover:text-white'
                                        }`}
                                >
                                    {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                    {copied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <Key className="h-10 w-10 text-white/[0.2]" />
                            <p className="text-sm text-white/[0.5]">Tu empresa no tiene un código activo en este momento.</p>
                            <p className="text-xs text-white/[0.3]">El código se genera automáticamente al registrarse.</p>
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
                            {
                                icon: Smartphone,
                                color: 'text-cyan-400 bg-cyan-900/30 border-cyan-400/20',
                                title: 'App Móvil (Chofer)',
                                desc: 'En la app RumboYa, el chofer entra a Ajustes → Vincular empresa → ingresa el código y envía su solicitud.'
                            },
                            {
                                icon: Globe,
                                color: 'text-emerald-400 bg-emerald-900/30 border-emerald-400/20',
                                title: 'Panel Web (Empresa)',
                                desc: 'Recibes una notificación en el Resumen Operativo. Desde ahí puedes aprobar o rechazar cada solicitud.'
                            },
                            {
                                icon: Shield,
                                color: 'text-amber-400 bg-amber-900/30 border-amber-400/20',
                                title: 'Código de 24 horas',
                                desc: 'El código caduca automáticamente en 24 horas desde su generación para mantener la seguridad de la vinculación.'
                            },
                            {
                                icon: BusFront,
                                color: 'text-purple-400 bg-purple-900/30 border-purple-400/20',
                                title: 'Vinculación completada',
                                desc: 'Una vez aprobado, el chofer y su vehículo aparecen en tu sección "Flota y choferes" del panel web.'
                            }
                        ].map(({ icon: Icon, color, title, desc }) => (
                            <div key={title} className="flex items-start gap-3">
                                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{title}</p>
                                    <p className="text-xs leading-5 text-white/[0.5] mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Driver status lists */}
            <div className="grid gap-6 xl:grid-cols-3">
                {/* Pendientes */}
                <DriverStatusCard
                    title="Solicitudes pendientes"
                    icon={Clock}
                    iconColor="text-amber-400 bg-amber-900/30 border-amber-400/20"
                    drivers={pendingDrivers}
                    isLoading={isLoading}
                    badgeColor="bg-amber-500/10 border-amber-500/20 text-amber-300"
                    badgeLabel="Pendiente"
                    emptyMsg="No hay solicitudes pendientes."
                />
                {/* Aprobados */}
                <DriverStatusCard
                    title="Choferes aprobados"
                    icon={CheckCircle2}
                    iconColor="text-emerald-400 bg-emerald-900/30 border-emerald-400/20"
                    drivers={approvedDrivers}
                    isLoading={isLoading}
                    badgeColor="bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    badgeLabel="Aprobado"
                    emptyMsg="No hay choferes aprobados aún."
                />
                {/* Rechazados */}
                <DriverStatusCard
                    title="Choferes rechazados"
                    icon={XCircle}
                    iconColor="text-red-400 bg-red-900/30 border-red-400/20"
                    drivers={rejectedDrivers}
                    isLoading={isLoading}
                    badgeColor="bg-red-500/10 border-red-500/20 text-red-300"
                    badgeLabel="Rechazado"
                    emptyMsg="No hay choferes rechazados."
                />
            </div>
        </div>
    );
}

function DriverStatusCard({ title, icon: Icon, iconColor, drivers, isLoading, badgeColor, badgeLabel, emptyMsg }) {
    return (
        <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-6 py-5">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${iconColor}`}>
                    <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-white truncate">{title}</h3>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-xs text-white/[0.6]">
                    {isLoading ? '...' : drivers.length}
                </span>
            </div>

            <div className="divide-y divide-white/[0.06] max-h-72 overflow-y-auto">
                {isLoading ? (
                    <div className="px-6 py-8 text-center text-sm text-white/[0.4]">Cargando...</div>
                ) : drivers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                        <Users className="h-8 w-8 text-white/[0.15]" />
                        <p className="text-sm text-white/[0.4]">{emptyMsg}</p>
                    </div>
                ) : (
                    drivers.map((driver) => (
                        <div key={driver.id} className="flex items-center gap-3 px-5 py-4 hover:bg-white/[0.04] transition-colors">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.06] font-display text-sm text-white/[0.8]">
                                {(driver.user?.firstName?.[0] || '?').toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {driver.user?.firstName} {driver.user?.lastName}
                                </p>
                                <p className="text-xs text-white/[0.4] truncate">
                                    {driver.placaAuto ? `Placa: ${driver.placaAuto}` : driver.user?.email || 'Sin placa'}
                                </p>
                            </div>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${badgeColor}`}>
                                {badgeLabel}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
