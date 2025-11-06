
import React, { useState } from 'react';

const AccionAprobarGM = ({ gestion, setGestion, onRechazar }) => {
  const [comentarios, setComentarios] = useState('');

  const handleAprobar = () => {
    console.log('Informe aprobado por el Gestor General.');
    setGestion(prev => ({
      ...prev,
      estado: 'EN_ADMINISTRACION', // Aprobado, pasa a facturación
      historial: [...prev.historial, { fecha: new Date().toISOString(), usuario: 'Gestor General', accion: 'Aprobación de informe' }],
    }));
  };

  const handleRechazarClick = () => {
    if (!comentarios) {
      alert('Por favor, añade un comentario de rechazo para notificar al profesional.');
      return;
    }
    // Llama a la función que vive en el componente padre
    onRechazar(comentarios);
  };

  return (
    <div>
      <p className="mb-4">Como <strong>Gestor General</strong>, debes revisar el informe y aprobarlo o rechazarlo.</p>
      {/* Aquí se mostraría el documento subido */}
      <div className="mb-4">
        <p>Documentos a revisar:</p>
        <ul>
          {gestion.documentos.map((doc, index) => (
            <li key={index}><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doc.nombre}</a></li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={handleAprobar} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Aprobar Informe
        </button>
        <button 
          onClick={handleRechazarClick} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Rechazar
        </button>
      </div>

      <div>
        <textarea 
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          placeholder="Añadir comentarios de rechazo (obligatorio si se rechaza)"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default AccionAprobarGM;
