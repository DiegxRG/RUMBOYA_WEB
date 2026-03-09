export const mockCompanies = [
    { id: 1, name: 'Los Criminales', ruc: '20123456789', status: 'Activa', fleetSize: 12, contact: 'admin@loscriminales.pe', joinedAt: '2026-03-01' },
    { id: 2, name: 'Transportes El Sol', ruc: '20987654321', status: 'Suspendida', fleetSize: 5, contact: 'gerencia@elsol.pe', joinedAt: '2026-02-15' },
    { id: 3, name: 'Rutas Express VIP', ruc: '20555555555', status: 'Pendiente', fleetSize: 0, contact: 'contacto@rutasvip.pe', joinedAt: '2026-03-06' },
];

export const mockFleet = [
    { id: 1, plate: 'ABC-123', status: 'En Ruta', lastUpdate: 'Hace 10 min', driverId: 101 },
    { id: 2, plate: 'XYZ-789', status: 'Detenida', lastUpdate: 'Hace 2 horas', driverId: 102 },
    { id: 3, plate: 'LMN-456', status: 'En Mantenimiento', lastUpdate: 'Ayer', driverId: null },
    { id: 4, plate: 'PQR-321', status: 'En Ruta', lastUpdate: 'Hace 5 min', driverId: 103 },
];

export const mockDrivers = [
    { id: 101, name: 'Juan Pérez', dni: '74839201', email: 'juan.perez@email.com', status: 'Activo', rating: 4.8 },
    { id: 102, name: 'Carlos Díaz', dni: '48392019', email: 'carlos.d@email.com', status: 'Activo', rating: 4.5 },
    { id: 103, name: 'Luis Ramos', dni: '09382716', email: 'luis.ram@email.com', status: 'Activo', rating: 4.9 },
    { id: 104, name: 'Miguel Ángel', dni: '84736291', email: 'miguel.a@email.com', status: 'Pendiente', rating: null, inviteCode: 'RUMBO-1X9' },
];

export const mockInviteCodes = [
    { code: 'RUMBO-1X9', status: 'Usado', generatedAt: '2026-03-06', usedBy: 'Miguel Ángel' },
    { code: 'RUMBO-Z4A', status: 'Activo', generatedAt: '2026-03-07', usedBy: null },
    { code: 'RUMBO-P9L', status: 'Activo', generatedAt: '2026-03-07', usedBy: null },
];

export const mockIncidents = [
    { id: 1, type: 'Tráfico Pesado', location: 'Cruce Av. Arequipa con Javier Prado', reportedAt: 'Hace 20 min', status: 'Activo' },
    { id: 2, type: 'Desvío de Ruta', location: 'Óvalo Miraflores', reportedAt: 'Hace 1 hora', status: 'Resuelto' },
];
