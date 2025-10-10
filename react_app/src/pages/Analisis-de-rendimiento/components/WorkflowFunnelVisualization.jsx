import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowFunnelVisualization = ({ onStageClick }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('approval');
  const [showBottlenecks, setShowBottlenecks] = useState(true);

  const workflowOptions = [
    { value: 'approval', label: 'Aprobación de Documentos' },
    { value: 'hiring', label: 'Proceso de Contratación' },
    { value: 'purchase', label: 'Solicitud de Compras' },
    { value: 'development', label: 'Desarrollo de Software' }
  ];

  const mockFunnelData = {
    approval: [
      {
        stage: 'Iniciado',
        count: 1000,
        percentage: 100,
        conversionRate: 100,
        avgTime: 0,
        bottleneckRisk: 'low',
        description: 'Documentos enviados para revisión'
      },
      {
        stage: 'Revisión Inicial',
        count: 950,
        percentage: 95,
        conversionRate: 95,
        avgTime: 1.2,
        bottleneckRisk: 'low',
        description: 'Primera revisión completada'
      },
      {
        stage: 'Correcciones',
        count: 780,
        percentage: 78,
        conversionRate: 82.1,
        avgTime: 2.8,
        bottleneckRisk: 'medium',
        description: 'Documentos con correcciones aplicadas'
      },
      {
        stage: 'Revisión Final',
        count: 720,
        percentage: 72,
        conversionRate: 92.3,
        avgTime: 1.5,
        bottleneckRisk: 'low',
        description: 'Revisión final completada'
      },
      {
        stage: 'Aprobación',
        count: 680,
        percentage: 68,
        conversionRate: 94.4,
        avgTime: 0.8,
        bottleneckRisk: 'low',
        description: 'Documentos aprobados'
      },
      {
        stage: 'Archivado',
        count: 675,
        percentage: 67.5,
        conversionRate: 99.3,
        avgTime: 0.3,
        bottleneckRisk: 'low',
        description: 'Proceso completado y archivado'
      }
    ]
  };

  const currentData = mockFunnelData?.[selectedWorkflow] || mockFunnelData?.approval;

  const getBottleneckColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      default:
        return 'bg-success';
    }
  };

  const getBottleneckTextColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const calculateDropoff = (current, previous) => {
    if (!previous) return 0;
    return ((previous?.count - current?.count) / previous?.count * 100)?.toFixed(1);
  };

  const handleStageClick = (stage, index) => {
    if (onStageClick) {
      onStageClick({ stage, index, data: stage });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Embudo de Flujo de Trabajo</h3>
          <p className="text-sm text-text-secondary">Progresión de Tareas por etapas con análisis de conversión</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedWorkflow}
            onChange={(e) => setSelectedWorkflow(e?.target?.value)}
            className="px-3 py-2 border border-border rounded text-sm bg-surface"
          >
            {workflowOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant={showBottlenecks ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowBottlenecks(!showBottlenecks)}
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Cuellos de Botella
          </Button>
        </div>
      </div>
      {/* Funnel Visualization */}
      <div className="relative">
        <div className="space-y-4">
          {currentData?.map((stage, index) => {
            const previousStage = index > 0 ? currentData?.[index - 1] : null;
            const dropoffRate = calculateDropoff(stage, previousStage);
            const maxWidth = 100;
            const stageWidth = (stage?.percentage / 100) * maxWidth;
            
            return (
              <div key={index} className="relative">
                {/* Stage Bar */}
                <div
                  className="relative bg-gradient-to-r from-primary to-accent rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: `${stageWidth}%`, minHeight: '80px' }}
                  onClick={() => handleStageClick(stage, index)}
                >
                  <div className="flex items-center justify-between h-full px-6 py-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-white">{stage?.stage}</h4>
                        {showBottlenecks && (
                          <div className={`w-3 h-3 rounded-full ${getBottleneckColor(stage?.bottleneckRisk)}`} />
                        )}
                      </div>
                      <p className="text-sm text-white/80 mb-1">{stage?.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/70">
                        <span>Tiempo promedio: {stage?.avgTime} días</span>
                        {index > 0 && (
                          <span>Conversión: {stage?.conversionRate}%</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{stage?.count?.toLocaleString()}</div>
                      <div className="text-sm text-white/80">{stage?.percentage}%</div>
                    </div>
                  </div>
                </div>
                {/* Dropoff Indicator */}
                {index > 0 && dropoffRate > 0 && (
                  <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <Icon name="ArrowDown" size={16} className="text-error" />
                    <span className="text-sm text-error font-medium">-{dropoffRate}%</span>
                  </div>
                )}
                {/* Bottleneck Details */}
                {showBottlenecks && stage?.bottleneckRisk !== 'low' && (
                  <div className="absolute -bottom-2 left-6 bg-popover border border-border rounded px-2 py-1 text-xs modal-shadow">
                    <span className={getBottleneckTextColor(stage?.bottleneckRisk)}>
                      Riesgo {stage?.bottleneckRisk === 'high' ? 'Alto' : 'Medio'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Summary Statistics */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {currentData?.[currentData?.length - 1]?.percentage}%
            </div>
            <div className="text-sm text-text-secondary">Tasa de Finalización</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {currentData?.reduce((sum, stage) => sum + stage?.avgTime, 0)?.toFixed(1)}
            </div>
            <div className="text-sm text-text-secondary">Tiempo Total (días)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {currentData?.filter(stage => stage?.bottleneckRisk !== 'low')?.length}
            </div>
            <div className="text-sm text-text-secondary">Cuellos de Botella</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {Math.round(currentData?.reduce((sum, stage) => sum + stage?.conversionRate, 0) / currentData?.length)}%
            </div>
            <div className="text-sm text-text-secondary">Conversión Promedio</div>
          </div>
        </div>
      </div>
      {/* Stage Details */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-text-primary mb-3">Detalles por Etapa</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData?.map((stage, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
              <div>
                <div className="font-medium text-text-primary text-sm">{stage?.stage}</div>
                <div className="text-xs text-text-secondary">{stage?.count} Tareas</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getBottleneckTextColor(stage?.bottleneckRisk)}`}>
                  {stage?.conversionRate}%
                </div>
                <div className="text-xs text-text-secondary">{stage?.avgTime}d</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowFunnelVisualization;