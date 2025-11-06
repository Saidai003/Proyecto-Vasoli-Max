
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Componentes de acción (placeholders)
import AccionAsignar from './components/AccionAsignar';
import AccionSubirInforme from './components/AccionSubirInforme';
import AccionAprobarGM from './components/AccionAprobarGM';
import AccionFacturacion from './components/AccionFacturacion';

// Simulación de un hook que obtiene el usuario actual
const useCurrentUser = () => ({
  // Cambia este valor para probar diferentes roles: 'GESTOR_GENERAL', 'PROFESIONAL', 'ADMINISTRACION', 'CLIENTE'
  rol: 'GESTOR_GENERAL', 
  nombre: 'Carlos Rodriguez',
});

// --- 1. MODELO DE ESTADO SUGERIDO ---
const initialGestionState = {
  id: null,
  nombre: '',
  estado: 'NUEVA', // 'NUEVA', 'PENDIENTE_ASIGNACION', 'ASIGNADA', 'EN_EJECUCION', 'PENDIENTE_APROBACION_GM', 'EN_ADMINISTRACION', 'PENDIENTE_PAGO', 'FINALIZADA', 'REQUIERE_CORRECCION'
  responsable: null,
  documentos: [],
  historial: [],
  comentariosRechazo: '',
};

const GestionDetalle = () => {
  const { id } = useParams();
  const [gestion, setGestion] = useState(initialGestionState);
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Aquí iría la lógica para cargar los datos de la gestión desde tu API
    // fetch(`/api/gestiones/${id}`).then(res => res.json()).then(data => setGestion(data));
    
    // Simulamos la carga de datos
    setGestion({
      id: id,
      nombre: `Gestión de Proyecto #${id}`,
      // Cambia este estado para probar el flujo:
      estado: 'PENDIENTE_ASIGNACION', 
      responsable: { nombre: 'Alicia Vega', rol: 'PROFESIONAL' },
      documentos: [],
      historial: [
        { fecha: '2025-11-05T10:00:00Z', usuario: 'Cliente', accion: 'Creación de la gestión' },
      ],
      comentariosRechazo: '',
    });
    setLoading(false);
  }, [id]);

  // --- 3. LÓGICA DE RECHAZO ---
  const handleRechazarInforme = (comentarios) => {
    console.log('Informe rechazado por el Gestor General. Comentarios:', comentarios);
    setGestion(prev => ({
      ...prev,
      // El estado vuelve a estar en manos del profesional
      estado: 'REQUIERE_CORRECCION', 
      historial: [...prev.historial, { fecha: new Date().toISOString(), usuario: currentUser.nombre, accion: 'Rechazo de informe', comentarios }],
      comentariosRechazo: comentarios,
    }));
    // Aquí se podría añadir una notificación al profesional
  };

  // --- 2. RENDERIZADO CONDICIONAL BASADO EN ROL Y ESTADO ---
  const renderCurrentAction = () => {
    switch (gestion.estado) {
      case 'PENDIENTE_ASIGNACION':
        if (currentUser.rol === 'GESTOR_GENERAL') {
          return <AccionAsignar gestion={gestion} setGestion={setGestion} currentUser={currentUser} />;
        }
        return <p>Esperando asignación por parte del Gestor General.</p>;

      case 'EN_EJECUCION':
      case 'REQUIERE_CORRECCION':
        if (currentUser.rol === 'PROFESIONAL' && currentUser.nombre === gestion.responsable?.nombre) {
          return <AccionSubirInforme gestion={gestion} setGestion={setGestion} currentUser={currentUser} />;
        }
        return <p>El profesional asignado está trabajando en el informe.</p>;
        
      case 'PENDIENTE_APROBACION_GM':
        if (currentUser.rol === 'GESTOR_GENERAL') {
          // Pasamos la función de rechazo al componente de aprobación
          return <AccionAprobarGM gestion={gestion} setGestion={setGestion} onRechazar={handleRechazarInforme} />;
        }
        return <p>Informe pendiente de aprobación por el Gestor General.</p>;

      case 'EN_ADMINISTRACION':
        if (currentUser.rol === 'ADMINISTRACION') {
          return <AccionFacturacion gestion={gestion} setGestion={setGestion} />;
        }
        return <p>El equipo de administración está procesando la facturación.</p>;

      case 'PENDIENTE_PAGO':
        return <p>Factura emitida. Esperando confirmación de pago del cliente.</p>;
        
      case 'FINALIZADA':
        return <p>Gestión completada y archivada.</p>;

      default:
        return <p>El estado de la gestión es: {gestion.estado}</p>;
    }
  };

  if (loading) {
    return <div>Cargando gestión...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{gestion.nombre}</h1>
      <p className="mb-4">Estado actual: <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{gestion.estado}</span></p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Acción Requerida</h2>
        {renderCurrentAction()}
      </div>

      {/* Aquí podrías renderizar más detalles como el historial, documentos, etc. */}
    </div>
  );
};

export default GestionDetalle;
