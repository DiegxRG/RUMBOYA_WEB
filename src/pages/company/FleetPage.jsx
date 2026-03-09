import React from 'react';
import { mockDrivers, mockFleet } from '../../data/dummyData';

export default function FleetPage() {
    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/[0.72]">Flota y personal</p>
                <h2 className="mt-2 font-display text-4xl text-white">Choferes activos y unidades de la empresa.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                    Supervisa operadores, calificacion, asignacion de combis y estado actual de cada unidad.
                </p>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Choferes activos</p>
                        <h3 className="mt-2 font-display text-2xl text-white">Equipo operativo</h3>
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
                            {mockDrivers
                                .filter((driver) => driver.status === 'Activo')
                                .map((driver) => (
                                    <tr key={driver.id} className="transition-colors hover:bg-white/[0.04]">
                                        <td className="px-6 py-5 font-medium text-white">{driver.name}</td>
                                        <td className="px-6 py-5">{driver.dni}</td>
                                        <td className="px-6 py-5">{driver.email}</td>
                                        <td className="px-6 py-5">{driver.rating?.toFixed(1) ?? 'Sin rating'}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72]">
                                                Ver perfil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Vehiculos</p>
                        <h3 className="mt-2 font-display text-2xl text-white">Combis asignadas</h3>
                    </div>
                    <button className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#05111b]">
                        Anadir vehiculo
                    </button>
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
                            {mockFleet.map((vehicle) => (
                                <tr key={vehicle.id} className="transition-colors hover:bg-white/[0.04]">
                                    <td className="px-6 py-5 font-display text-xl text-white">{vehicle.plate}</td>
                                    <td className="px-6 py-5">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            vehicle.status === 'En Ruta'
                                                ? 'bg-emerald-400/[0.15] text-emerald-100'
                                                : vehicle.status === 'Detenida'
                                                    ? 'bg-amber-300/[0.15] text-amber-100'
                                                    : 'bg-red-400/[0.15] text-red-100'
                                        }`}>
                                            {vehicle.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">{vehicle.lastUpdate}</td>
                                    <td className="px-6 py-5">
                                        {vehicle.driverId
                                            ? mockDrivers.find((driver) => driver.id === vehicle.driverId)?.name
                                            : <span className="italic text-white/[0.44]">Sin asignar</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
