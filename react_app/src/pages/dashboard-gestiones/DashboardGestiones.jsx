
import React from 'react';
import { Link } from 'react-router-dom';

// Simulación de datos de gestiones que vendrían de una API
const mockGestiones = [
  {
    id: '101',
    nombre: 'Licencia de construcción Edificio Central',
    estado: 'PENDIENTE_ASIGNACION',
    responsable: null,
  },
  {
    id: '102',
    nombre: 'Estudio de impacto ambiental',
    estado: 'EN_EJECUCION',
    responsable: 'Alicia Vega',
  },
  {
    id: '103',
    nombre: 'Declaración de nueva obra',
    estado: 'PENDIENTE_APROBACION_GM',
    responsable: 'Marcos Diaz',
  },
  {
    id: '104',
    nombre: 'Certificado energético',
    estado: 'EN_ADMINISTRACION',
    responsable: 'Laura Pons',
  },
];

const DashboardGestiones = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Gestiones</h1>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre de la Gestión</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsable</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {mockGestiones.map(gestion => (
              <tr key={gestion.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{gestion.id}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{gestion.nombre}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{gestion.responsable || 'N/A'}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{gestion.estado}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <Link to={`/gestion/${gestion.id}`} className="text-blue-500 hover:text-blue-800">
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardGestiones;
