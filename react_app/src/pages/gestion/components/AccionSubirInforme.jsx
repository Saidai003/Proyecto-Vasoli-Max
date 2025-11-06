
import React from 'react';

const AccionSubirInforme = ({ gestion, setGestion, currentUser }) => {

  const handleSubirInforme = () => {
    console.log('Subiendo informe...');
    const nuevoDocumento = { nombre: 'informe_final_v1.pdf', url: '/docs/informe_final_v1.pdf' };

    setGestion(prev => ({
      ...prev,
      estado: 'PENDIENTE_APROBACION_GM', // El siguiente paso en el flujo
      documentos: [...prev.documentos, nuevoDocumento],
      historial: [...prev.historial, { fecha: new Date().toISOString(), usuario: currentUser.nombre, accion: 'Subida de informe' }],
      comentariosRechazo: '', // Limpiar comentarios de rechazo previos
    }));
  };

  return (
    <div>
        {gestion.estado === 'REQUIERE_CORRECCION' && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <p className="font-bold">Corrección Requerida</p>
                <p>El Gestor General ha solicitado cambios: "{gestion.comentariosRechazo}"</p>
            </div>
        )}
      <p className="mb-4">Como <strong>Profesional Asignado</strong>, debes subir aquí el informe o los resultados de tu trabajo.</p>
      {/* Aquí iría un campo de carga de archivos */}
      <button 
        onClick={handleSubirInforme} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Subir Informe y Enviar para Aprobación
      </button>
    </div>
  );
};

export default AccionSubirInforme;
