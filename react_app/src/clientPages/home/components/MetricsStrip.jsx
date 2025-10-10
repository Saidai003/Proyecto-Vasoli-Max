import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = ({ metrics = {} }) => {
  const defaultMetrics = {
    taskVelocity: { value: 24.5, change: 12.3, trend: 'up' },
    avgCompletionTime: { value: 3.2, change: -8.1, trend: 'down' },
    overduePercentage: { value: 8.7, change: -2.4, trend: 'down' },
    workloadDistribution: { value: 78.3, change: 5.2, trend: 'up' }
  };

  const metricsData = { ...defaultMetrics, ...metrics };

  const sparklineData = {
    taskVelocity: [18, 22, 20, 25, 23, 28, 24.5],
    avgCompletionTime: [4.1, 3.8, 3.5, 3.2, 3.4, 3.1, 3.2],
    overduePercentage: [12.3, 11.1, 10.2, 9.8, 9.1, 8.9, 8.7],
    workloadDistribution: [72, 74, 76, 75, 77, 79, 78.3]
  };

  const generateSparklinePath = (data, width = 60, height = 20) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })?.join(' ');
  };

  const MetricCard = ({ title, value, unit, change, trend, sparklineKey, icon, color }) => {
    const isPositive = trend === 'up';
    const changeColor = isPositive ? 'text-success' : 'text-error';
    const sparklineColor = isPositive ? 'var(--color-success)' : 'var(--color-error)';

    return (
      <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-modal transition-smooth">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon name={icon} size={20} color="white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-semibold text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </div>
            </div>
          </div>
          
          {/* Sparkline */}
          <div className="flex flex-col items-end">
            <svg width="60" height="20" className="mb-1">
              <path
                d={generateSparklinePath(sparklineData?.[sparklineKey])}
                fill="none"
                stroke={sparklineColor}
                strokeWidth="2"
                className="opacity-80"
              />
            </svg>
            <div className={`flex items-center space-x-1 ${changeColor}`}>
              <Icon 
                name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          vs. período anterior
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Velocidad de Tareas"
        value={metricsData?.taskVelocity?.value}
        unit="tareas/día"
        change={metricsData?.taskVelocity?.change}
        trend={metricsData?.taskVelocity?.trend}
        sparklineKey="taskVelocity"
        icon="Zap"
        color="bg-accent"
      />
      <MetricCard
        title="Tiempo Promedio"
        value={metricsData?.avgCompletionTime?.value}
        unit="días"
        change={metricsData?.avgCompletionTime?.change}
        trend={metricsData?.avgCompletionTime?.trend}
        sparklineKey="avgCompletionTime"
        icon="Clock"
        color="bg-primary"
      />
      <MetricCard
        title="Tareas Vencidas"
        value={metricsData?.overduePercentage?.value}
        unit="%"
        change={metricsData?.overduePercentage?.change}
        trend={metricsData?.overduePercentage?.trend}
        sparklineKey="overduePercentage"
        icon="AlertTriangle"
        color="bg-warning"
      />
      <MetricCard
        title="Distribución de Carga"
        value={metricsData?.workloadDistribution?.value}
        unit="%"
        change={metricsData?.workloadDistribution?.change}
        trend={metricsData?.workloadDistribution?.trend}
        sparklineKey="workloadDistribution"
        icon="BarChart3"
        color="bg-success"
      />
    </div>
  );
};

export default MetricsStrip;