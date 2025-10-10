import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const WorkflowHeatMap = ({ onDrillDown = () => {} }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const heatMapData = [
    {
      area: 'Ventas',
      stages: [
        { name: 'Prospección', value: 85, status: 'normal', tasks: 23 },
        { name: 'Calificación', value: 92, status: 'normal', tasks: 18 },
        { name: 'Propuesta', value: 67, status: 'warning', tasks: 12 },
        { name: 'Negociación', value: 45, status: 'critical', tasks: 8 },
        { name: 'Cierre', value: 78, status: 'normal', tasks: 15 }
      ]
    },
    {
      area: 'Marketing',
      stages: [
        { name: 'Planificación', value: 88, status: 'normal', tasks: 14 },
        { name: 'Creación', value: 72, status: 'warning', tasks: 19 },
        { name: 'Revisión', value: 35, status: 'critical', tasks: 7 },
        { name: 'Aprobación', value: 91, status: 'normal', tasks: 11 },
        { name: 'Publicación', value: 83, status: 'normal', tasks: 16 }
      ]
    },
    {
      area: 'Operaciones',
      stages: [
        { name: 'Recepción', value: 94, status: 'normal', tasks: 31 },
        { name: 'Procesamiento', value: 58, status: 'warning', tasks: 24 },
        { name: 'Control Calidad', value: 41, status: 'critical', tasks: 9 },
        { name: 'Empaque', value: 87, status: 'normal', tasks: 22 },
        { name: 'Envío', value: 76, status: 'normal', tasks: 18 }
      ]
    },
    {
      area: 'Finanzas',
      stages: [
        { name: 'Solicitud', value: 89, status: 'normal', tasks: 12 },
        { name: 'Validación', value: 73, status: 'warning', tasks: 8 },
        { name: 'Aprobación', value: 52, status: 'warning', tasks: 6 },
        { name: 'Procesamiento', value: 95, status: 'normal', tasks: 14 },
        { name: 'Archivo', value: 81, status: 'normal', tasks: 10 }
      ]
    }
  ];

  const getStatusColor = (status, value) => {
    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStatusIntensity = (value) => {
    if (value >= 80) return 'opacity-90';
    if (value >= 60) return 'opacity-70';
    if (value >= 40) return 'opacity-50';
    return 'opacity-30';
  };

  const handleCellClick = (area, stage) => {
    setSelectedCell({ area, stage });
    onDrillDown(area, stage);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Mapa de Calor de Flujos de Trabajo
          </h3>
          <p className="text-sm text-text-secondary">
            Identificación de cuellos de botella por área y etapa del proceso
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomIn"
            onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ZoomOut"
            onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={() => setZoomLevel(1)}
          />
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mb-6 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-xs text-text-secondary">Normal (&gt;70%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-xs text-text-secondary">Advertencia (40-70%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-xs text-text-secondary">Crítico (&lt;40%)</span>
        </div>
      </div>
      {/* Heat Map Grid */}
      <div 
        className="overflow-auto"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
      >
        <div className="min-w-max">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-3 text-sm font-medium text-text-secondary">Área</div>
            {heatMapData?.[0]?.stages?.map((stage, index) => (
              <div key={index} className="p-3 text-sm font-medium text-text-secondary text-center">
                {stage?.name}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {heatMapData?.map((area, areaIndex) => (
            <div key={areaIndex} className="grid grid-cols-6 gap-2 mb-2">
              <div className="p-3 text-sm font-medium text-text-primary bg-muted rounded-lg flex items-center">
                {area?.area}
              </div>
              {area?.stages?.map((stage, stageIndex) => (
                <div
                  key={stageIndex}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105
                    ${getStatusColor(stage?.status, stage?.value)} ${getStatusIntensity(stage?.value)}
                    ${selectedCell?.area === area?.area && selectedCell?.stage === stage?.name 
                      ? 'ring-2 ring-primary ring-offset-2' : ''
                    }
                  `}
                  onClick={() => handleCellClick(area?.area, stage)}
                >
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {stage?.value}%
                    </div>
                    <div className="text-xs text-white opacity-90">
                      {stage?.tasks} Tareas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Selected Cell Details */}
      {selectedCell && (
        <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary">
                {selectedCell?.area} - {selectedCell?.stage?.name}
              </h4>
              <p className="text-sm text-text-secondary">
                Rendimiento: {selectedCell?.stage?.value}% | Tareas: {selectedCell?.stage?.tasks}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => onDrillDown(selectedCell?.area, selectedCell?.stage)}
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowHeatMap;