import React, { useState, useEffect } from 'react';
import { X, User, Navigation, KeyRound, ShieldCheck, Users, BusFront } from 'lucide-react';
import api from '../../api/axiosConfig';

export default function FleetPage() {
    const [activeDrivers, setActiveDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                // Fetch approved drivers linked to the company
                const res = await api.get('/api/empresas/me/conductores?estado=APROBADA');
                setActiveDrivers(res.data || []);
            } catch (error) {
                console.error("Error fetching approved drivers", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDrivers();
    }, []);

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
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900/30 border border-emerald-400/20 text-emerald-400">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Choferes activos</p>
                            <h3 className="mt-0.5 font-display text-2xl text-white">Equipo operativo</h3>
                        </div>
                    </div>
                    <button className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72]">
                        Ver todos
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-white/[0.42]">
                            <tr>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">DNI</th>
                                <th className="px-6 py-4">Correo</th>
                                <th className="px-6 py-4">Calificacion</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.08]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-white/[0.5]">Cargando choferes...</td>
                                </tr>
                            ) : activeDrivers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-white/[0.5]">No tienes choferes en tu flota actualmente.</td>
                                </tr>
                            ) : (
                                activeDrivers.map((driver) => (
                                    <tr key={driver.id} className="transition-colors hover:bg-white/[0.04]">
                                        <td className="px-6 py-5 font-medium text-white">
                                            {driver.user?.firstName} {driver.user?.lastName}
                                            <div className="text-xs text-white/[0.5] mt-1">Placa: {driver.placaAuto}</div>
                                        </td>
                                        <td className="px-6 py-5">{driver.dni || 'N/A'}</td>
                                        <td className="px-6 py-5">{driver.user?.email || 'N/A'}</td>
                                        <td className="px-6 py-5">{/* Placeholder until rating is implemented */ 'Sin rating'}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => setSelectedDriver(driver)}
                                                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72] transition-colors hover:bg-white/[0.1] hover:text-white"
                                            >
                                                Ver perfil
                                            </button>
                                        </td>
                                    </tr>
                                ))
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
                    <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[rgba(10,21,34,0.95)] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-white/[0.02]">
                            <h3 className="font-display text-xl text-white">Perfil del Operador</h3>
                            <button
                                onClick={() => setSelectedDriver(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/[0.5] hover:bg-white/[0.1] hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
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

                            {selectedDriver.fotoCarro && (
                                <div className="mt-6">
                                    <p className="text-xs uppercase tracking-[0.1em] text-white/[0.4] mb-3">Fotografía de la Unidad</p>
                                    <div className="h-32 w-full sm:w-1/2 rounded-xl border border-white/[0.08] overflow-hidden">
                                        <img src={selectedDriver.fotoCarro} alt="Vehículo" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
