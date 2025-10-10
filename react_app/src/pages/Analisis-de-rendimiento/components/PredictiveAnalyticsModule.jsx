import React, { useState } from 'react';
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const PredictiveAnalyticsModule = ({ onRecommendationClick }) => {
  const [selectedModel, setSelectedModel] = useState('completion');
  const [timeHorizon, setTimeHorizon] = useState('30days');
  const [confidenceLevel, setConfidenceLevel] = useState('high');

  const modelOptions = [
    { value: 'completion', label: 'Tiempo de Finalización', icon: 'Clock' },
    { value: 'capacity', label: 'Planificación de Capacidad', icon: 'Users' },
    { value: 'bottleneck', label: 'Predicción de Cuellos', icon: 'AlertTriangle' },
    { value: 'efficiency', label: 'Eficiencia Futura', icon: 'TrendingUp' }
  ];

  const timeHorizonOptions = [
    { value: '7days', label: '7 días' },
    { value: '30days', label: '30 días' },
    { value: '90days', label: '90 días' },
    { value: '180days', label: '6 meses' }
  ];

  const mockPredictionData = {
    completion: [
      { period: 'Sem 1', actual: 245, predicted: 250, confidence: 95, lower: 235, upper: 265 },
      { period: 'Sem 2', actual: 289, predicted: 285, confidence: 93, lower: 270, upper: 300 },
      { period: 'Sem 3', actual: 312, predicted: 315, confidence: 91, lower: 295, upper: 335 },
      { period: 'Sem 4', actual: null, predicted: 340, confidence: 88, lower: 315, upper: 365 },
      { period: 'Sem 5', actual: null, predicted: 355, confidence: 85, lower: 325, upper: 385 },
      { period: 'Sem 6', actual: null, predicted: 370, confidence: 82, lower: 335, upper: 405 }
    ],
    capacity: [
      { period: 'Sem 1', current: 85, predicted: 88, optimal: 75, bottleneck: 95 },
      { period: 'Sem 2', current: 92, predicted: 95, optimal: 75, bottleneck: 95 },
      { period: 'Sem 3', current: 78, predicted: 82, optimal: 75, bottleneck: 95 },
      { period: 'Sem 4', current: null, predicted: 89, optimal: 75, bottleneck: 95 },
      { period: 'Sem 5', current: null, predicted: 93, optimal: 75, bottleneck: 95 },
      { period: 'Sem 6', current: null, predicted: 87, optimal: 75, bottleneck: 95 }
    ]
  };

  const mockRecommendations = [
    {
      id: 1,
      type: 'capacity',
      priority: 'high',
      title: 'Incrementar Capacidad en Desarrollo',
      description: 'Se predice un aumento del 25% en la carga de trabajo para las próximas 4 semanas.',
      impact: 'Reducir tiempo de ciclo en 1.2 días',
      confidence: 92,
      action: 'Asignar 2 desarrolladores adicionales',
      timeline: '1-2 semanas'
    },
    {
      id: 2,
      type: 'bottleneck',
      priority: 'medium',
      title: 'Optimizar Proceso de Revisión',
      description: 'El análisis predictivo indica posibles cuellos de botella en la etapa de revisión.',
      impact: 'Mejorar eficiencia en 15%',
      confidence: 87,
      action: 'Implementar revisión paralela',
      timeline: '2-3 semanas'
    },
    {
      id: 3,
      type: 'efficiency',
      priority: 'low',
      title: 'Automatizar Tareas Repetitivas',
      description: 'Oportunidad de automatización identificada en procesos administrativos.',
      impact: 'Ahorrar 8 horas/semana',
      confidence: 78,
      action: 'Desarrollar script de automatización',
      timeline: '3-4 semanas'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-accent';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 border-error/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-accent/10 border-accent/20';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 modal-shadow">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-medium">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPredictionChart = () => {
    const data = mockPredictionData?.[selectedModel] || mockPredictionData?.completion;
    
    if (selectedModel === 'completion') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="upper"
              stackId="1"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
              fillOpacity={0.1}
              name="Límite Superior"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stackId="1"
              stroke="var(--color-accent)"
              fill="var(--color-surface)"
              fillOpacity={0}
              name="Límite Inferior"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Datos Reales"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="var(--color-success)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Predicción"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
          <YAxis stroke="var(--color-text-secondary)" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="current" fill="var(--color-primary)" name="Actual" />
          <Bar dataKey="predicted" fill="var(--color-success)" name="Predicción" />
          <Bar dataKey="optimal" fill="var(--color-accent)" name="Óptimo" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Análisis Predictivo</h3>
          <p className="text-sm text-text-secondary">Predicciones basadas en IA y recomendaciones de optimización</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e?.target?.value)}
            className="px-3 py-1 border border-border rounded text-sm bg-surface"
          >
            {timeHorizonOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Actualizar
          </Button>
        </div>
      </div>
      {/* Model Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modelOptions?.map((model) => (
          <Button
            key={model?.value}
            variant={selectedModel === model?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedModel(model?.value)}
            iconName={model?.icon}
            iconPosition="left"
          >
            {model?.label}
          </Button>
        ))}
      </div>
      {/* Prediction Chart */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-text-primary">
            Predicciones - {modelOptions?.find(m => m?.value === selectedModel)?.label}
          </h4>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Datos Reales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Predicción</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent/30 rounded"></div>
              <span>Intervalo de Confianza</span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-80" aria-label="Gráfico de Predicciones">
          {renderPredictionChart()}
        </div>
      </div>
      {/* Confidence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">92%</div>
          <div className="text-sm text-text-secondary">Precisión del Modelo</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">±5.2%</div>
          <div className="text-sm text-text-secondary">Margen de Error</div>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">15</div>
          <div className="text-sm text-text-secondary">Días de Datos</div>
        </div>
      </div>
      {/* Recommendations */}
      <div>
        <h4 className="font-medium text-text-primary mb-4">Recomendaciones de Optimización</h4>
        <div className="space-y-4">
          {mockRecommendations?.map((rec) => (
            <div
              key={rec?.id}
              className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 hover-transition ${getPriorityBg(rec?.priority)}`}
              onClick={() => onRecommendationClick && onRecommendationClick(rec)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${rec?.priority === 'high' ? 'bg-error' : rec?.priority === 'medium' ? 'bg-warning' : 'bg-accent'}`} />
                  <h5 className="font-medium text-text-primary">{rec?.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec?.priority)} bg-current/10`}>
                    {rec?.priority === 'high' ? 'Alta' : rec?.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
                <div className="text-sm text-text-secondary">{rec?.confidence}% confianza</div>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{rec?.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-text-primary">Impacto:</span>
                  <p className="text-text-secondary">{rec?.impact}</p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">Acción:</span>
                  <p className="text-text-secondary">{rec?.action}</p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">Tiempo:</span>
                  <p className="text-text-secondary">{rec?.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Model Information */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>Última actualización: {new Date()?.toLocaleDateString('es-ES')}</span>
            <span>•</span>
            <span>Modelo: ML v2.1</span>
            <span>•</span>
            <span>Datos de entrenamiento: 6 meses</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Info"
            iconPosition="left"
          >
            Detalles del Modelo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsModule;