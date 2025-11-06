
import React, { useState } from 'react';

const AccionFacturacion = ({ gestion, setGestion }) => {
  const [ordenValida, setOrdenValida] = useState(null); // null, true, false

  const handleEmitirFactura = () => {
    console.log('Emitiendo factura...');
    setGestion(prev => ({
      ...prev,
      estado: 'PENDIENTE_PAGO',
      historial: [...prev.historial, { fecha: new Date().toISOString(), usuario: 'Administración', accion: 'Emisión de factura' }],
    }));
  };

  return (
    <div>
      <p className="mb-4">Como miembro de <strong>Administración</strong>, debes verificar la orden de compra antes de emitir la factura.</p>
      
      {/* Paso 1: Preguntar si la orden es válida */}
      {ordenValida === null && (
        <div className="mb-4">
          <p className="font-semibold mb-2">¿La orden de compra es válida?</p>
          <button onClick={() => setOrdenValida(true)} className="bg-green-500 text-white py-1 px-3 rounded mr-2">Sí</button>
          <button onClick={() => setOrdenValida(false)} className="bg-red-500 text-white py-1 px-3 rounded">No</button>
        </div>
      )}

      {/* Flujo condicional basado en la respuesta */}
      {ordenValida === true && (
        <div>
          <p className="text-green-700 mb-4">La orden de compra ha sido validada. Ya puedes emitir la factura.</p>
          <button 
            onClick={handleEmitirFactura} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Emitir Factura
          </button>
        </div>
      )}

      {ordenValida === false && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
          <p className="font-bold">Acción Requerida</p>
          <p>La orden de compra no es válida. Por favor, verifica la orden y el estado con el cliente antes de continuar. El flujo está bloqueado hasta que se resuelva.</p>
          {/* Aquí se podría integrar un componente para enviar notificaciones o registrar el problema */}
        </div>
      )}
    </div>
  );
};

export default AccionFacturacion;
