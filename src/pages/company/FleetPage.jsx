import React, { useState, useEffect } from 'react';
import { X, User, Navigation, KeyRound, ShieldCheck, Users, BusFront, AlertTriangle, CarFront, CheckCircle2 } from 'lucide-react';
import api from '../../api/axiosConfig';

export default function FleetPage() {
    const [activeDrivers, setActiveDrivers] = useState([]);
    const [activeCobradores, setActiveCobradores] = useState([]);
    const [pendingCobradores, setPendingCobradores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedCobrador, setSelectedCobrador] = useState(null);
    const [activeTab, setActiveTab] = useState('choferes'); // 'choferes' or 'cobradores'

    // Modal de desvinculación
    const [unlinkTarget, setUnlinkTarget] = useState(null); // { id, type: 'driver' | 'cobrador', name }

    useEffect(() => {
        const fetchStaff = async () => {
            setIsLoading(true);
            try {
                // Fetch approved drivers + approved cobradores + pending cobradores
                const [driversRes, cobradoresRes, pendingCobRes] = await Promise.all([
                    api.get('/api/empresas/me/conductores?estado=APROBADA'),
                    api.get('/api/empresas/me/cobradores?estado=APROBADA'),
                    api.get('/api/empresas/me/cobradores?estado=PENDIENTE').catch(() => ({ data: [] }))
                ]);
                setActiveDrivers(driversRes.data || []);
                setActiveCobradores(cobradoresRes.data || []);
                setPendingCobradores(pendingCobRes.data || []);
            } catch (error) {
                console.error("Error fetching staff data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const requestUnlinkDriver = (driver) => {
        setUnlinkTarget({
            id: driver.id,
            type: 'driver',
            name: `${driver.user?.firstName || ''} ${driver.user?.lastName || ''}`.trim()
        });
    };

    const requestUnlinkCobrador = (cobrador) => {
        setUnlinkTarget({
            id: cobrador.id,
            type: 'cobrador',
            name: `${cobrador.user?.firstName || ''} ${cobrador.user?.lastName || ''}`.trim()
        });
    };

    const handleConfirmUnlink = async () => {
        if (!unlinkTarget) return;

        try {
            if (unlinkTarget.type === 'driver') {
                await api.delete(`/api/empresas/me/conductores/${unlinkTarget.id}`);
                setActiveDrivers(activeDrivers.filter(d => d.id !== unlinkTarget.id));
                if (selectedDriver?.id === unlinkTarget.id) setSelectedDriver(null);
            } else {
                await api.delete(`/api/empresas/me/cobradores/${unlinkTarget.id}`);
                setActiveCobradores(activeCobradores.filter(c => c.id !== unlinkTarget.id));
                if (selectedCobrador?.id === unlinkTarget.id) setSelectedCobrador(null);
            }
        } catch (error) {
            console.error(`Error unlinking ${unlinkTarget.type}`, error);
            alert(`Error al intentar desvincular al ${unlinkTarget.type === 'driver' ? 'chofer' : 'cobrador'}.`);
        } finally {
            setUnlinkTarget(null);
        }
    };

    // --- Lógica del Vehículo SVG ---
    const mapColorToHex = (colorName) => {
        if (!colorName) return '#94a3b8'; // slate-400 por defecto
        const normalized = colorName.toLowerCase().trim();
        if (normalized.includes('rojo')) return '#ef4444'; // red-500
        if (normalized.includes('azul')) return '#3b82f6'; // blue-500
        if (normalized.includes('blanco')) return '#f8fafc'; // slate-50 (visible on dark)
        if (normalized.includes('negro')) return '#64748b'; // slate-500 (para que no se pierda en el fondo)
        if (normalized.includes('plata') || normalized.includes('gris')) return '#cbd5e1'; // slate-300
        if (normalized.includes('amarillo')) return '#eab308'; // yellow-500
        if (normalized.includes('verde')) return '#22c55e'; // green-500
        if (normalized.includes('naranja')) return '#f97316'; // orange-500
        return '#94a3b8';
    };

    const determineVehicleType = (modelName) => {
        if (!modelName) return 'van';
        const normalized = modelName.toLowerCase();
        const autoKeywords = ['yaris', 'rio', 'corolla', 'picanto', 'sedan', 'accent', 'sentra', 'tiida', 'cerato', 'elantra', 'auto', 'camioneta', 'suv', 'spark'];
        if (autoKeywords.some(kw => normalized.includes(kw))) return 'auto';
        return 'van';
    };

    const renderVehicleSvg = (modelName, colorName) => {
        const hexColor = mapColorToHex(colorName);
        const type = determineVehicleType(modelName);

        if (type === 'auto') {
            return (
                <svg viewBox="0 0 240 100" fill="none" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="w-[85%] h-auto md:w-[75%] transition-all duration-300 hover:scale-105" style={{ stroke: hexColor }}>
                    {/* Auto Sedan Silhouette */}
                    <path d="M 25,70 L 15,70 Q 5,70 5,60 L 5,55 Q 5,45 20,40 L 50,35 L 80,15 Q 95,5 115,5 L 140,5 Q 160,5 180,25 L 210,35 Q 230,40 230,55 L 230,60 Q 230,70 220,70 L 210,70" />
                    <path d="M 65,70 L 165,70" />
                    <path d="M 10,70 L 230,70" strokeWidth="2" strokeOpacity="0.4" />
                    <path d="M 80,15 L 80,35" />
                    <path d="M 130,5 L 130,35" />
                    <path d="M 55,30 L 195,30" strokeWidth="2" />
                    <circle cx="45" cy="70" r="20" fill="#0A1522" />
                    <circle cx="45" cy="70" r="8" />
                    <circle cx="185" cy="70" r="20" fill="#0A1522" />
                    <circle cx="185" cy="70" r="8" />
                    {/* Headlight */}
                    <path d="M 220,40 L 230,45" strokeWidth="4" stroke="#fbbf24" strokeLinecap="round" />
                    <path d="M 10,40 L 5,45" strokeWidth="4" stroke="#ef4444" strokeLinecap="round" />
                </svg>
            );
        }

        // Default: Van / Combi (similar to the image)
        return (
            <svg viewBox="0 0 240 100" fill="none" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="w-[85%] h-auto md:w-[75%] transition-all duration-300 hover:scale-105 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" style={{ stroke: hexColor }}>
                {/* Combi Body */}
                <path d="M 25,80 L 15,80 Q 5,80 5,70 L 5,45 Q 5,10 30,10 L 180,10 Q 210,10 230,35 Q 235,45 235,55 L 235,70 Q 235,80 225,80 L 210,80" />
                <path d="M 65,80 L 165,80" />
                <path d="M 10,80 L 230,80" strokeWidth="2" strokeOpacity="0.4" />
                {/* Windows/Doors */}
                <path d="M 65,10 L 65,80" />
                <path d="M 125,10 L 125,80" />
                <path d="M 180,10 L 180,45" />
                <path d="M 5,45 L 235,45" strokeWidth="3" />
                <path d="M 230,60 L 235,60" />
                <path d="M 190,20 L 220,20" strokeWidth="2" />
                {/* Wheels */}
                <circle cx="45" cy="80" r="20" fill="#0A1522" strokeWidth="4.5" />
                <circle cx="45" cy="80" r="8" strokeWidth="4.5" />
                <circle cx="185" cy="80" r="20" fill="#0A1522" strokeWidth="4.5" />
                <circle cx="185" cy="80" r="8" strokeWidth="4.5" />
                {/* Lights */}
                <path d="M 225,50 L 235,50" strokeWidth="6" stroke="#fbbf24" strokeLinecap="round" />
                <path d="M 10,50 L 5,50" strokeWidth="6" stroke="#ef4444" strokeLinecap="round" />
            </svg>
        );
    };

    // Extraer vehículos únicos activos a partir de los conductores aprobados
    const activeVehicles = activeDrivers.map(driver => ({
        id: driver.id,
        plate: driver.placaAuto,
        status: 'En Ruta', // Por el momento, asumimos que están en ruta o podemos inferirlo
        driverName: `${driver.user?.firstName || ''} ${driver.user?.lastName || ''}`.trim(),
        driverDni: driver.dni,
        photo: driver.fotoCarro,
        route: driver.ruta
    })).filter(v => v.plate);

    return (
        <div className="space-y-6 relative">
            <div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/[0.72]">Flota y personal</p>
                <h2 className="mt-2 font-display text-4xl text-white">Choferes activos y unidades de la empresa.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                    Supervisa operadores, calificacion, asignacion de combis y estado actual de cada unidad.
                </p>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900/30 border border-emerald-400/20 text-emerald-400">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Personal operativo</p>
                            <h3 className="mt-0.5 font-display text-2xl text-white">Listado de Equipo</h3>
                        </div>
                    </div>

                    {/* Tabs Choferes / Cobradores */}
                    <div className="flex p-1 space-x-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
                        <button
                            onClick={() => setActiveTab('choferes')}
                            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] rounded-lg transition-all ${activeTab === 'choferes'
                                ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/20'
                                : 'text-white/[0.5] hover:text-white hover:bg-white/[0.05]'
                                }`}
                        >
                            Choferes ({activeDrivers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('cobradores')}
                            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] rounded-lg transition-all ${activeTab === 'cobradores'
                                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/20'
                                : 'text-white/[0.5] hover:text-white hover:bg-white/[0.05]'
                                }`}
                        >
                            Cobradores ({activeCobradores.length})
                            {pendingCobradores.length > 0 && (
                                <span className="ml-1.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-amber-500/80 text-[10px] font-bold text-black">
                                    {pendingCobradores.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-white/[0.42]">
                            <tr>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">DNI</th>
                                <th className="px-6 py-4">Correo</th>
                                <th className="px-6 py-4">{activeTab === 'choferes' ? 'Placa / Unidad' : 'Conductor Vinculado'}</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.08]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-white/[0.5]">Cargando personal...</td>
                                </tr>
                            ) : activeTab === 'choferes' ? (
                                activeDrivers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-white/[0.5]">No tienes choferes en tu flota actualmente.</td>
                                    </tr>
                                ) : (
                                    activeDrivers.map((driver) => (
                                        <tr key={driver.id} className="transition-colors hover:bg-white/[0.04]">
                                            <td className="px-6 py-5 font-medium text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-900/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
                                                    {driver.user?.firstName?.charAt(0)}{driver.user?.lastName?.charAt(0)}
                                                </div>
                                                <div>
                                                    {driver.user?.firstName} {driver.user?.lastName}
                                                    <div className="text-xs text-emerald-400/80 mt-0.5 uppercase tracking-wide px-1.5 py-0.5 rounded-sm bg-emerald-900/30 inline-block">Chofer</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">{driver.dni || 'N/A'}</td>
                                            <td className="px-6 py-5">{driver.user?.email || 'N/A'}</td>
                                            <td className="px-6 py-5 font-mono text-cyan-200">{driver.placaAuto || 'Sin placa'}</td>
                                            <td className="px-6 py-5 text-right space-x-2">
                                                <button
                                                    onClick={() => setSelectedDriver(driver)}
                                                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72] transition-colors hover:bg-white/[0.1] hover:text-white"
                                                >
                                                    Ver perfil
                                                </button>
                                                <button
                                                    onClick={() => requestUnlinkDriver(driver)}
                                                    className="rounded-full border border-red-500/[0.2] bg-red-500/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-400 transition-colors hover:bg-red-500/[0.2] hover:text-red-300"
                                                >
                                                    Desvincular
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <>
                                    {/* Solicitudes Pendientes de Cobradores */}
                                    {pendingCobradores.length > 0 && (
                                        <>
                                            <tr>
                                                <td colSpan="5" className="px-6 pt-5 pb-2">
                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                                                        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                                        Solicitudes pendientes de aprobación
                                                    </div>
                                                </td>
                                            </tr>
                                            {pendingCobradores.map((cobrador) => (
                                                <tr key={`pending-${cobrador.id}`} className="transition-colors hover:bg-amber-500/[0.03] bg-amber-500/[0.02]">
                                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-amber-900/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                                                            {cobrador.user?.firstName?.charAt(0)}{cobrador.user?.lastName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            {cobrador.user?.firstName} {cobrador.user?.lastName}
                                                            <div className="text-xs text-amber-400/80 mt-0.5 uppercase tracking-wide px-1.5 py-0.5 rounded-sm bg-amber-900/30 inline-block">Pendiente</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{cobrador.dni || 'N/A'}</td>
                                                    <td className="px-6 py-4">{cobrador.user?.email || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-white/[0.5] italic text-sm">Esperando aprobación</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="rounded-full px-3 py-1.5 text-xs font-semibold border border-amber-500/30 text-amber-400 bg-amber-500/10">
                                                            En revisión
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {activeCobradores.length > 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 pt-5 pb-2">
                                                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Cobradores activos</div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    )}

                                    {/* Cobradores Aprobados */}
                                    {activeCobradores.length === 0 && pendingCobradores.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-sm text-white/[0.5]">No tienes cobradores en tu flota actualmente.</td>
                                        </tr>
                                    ) : (
                                        activeCobradores.map((cobrador) => (
                                            <tr key={cobrador.id} className="transition-colors hover:bg-white/[0.04]">
                                                <td className="px-6 py-5 font-medium text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-cyan-900/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
                                                        {cobrador.user?.firstName?.charAt(0)}{cobrador.user?.lastName?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        {cobrador.user?.firstName} {cobrador.user?.lastName}
                                                        <div className="text-xs text-cyan-400/80 mt-0.5 uppercase tracking-wide px-1.5 py-0.5 rounded-sm bg-cyan-900/30 inline-block">Cobrador</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">{cobrador.dni || 'N/A'}</td>
                                                <td className="px-6 py-5">{cobrador.user?.email || 'N/A'}</td>
                                                <td className="px-6 py-5 text-white/[0.8]">
                                                    {cobrador.conductor ? (
                                                        <div className="flex flex-col">
                                                            <span>{cobrador.conductor.user?.firstName} {cobrador.conductor.user?.lastName}</span>
                                                            <span className="text-xs text-white/[0.4]">{cobrador.conductor.codigoConductor}</span>
                                                        </div>
                                                    ) : 'No vinculado a un chofer'}
                                                </td>
                                                <td className="px-6 py-5 text-right space-x-2">
                                                    <button
                                                        onClick={() => setSelectedCobrador(cobrador)}
                                                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72] transition-colors hover:bg-white/[0.1] hover:text-white"
                                                    >
                                                        Ver perfil
                                                    </button>
                                                    <button
                                                        onClick={() => requestUnlinkCobrador(cobrador)}
                                                        className="rounded-full border border-red-500/[0.2] bg-red-500/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-400 transition-colors hover:bg-red-500/[0.2] hover:text-red-300"
                                                    >
                                                        Desvincular
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-900/30 border border-cyan-400/20 text-cyan-400">
                            <BusFront className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Vehiculos</p>
                            <h3 className="mt-0.5 font-display text-2xl text-white">Combis asignadas</h3>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-white/[0.42]">
                            <tr>
                                <th className="px-6 py-4">Placa</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Ultima ubicacion</th>
                                <th className="px-6 py-4">Chofer asignado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.08]">
                            {activeVehicles.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-white/[0.5]">No hay vehículos asignados actualmente.</td>
                                </tr>
                            ) : (
                                activeVehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="transition-colors hover:bg-white/[0.04]">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-cyan-900/30 border border-cyan-400/20 flex items-center justify-center text-cyan-200 font-medium">Auto</div>
                                                <span className="font-display text-xl text-white">{vehicle.plate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-400/[0.15] text-emerald-100">
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-white/[0.8] max-w-[200px] truncate" title={vehicle.route || 'Ruta no especificada'}>
                                            {vehicle.route || 'Ruta no asignada'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="font-medium text-white">{vehicle.driverName}</div>
                                            <div className="text-xs text-white/[0.5]">DNI: {vehicle.driverDni}</div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Perfil de Chofer */}
            {selectedDriver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#00050A]/80 backdrop-blur-sm"
                        onClick={() => setSelectedDriver(null)}
                    ></div>
                    <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/[0.08] bg-[rgba(10,21,34,0.95)] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between border-b border-white/[0.08] px-7 py-5 bg-white/[0.02] shrink-0">
                            <h3 className="font-display text-xl text-white">Perfil del Operador</h3>
                            <button
                                onClick={() => setSelectedDriver(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/[0.5] hover:bg-white/[0.1] hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-7 overflow-y-auto">
                            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-cyan-900/40 border border-cyan-400/30">
                                    <User className="h-10 w-10 text-cyan-200 text-opacity-80" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-display text-2xl text-white">
                                        {selectedDriver.user?.firstName} {selectedDriver.user?.lastName}
                                    </h2>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-cyan-200/80">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span>Conductor Verificado • Activo</span>
                                    </p>
                                    <p className="mt-2 text-sm text-white/[0.5]">
                                        DNI: <span className="text-white/[0.8]">{selectedDriver.dni}</span> |
                                        Código: <span className="text-amber-200 ml-1">{selectedDriver.codigoConductor}</span>
                                    </p>
                                </div>
                            </div>

                            <h4 className="font-display text-lg text-white mb-4">Información Operativa</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] p-4 flex gap-4 items-center">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-amber-200">
                                        <KeyRound className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-[0.1em] text-white/[0.4]">Placa Asignada</p>
                                        <p className="font-display text-lg text-white truncate">{selectedDriver.placaAuto}</p>
                                    </div>
                                </div>

                                <div className="rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] p-4 flex gap-4 items-center">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-emerald-200">
                                        <Navigation className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-[0.1em] text-white/[0.4]">Ruta Habitual</p>
                                        <p className="text-sm font-medium text-white truncate">{selectedDriver.ruta || 'Sin ruta definida'}</p>
                                    </div>
                                </div>
                            </div>

                            {selectedDriver.fotoCarro || selectedDriver.placaAuto ? (
                                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                            <BusFront className="h-4 w-4" />
                                        </div>
                                        <h4 className="font-display text-lg text-white">Vehículo Asignado</h4>
                                    </div>

                                    {/* Grid: SVG + info side by side */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* SVG del vehículo – más alto */}
                                        <div className="col-span-2 h-44 rounded-2xl bg-[#141E30] flex flex-col items-center justify-center gap-3 p-5 border border-white/[0.04] shadow-inner relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-15 blur-[60px]" style={{ backgroundColor: mapColorToHex(selectedDriver.colorAuto) }}></div>
                                            {renderVehicleSvg(selectedDriver.modeloAuto, selectedDriver.colorAuto)}
                                            {/* Pastilla modelo + color */}
                                            {(selectedDriver.modeloAuto || selectedDriver.colorAuto) && (
                                                <div className="relative flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-1.5 text-xs text-white/[0.85]">
                                                    <span>{(selectedDriver.modeloAuto || 'Vehículo').toUpperCase()}</span>
                                                    {selectedDriver.colorAuto && (
                                                        <>
                                                            <span className="text-white/[0.3]">•</span>
                                                            <span
                                                                className="inline-block h-3 w-3 rounded-full border border-white/[0.2] shrink-0"
                                                                style={{ backgroundColor: mapColorToHex(selectedDriver.colorAuto) }}
                                                            />
                                                            <span className="capitalize">{selectedDriver.colorAuto}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Placa */}
                                        <div className="bg-[#182335] rounded-xl p-4 border border-white/[0.06] flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CarFront className="h-4 w-4 text-white/[0.4]" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/[0.4]">Placa</p>
                                            </div>
                                            <p className="font-display text-lg text-white tracking-widest">{selectedDriver.placaAuto || 'S/P'}</p>
                                        </div>

                                        {/* Modelo + Color */}
                                        <div className="bg-[#182335] rounded-xl p-4 border border-white/[0.06] flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <BusFront className="h-4 w-4 text-white/[0.4]" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/[0.4]">Modelo / Color</p>
                                            </div>
                                            <p className="text-sm font-medium text-white truncate">{selectedDriver.modeloAuto || 'N/A'}</p>
                                            {selectedDriver.colorAuto && (
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span
                                                        className="inline-block h-2.5 w-2.5 rounded-full border border-white/[0.2]"
                                                        style={{ backgroundColor: mapColorToHex(selectedDriver.colorAuto) }}
                                                    />
                                                    <span className="text-xs text-white/[0.5] capitalize">{selectedDriver.colorAuto}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* SOAT */}
                                        <div className="bg-[#182335] rounded-xl p-4 border border-emerald-500/[0.12] flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/[0.4]">SOAT</p>
                                            </div>
                                            <span className="self-start px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider">VIGENTE</span>
                                        </div>

                                        {/* Revisión Técnica */}
                                        <div className="bg-[#182335] rounded-xl p-4 border border-emerald-500/[0.12] flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/[0.4]">Rev. Técnica</p>
                                            </div>
                                            <span className="self-start px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider">VIGENTE</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                        </div>
                    </div>
                </div >
            )
            }

            {/* Modal de Perfil de Cobrador */}
            {
                selectedCobrador && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-[#00050A]/80 backdrop-blur-sm"
                            onClick={() => setSelectedCobrador(null)}
                        ></div>
                        <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[rgba(10,21,34,0.95)] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-white/[0.02]">
                                <h3 className="font-display text-xl text-white">Perfil del Cobrador</h3>
                                <button
                                    onClick={() => setSelectedCobrador(null)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/[0.5] hover:bg-white/[0.1] hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-cyan-900/40 border border-cyan-400/30">
                                        <User className="h-8 w-8 text-cyan-200 text-opacity-80" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h2 className="font-display text-2xl text-white">
                                            {selectedCobrador.user?.firstName} {selectedCobrador.user?.lastName}
                                        </h2>
                                        <p className="mt-1 flex items-center gap-2 text-sm text-cyan-200/80">
                                            <ShieldCheck className="h-4 w-4" />
                                            <span>Cobrador • Activo</span>
                                        </p>
                                        <p className="mt-2 text-sm text-white/[0.5]">
                                            DNI: <span className="text-white/[0.8]">{selectedCobrador.dni}</span> |
                                            Código: <span className="text-amber-200 ml-1">{selectedCobrador.codigoCobrador}</span>
                                        </p>
                                    </div>
                                </div>

                                <h4 className="font-display text-lg text-white mb-4">Información de Vinculación</h4>
                                <div className="rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] p-5">
                                    {selectedCobrador.conductor ? (
                                        <>
                                            <p className="text-xs uppercase tracking-[0.1em] text-white/[0.4] mb-3">Conductor Asociado</p>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900/30 border border-emerald-400/20 text-emerald-400">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{selectedCobrador.conductor.user?.firstName} {selectedCobrador.conductor.user?.lastName}</p>
                                                    <p className="text-xs text-white/[0.6]">Placa de la unidad: <span className="text-cyan-200 ml-1">{selectedCobrador.conductor.placaAuto}</span></p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-white/[0.6] text-sm text-center py-2">
                                            Este cobrador no está vinculado actualmente a ningún conductor.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal Global de Confirmación de Desvinculación */}
            {
                unlinkTarget && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-[#00050A]/85 backdrop-blur-md"
                            onClick={() => setUnlinkTarget(null)}
                        ></div>
                        <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0A111A] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-6">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mb-5">
                                    <AlertTriangle className="h-7 w-7" />
                                </div>
                                <h3 className="font-display text-2xl text-white mb-2">Desvincular Personal</h3>
                                <p className="text-sm text-white/[0.6] leading-relaxed mb-6">
                                    ¿Estás seguro de que deseas desvincular a <strong className="text-white">{unlinkTarget.name}</strong> de tu empresa?
                                    Sus datos operativos se mantendrán en el sistema, pero dejará de formar parte de tu flota activa.
                                    Necesitará presentar una nueva solicitud para reincorporarse.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setUnlinkTarget(null)}
                                        className="flex-1 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white/[0.8] hover:bg-white/[0.08] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleConfirmUnlink}
                                        className="flex-1 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                                    >
                                        Desvincular
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
