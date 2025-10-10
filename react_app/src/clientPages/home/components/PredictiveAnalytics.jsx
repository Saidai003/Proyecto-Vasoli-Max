import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PredictiveAnalytics = ({ tasks = [], onPredictionClick }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [confidenceLevel, setConfidenceLevel] = useState('medium');

  // Mock predictive analytics data
  const predictions = {
    completionEstimates: [
      {
        taskId: 1,
        taskTitle: "Análisis de mercado Q4",
        currentProgress: 75,
        estimatedCompletion: new Date(2025, 9, 14),
        confidence: 85,
        factors: ["Velocidad actual", "Recursos disponibles", "Dependencias"],
        riskLevel: "low"
      },
      {
        taskId: 2,
        taskTitle: "Desarrollo módulo pagos",
        currentProgress: 45,
        estimatedCompletion: new Date(2025, 9, 28),
        confidence: 72,
        factors: ["Complejidad técnica", "Disponibilidad del equipo"],
        riskLevel: "medium"
      },
      {
        taskId: 4,
        taskTitle: "Campaña redes sociales",
        currentProgress: 0,
        estimatedCompletion: new Date(2025, 10, 5),
        confidence: 60,
        factors: ["Dependencias no resueltas", "Recursos limitados"],
        riskLevel: "high"
      }
    ],
    bottleneckPredictions: [
      {
        area: "Tecnología",
        predictedBottleneck: "Revisión de código",
        impact: "high",
        timeframe: "Próximos 7 días",
        affectedTasks: 3,
        recommendation: "Asignar revisor adicional"
      },
      {
        area: "Marketing",
        predictedBottleneck: "Aprobación de contenido",
        impact: "medium",
        timeframe: "Próximos 14 días",
        affectedTasks: 2,
        recommendation: "Establecer proceso de aprobación rápida"
      }
    ],
    resourceOptimization: {
      overutilized: [
        { name: "Carlos López", utilization: 120, department: "Tecnología" },
        { name: "Ana García", utilization: 110, department: "Marketing" }
      ],
      underutilized: [
        { name: "Diego Morales", utilization: 65, department: "Operaciones" },
        { name: "Sofía Hernández", utilization: 70, department: "Recursos Humanos" }
      ]
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysFromNow = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={20} />
            <h3 className="font-medium text-foreground">Análisis Predictivo</h3>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e?.target?.value)}
              className="text-sm border border-border rounded px-3 py-1 bg-background"
            >
              <option value="7d">Próximos 7 días</option>
              <option value="30d">Próximos 30 días</option>
              <option value="90d">Próximos 90 días</option>
            </select>
            
            <select
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(e?.target?.value)}
              className="text-sm border border-border rounded px-3 py-1 bg-background"
            >
              <option value="high">Alta confianza (&gt;80%)</option>
              <option value="medium">Media confianza (&gt;60%)</option>
              <option value="low">Baja confianza (&gt;40%)</option>
            </select>
          </div>
        </div>
      </div>
      {/* Completion Estimates */}
      <div className="bg-surface border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={18} />
            <h4 className="font-medium text-foreground">Estimaciones de Finalización</h4>
            <span className="text-sm text-muted-foreground">
              Con intervalos de confianza
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {predictions?.completionEstimates?.map((prediction) => {
            const daysFromNow = calculateDaysFromNow(prediction?.estimatedCompletion);
            
            return (
              <div
                key={prediction?.taskId}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-smooth cursor-pointer"
                onClick={() => onPredictionClick?.(prediction)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-1">
                      {prediction?.taskTitle}
                    </h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Progreso: {prediction?.currentProgress}%</span>
                      <span className={getRiskColor(prediction?.riskLevel)}>
                        Riesgo: {prediction?.riskLevel === 'low' ? 'Bajo' : 
                                prediction?.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">
                      {formatDate(prediction?.estimatedCompletion)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {daysFromNow > 0 ? `En ${daysFromNow} días` : 
                       daysFromNow === 0 ? 'Hoy' : `${Math.abs(daysFromNow)} días de retraso`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={14} />
                    <span className={`text-sm font-medium ${getConfidenceColor(prediction?.confidence)}`}>
                      Confianza: {prediction?.confidence}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Info" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {prediction?.factors?.length} factores analizados
                    </span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${prediction?.currentProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottleneck Predictions */}
      <div className="bg-surface border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={18} />
            <h4 className="font-medium text-foreground">Predicción de Cuellos de Botella</h4>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {predictions?.bottleneckPredictions?.map((bottleneck, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-foreground">{bottleneck?.area}</h5>
                  <p className="text-sm text-muted-foreground">{bottleneck?.predictedBottleneck}</p>
                </div>
                <span className={`text-sm font-medium ${getImpactColor(bottleneck?.impact)}`}>
                  Impacto {bottleneck?.impact === 'high' ? 'Alto' : 
                          bottleneck?.impact === 'medium' ? 'Medio' : 'Bajo'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Timeframe:</span>
                  <span className="ml-2 text-foreground">{bottleneck?.timeframe}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tareas afectadas:</span>
                  <span className="ml-2 text-foreground">{bottleneck?.affectedTasks}</span>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-accent/5 border border-accent/20 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Recomendación:</span>
                </div>
                <p className="text-sm text-foreground mt-1">{bottleneck?.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Resource Optimization */}
      <div className="bg-surface border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={18} />
            <h4 className="font-medium text-foreground">Optimización de Recursos</h4>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overutilized */}
            <div>
              <h5 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2 text-error" />
                Sobreutilizados
              </h5>
              <div className="space-y-2">
                {predictions?.resourceOptimization?.overutilized?.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-error/5 border border-error/20 rounded">
                    <div>
                      <div className="font-medium text-foreground">{person?.name}</div>
                      <div className="text-sm text-muted-foreground">{person?.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-error">{person?.utilization}%</div>
                      <div className="text-xs text-muted-foreground">Utilización</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Underutilized */}
            <div>
              <h5 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="TrendingDown" size={16} className="mr-2 text-success" />
                Subutilizados
              </h5>
              <div className="space-y-2">
                {predictions?.resourceOptimization?.underutilized?.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded">
                    <div>
                      <div className="font-medium text-foreground">{person?.name}</div>
                      <div className="text-sm text-muted-foreground">{person?.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-success">{person?.utilization}%</div>
                      <div className="text-xs text-muted-foreground">Utilización</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={18} className="text-primary mt-0.5" />
              <div>
                <h6 className="font-medium text-primary mb-1">Recomendación de Optimización</h6>
                <p className="text-sm text-foreground">
                  Considera reasignar 1-2 tareas de Carlos López y Ana García hacia Diego Morales y Sofía Hernández 
                  para equilibrar la carga de trabajo y mejorar la eficiencia general del equipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;