
import React from 'react';

const AccionAsignar = ({ gestion, setGestion, currentUser }) => {
  
  const handleAsignar = () => {
    const profesionalAsignado = { nombre: 'Alicia Vega', rol: 'PROFESIONAL' }; // Simulación
    console.log(`Asignando a ${profesionalAsignado.nombre}`);

    setGestion(prev => ({
      ...prev,
      estado: 'ASIGNADA',
      responsable: profesionalAsignado,
      historial: [...prev.historial, { fecha: new Date().toISOString(), usuario: currentUser.nombre, accion: `Asignación a ${profesionalAsignado.nombre}` }],
    }));
    
    // Lógica para pasar a 'EN_EJECUCION' después de un tiempo o acción
    setTimeout(() => {
        setGestion(prev => ({ ...prev, estado: 'EN_EJECUCION' }));
    }, 1000);
  };

  return (
    <div>
      <p className="mb-4">Como <strong>Gestor General</strong>, debes asignar esta tarea a un profesional.</p>
      {/* Aquí iría un selector para elegir al profesional */}
      <button 
        onClick={handleAsignar} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Asignar a Profesional (Simulado)
      </button>
    </div>
  );
};

export default AccionAsignar;
