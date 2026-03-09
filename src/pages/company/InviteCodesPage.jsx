import React from 'react';
import { Copy, Key, PlusCircle } from 'lucide-react';
import { mockInviteCodes } from '../../data/dummyData';

export default function InviteCodesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-amber-100/[0.72]">Codigos de invitacion</p>
                    <h2 className="mt-2 font-display text-4xl text-white">Vinculacion de choferes con la empresa.</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/[0.64]">
                        Genera codigos para que nuevos choferes soliciten ingreso desde la app movil y luego
                        aprueba su vinculacion desde este panel.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-display text-sm uppercase tracking-[0.2em] text-[#05111b]">
                    <PlusCircle className="h-4 w-4" />
                    Generar codigo
                </button>
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-[rgba(8,19,32,0.78)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/[0.46]">Historial</p>
                        <h3 className="mt-2 font-display text-2xl text-white">Codigos generados</h3>
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/[0.7]">
                        {mockInviteCodes.length} registros
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm text-white/[0.68]">
                        <thead className="border-b border-white/[0.08] bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-white/[0.42]">
                            <tr>
                                <th className="px-6 py-4">Codigo</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Generado</th>
                                <th className="px-6 py-4">Usado por</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.08]">
                            {mockInviteCodes.map((invite) => (
                                <tr key={invite.code} className="transition-colors hover:bg-white/[0.04]">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05]">
                                                <Key className="h-4 w-4 text-cyan-100" />
                                            </div>
                                            <span className="font-display text-xl text-white">{invite.code}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            invite.status === 'Activo'
                                                ? 'bg-emerald-400/[0.15] text-emerald-100'
                                                : 'bg-white/[0.08] text-white/[0.7]'
                                        }`}>
                                            {invite.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">{invite.generatedAt}</td>
                                    <td className="px-6 py-5">
                                        {invite.usedBy ? invite.usedBy : <span className="italic text-white/[0.44]">Aun no usado</span>}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {invite.status === 'Activo' && (
                                            <button className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.72]">
                                                <Copy className="h-3.5 w-3.5" />
                                                Copiar
                                            </button>
                                        )}
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
