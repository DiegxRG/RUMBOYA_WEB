import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, Mail, FileText, User, Hash, Copy, CheckCircle2 } from 'lucide-react';

export default function CompanyProfilePage() {
    const { user, companyDetails } = useAuth();

    // Información a mostrar basada en el contexto y los datos disponibles
    const companyName = companyDetails?.razonSocial || 'Mi Empresa';
    const ruc = companyDetails?.ruc || 'No definido';
    const email = user?.email || 'No definido';
    const representative = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'No definido';

    // Obtenemos el código de sincronización
    const syncCode = companyDetails?.codigoSincronizacion || companyDetails?.codigo_sincronizacion || 'No disponible';
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        if (syncCode !== 'No disponible') {
            navigator.clipboard.writeText(syncCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const infoCardClass = "rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] p-5 flex items-start gap-4";

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/[0.72]">Ajustes de cuenta</p>
                <h2 className="mt-2 font-display text-3xl text-white">Perfil de Empresa</h2>
            </header>

            <div className="rounded-[1.8rem] border border-white/[0.08] bg-[rgba(8,19,32,0.76)] p-6 backdrop-blur-xl max-w-4xl">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8 pb-8 border-b border-white/[0.08]">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-cyan-900 border-2 border-cyan-400">
                        <span className="font-display text-4xl text-cyan-200">{companyName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <h3 className="font-display text-2xl text-white">{companyName}</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-white/[0.60]">
                            <Building2 className="h-4 w-4" />
                            Cuenta de Empresa Operativa
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-emerald-200">
                            Estado: Activo
                        </div>
                    </div>
                </div>

                {/* Código de Sincronización Destacado */}
                <div className="mb-8 rounded-[1.6rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-900/20 to-blue-900/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-cyan-200 mb-2">
                            <Hash className="h-5 w-5" />
                            <h4 className="font-display text-lg">Código de Sincronización</h4>
                        </div>
                        <p className="text-sm text-white/[0.68] max-w-md">
                            Comparte este código con tus choferes. Ellos deberán ingresarlo en su aplicación móvil para vincularse a tu flota.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#07111b] border border-white/[0.1] rounded-[1.2rem] p-2 pl-6 shrink-0">
                        <span className="font-display text-2xl tracking-[0.2em] text-white">
                            {syncCode}
                        </span>
                        <button
                            onClick={handleCopyCode}
                            title="Copiar código"
                            disabled={syncCode === 'No disponible'}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-[#07111b] disabled:opacity-50"
                        >
                            {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <h4 className="font-display text-lg text-white mb-5">Información General</h4>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className={infoCardClass}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-cyan-200">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-white/[0.46]">Razón Social</p>
                            <p className="mt-1 font-medium text-white">{companyName}</p>
                        </div>
                    </div>

                    <div className={infoCardClass}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-amber-200">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-white/[0.46]">RUC</p>
                            <p className="mt-1 font-medium text-white">{ruc}</p>
                        </div>
                    </div>

                    <div className={infoCardClass}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-blue-200">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-white/[0.46]">Correo de acceso</p>
                            <p className="mt-1 font-medium text-white">{email}</p>
                        </div>
                    </div>

                    <div className={infoCardClass}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-purple-200">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-white/[0.46]">Representante Registrado</p>
                            <p className="mt-1 font-medium text-white">{representative}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-[1.4rem] border border-white/[0.08] bg-[#07111b] p-5">
                    <p className="text-sm leading-6 text-white/[0.60]">
                        La información principal de la empresa es verificada por el sistema. Si necesitas actualizar datos tributarios como la Razón Social o el RUC, por favor contacta al equipo de soporte de RumboYa.
                    </p>
                </div>
            </div>
        </div>
    );
}
