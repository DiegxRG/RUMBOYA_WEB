import React from 'react';
import { AlertCircle, Building2, CheckCircle, PlusCircle, XCircle } from 'lucide-react';
import { mockCompanies } from '../../data/dummyData';

const badgeStyles = {
    Activa: 'bg-emerald-400/[0.15] text-emerald-100',
    Suspendida: 'bg-red-400/[0.15] text-red-100',
    Pendiente: 'bg-amber-300/[0.15] text-amber-100',
};

export default function CompanyManagement() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/[0.72]">Gestion de empresas</p>
                    <h2 className="mt-2 font-display text-4xl text-white">Empresas afiliadas a la plataforma.</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                        Administra altas, suspension, estado operativo y datos de contacto de las empresas
                        que participan en RumboYa.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-display text-sm uppercase tracking-[0.2em] text-[#05111b]">
                    <PlusCircle className="h-4 w-4" />
                    Registrar empresa
                </button>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Base de empresas</p>
                        <h3 className="mt-2 font-display text-2xl text-white">Empresas registradas</h3>
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/[0.68]">
                        {mockCompanies.length} registros
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-white/[0.42]">
                            <tr>
                                <th className="px-6 py-4">Empresa</th>
                                <th className="px-6 py-4">RUC</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Flota</th>
                                <th className="px-6 py-4">Contacto</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.08]">
                            {mockCompanies.map((company) => {
                                const StatusIcon =
                                    company.status === 'Activa'
                                        ? CheckCircle
                                        : company.status === 'Suspendida'
                                            ? XCircle
                                            : AlertCircle;

                                return (
                                    <tr key={company.id} className="transition-colors hover:bg-white/[0.04]">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05]">
                                                    <Building2 className="h-5 w-5 text-cyan-100" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{company.name}</p>
                                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/[0.4]">
                                                        Ingreso {company.joinedAt}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-mono text-white/[0.62]">{company.ruc}</td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[company.status]}`}>
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">{company.fleetSize} combis</td>
                                        <td className="px-6 py-5">{company.contact}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.7] transition-all hover:bg-white/[0.08] hover:text-white">
                                                Ver detalle
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
