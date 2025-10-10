import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetricsStrip = ({ metrics = {} }) => {
  const kpiCards = [
    {
      id: 'active-workflows',
      title: 'Flujos Activos',
      value: metrics?.activeWorkflows || 127,
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'bg-blue-500'
    },
    {
      id: 'pending-tasks',
      title: 'Tareas Pendientes',
      value: metrics?.pendingTasks || 342,
      change: '-12.5%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'bg-orange-500'
    },
    {
      id: 'completion-rate',
      title: 'Tasa de Finalización',
      value: `${metrics?.completionRate || 87.3}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'bg-green-500'
    },
    {
      id: 'avg-processing-time',
      title: 'Tiempo Promedio',
      value: `${metrics?.avgProcessingTime || 4.2}h`,
      change: '-0.8h',
      changeType: 'positive',
      icon: 'Timer',
      color: 'bg-purple-500'
    },
    {
      id: 'bottleneck-count',
      title: 'Cuellos de Botella',
      value: metrics?.bottleneckCount || 7,
      change: '+2',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'bg-red-500'
    },
    {
      id: 'team-utilization',
      title: 'Utilización del Equipo',
      value: `${metrics?.teamUtilization || 73.8}%`,
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpiCards?.map((card) => (
        <div key={card?.id} className="bg-surface border border-border rounded-lg p-4 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${card?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={20} color="white" />
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              {card?.title}
            </h3>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-text-primary">
                {card?.value}
              </span>
              <span className={`text-xs font-medium ${
                card?.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card?.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetricsStrip;