import React, { useState } from 'react';
import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendAnalysisChart = ({ data, onDrillDown }) => {
  const [chartType, setChartType] = useState('combined');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const mockData = [
    {
      period: 'Ene 2024',
      completedTasks: 245,
      cycleTime: 3.2,
      efficiencyScore: 87,
      bottleneckCount: 12,
      predictedCompletion: 260
    },
    {
      period: 'Feb 2024',
      completedTasks: 289,
      cycleTime: 2.8,
      efficiencyScore: 91,
      bottleneckCount: 8,
      predictedCompletion: 295
    },
    {
      period: 'Mar 2024',
      completedTasks: 312,
      cycleTime: 2.5,
      efficiencyScore: 94,
      bottleneckCount: 5,
      predictedCompletion: 320
    },
    {
      period: 'Abr 2024',
      completedTasks: 298,
      cycleTime: 2.9,
      efficiencyScore: 89,
      bottleneckCount: 9,
      predictedCompletion: 305
    },
    {
      period: 'May 2024',
      completedTasks: 334,
      cycleTime: 2.3,
      efficiencyScore: 96,
      bottleneckCount: 3,
      predictedCompletion: 340
    },
    {
      period: 'Jun 2024',
      completedTasks: 356,
      cycleTime: 2.1,
      efficiencyScore: 98,
      bottleneckCount: 2,
      predictedCompletion: 365
    },
    {
      period: 'Jul 2024',
      completedTasks: 342,
      cycleTime: 2.4,
      efficiencyScore: 95,
      bottleneckCount: 4,
      predictedCompletion: 350
    },
    {
      period: 'Ago 2024',
      completedTasks: 378,
      cycleTime: 2.0,
      efficiencyScore: 99,
      bottleneckCount: 1,
      predictedCompletion: 385
    },
    {
      period: 'Sep 2024',
      completedTasks: 391,
      cycleTime: 1.9,
      efficiencyScore: 100,
      bottleneckCount: 1,
      predictedCompletion: 400
    },
    {
      period: 'Oct 2024',
      completedTasks: 405,
      cycleTime: 1.8,
      efficiencyScore: 102,
      bottleneckCount: 0,
      predictedCompletion: 415
    }
  ];

  const chartTypes = [
    { value: 'combined', label: 'Combinado', icon: 'BarChart3' },
    { value: 'line', label: 'Líneas', icon: 'TrendingUp' },
    { value: 'bar', label: 'Barras', icon: 'BarChart' },
    { value: 'area', label: 'Área', icon: 'Activity' }
  ];

  const metrics = [
    { value: 'all', label: 'Todas las Métricas' },
    { value: 'tasks', label: 'Tareas Completadas' },
    { value: 'efficiency', label: 'Puntuación de Eficiencia' },
    { value: 'cycle', label: 'Tiempo de Ciclo' },
    { value: 'bottlenecks', label: 'Cuellos de Botella' }
  ];

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

  const handleDataPointClick = (data) => {
    if (onDrillDown) {
      onDrillDown(data);
    }
  };

  const renderChart = () => {
    const commonProps = {
      data: mockData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="completedTasks" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              name="Tareas Completadas"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              onClick={handleDataPointClick}
            />
            <Line 
              type="monotone" 
              dataKey="efficiencyScore" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              name="Eficiencia (%)"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        );
      
      case 'bar':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="completedTasks" 
              fill="var(--color-primary)" 
              name="Tareas Completadas"
              onClick={handleDataPointClick}
            />
            <Bar 
              dataKey="bottleneckCount" 
              fill="var(--color-warning)" 
              name="Cuellos de Botella"
            />
          </ComposedChart>
        );
      
      case 'area':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="completedTasks" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary)" 
              fillOpacity={0.3}
              name="Tareas Completadas"
            />
            <Area 
              type="monotone" 
              dataKey="predictedCompletion" 
              stroke="var(--color-accent)" 
              fill="var(--color-accent)" 
              fillOpacity={0.1}
              name="Predicción"
            />
          </ComposedChart>
        );
      
      default: // combined
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
            <YAxis yAxisId="left" stroke="var(--color-text-secondary)" />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-secondary)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="completedTasks" 
              fill="var(--color-primary)" 
              name="Tareas Completadas"
              onClick={handleDataPointClick}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="efficiencyScore" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              name="Eficiencia (%)"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="cycleTime" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              name="Tiempo de Ciclo (días)"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        );
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Análisis de Tendencias</h3>
          <p className="text-sm text-text-secondary">Evolución de métricas clave con análisis predictivo</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {chartTypes?.map((type) => (
            <Button
              key={type?.value}
              variant={chartType === type?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType(type?.value)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart Container */}
      <div className="w-full h-96 mb-4" aria-label="Gráfico de Análisis de Tendencias">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Chart Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">Mostrar:</span>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-1 border border-border rounded text-sm bg-surface"
          >
            {metrics?.map((metric) => (
              <option key={metric?.value} value={metric?.value}>
                {metric?.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize2"
            iconPosition="left"
          >
            Pantalla Completa
          </Button>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Insights Clave</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-text-secondary">Eficiencia mejoró 15% este trimestre</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-text-secondary">Tiempo de ciclo reducido 44%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-warning" />
            <span className="text-text-secondary">Predicción: +8% próximo mes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;