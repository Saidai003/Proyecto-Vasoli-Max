import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowTemplateRanking = ({ onTemplateSelect }) => {
  const [sortBy, setSortBy] = useState('performance');
  const [viewMode, setViewMode] = useState('list');

  const mockTemplates = [
    {
      id: 1,
      name: 'Aprobación de Documentos',
      category: 'Administrativo',
      completionRate: 94.5,
      avgCycleTime: 2.3,
      totalTasks: 1247,
      efficiency: 96,
      trend: 'up',
      trendValue: 5.2,
      bottlenecks: 1,
      lastUsed: '2024-10-09',
      color: 'var(--color-success)'
    },
    {
      id: 2,
      name: 'Revisión de Código',
      category: 'Desarrollo',
      completionRate: 91.2,
      avgCycleTime: 1.8,
      totalTasks: 892,
      efficiency: 93,
      trend: 'up',
      trendValue: 3.1,
      bottlenecks: 0,
      lastUsed: '2024-10-09',
      color: 'var(--color-primary)'
    },
    {
      id: 3,
      name: 'Proceso de Contratación',
      category: 'RRHH',
      completionRate: 87.8,
      avgCycleTime: 5.2,
      totalTasks: 156,
      efficiency: 89,
      trend: 'down',
      trendValue: -2.3,
      bottlenecks: 3,
      lastUsed: '2024-10-08',
      color: 'var(--color-accent)'
    },
    {
      id: 4,
      name: 'Solicitud de Compras',
      category: 'Finanzas',
      completionRate: 89.4,
      avgCycleTime: 3.1,
      totalTasks: 634,
      efficiency: 91,
      trend: 'up',
      trendValue: 1.8,
      bottlenecks: 2,
      lastUsed: '2024-10-09',
      color: 'var(--color-warning)'
    },
    {
      id: 5,
      name: 'Atención al Cliente',
      category: 'Soporte',
      completionRate: 92.7,
      avgCycleTime: 0.8,
      totalTasks: 2341,
      efficiency: 95,
      trend: 'up',
      trendValue: 4.5,
      bottlenecks: 1,
      lastUsed: '2024-10-09',
      color: 'var(--color-secondary)'
    },
    {
      id: 6,
      name: 'Campaña de Marketing',
      category: 'Marketing',
      completionRate: 85.3,
      avgCycleTime: 7.2,
      totalTasks: 298,
      efficiency: 86,
      trend: 'stable',
      trendValue: 0.2,
      bottlenecks: 4,
      lastUsed: '2024-10-07',
      color: 'var(--color-error)'
    }
  ];

  const sortOptions = [
    { value: 'performance', label: 'Rendimiento' },
    { value: 'completion', label: 'Tasa de Finalización' },
    { value: 'efficiency', label: 'Eficiencia' },
    { value: 'usage', label: 'Uso Frecuente' },
    { value: 'cycle', label: 'Tiempo de Ciclo' }
  ];

  const getSortedTemplates = () => {
    const sorted = [...mockTemplates];
    switch (sortBy) {
      case 'completion':
        return sorted?.sort((a, b) => b?.completionRate - a?.completionRate);
      case 'efficiency':
        return sorted?.sort((a, b) => b?.efficiency - a?.efficiency);
      case 'usage':
        return sorted?.sort((a, b) => b?.totalTasks - a?.totalTasks);
      case 'cycle':
        return sorted?.sort((a, b) => a?.avgCycleTime - b?.avgCycleTime);
      default:
        return sorted?.sort((a, b) => b?.efficiency - a?.efficiency);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Minus" size={14} className="text-text-secondary" />;
    }
  };

  const getPerformanceColor = (efficiency) => {
    if (efficiency >= 95) return 'text-success';
    if (efficiency >= 90) return 'text-accent';
    if (efficiency >= 85) return 'text-warning';
    return 'text-error';
  };

  const renderListView = () => (
    <div className="space-y-3">
      {getSortedTemplates()?.map((template, index) => (
        <div
          key={template?.id}
          className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer hover-transition"
          onClick={() => onTemplateSelect && onTemplateSelect(template)}
        >
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium"
                 style={{ backgroundColor: template?.color }}>
              {index + 1}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-text-primary">{template?.name}</h4>
                {getTrendIcon(template?.trend)}
                <span className={`text-xs ${template?.trend === 'up' ? 'text-success' : template?.trend === 'down' ? 'text-error' : 'text-text-secondary'}`}>
                  {template?.trend !== 'stable' && (template?.trendValue > 0 ? '+' : '')}{template?.trendValue}%
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>{template?.category}</span>
                <span>•</span>
                <span>{template?.totalTasks} Tareas</span>
                <span>•</span>
                <span>{template?.avgCycleTime} días promedio</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-lg font-semibold ${getPerformanceColor(template?.efficiency)}`}>
                {template?.efficiency}%
              </div>
              <div className="text-xs text-text-secondary">Eficiencia</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-text-primary">
                {template?.completionRate}%
              </div>
              <div className="text-xs text-text-secondary">Finalización</div>
            </div>
            
            <div className="w-16">
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${template?.completionRate}%`,
                    backgroundColor: template?.color
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {getSortedTemplates()?.map((template, index) => (
        <div
          key={template?.id}
          className="p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer hover-transition"
          onClick={() => onTemplateSelect && onTemplateSelect(template)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium"
                   style={{ backgroundColor: template?.color }}>
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{template?.name}</h4>
                <p className="text-xs text-text-secondary">{template?.category}</p>
              </div>
            </div>
            {getTrendIcon(template?.trend)}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className={`text-xl font-bold ${getPerformanceColor(template?.efficiency)}`}>
                {template?.efficiency}%
              </div>
              <div className="text-xs text-text-secondary">Eficiencia</div>
            </div>
            <div>
              <div className="text-xl font-bold text-text-primary">
                {template?.completionRate}%
              </div>
              <div className="text-xs text-text-secondary">Finalización</div>
            </div>
          </div>
          
          <div className="w-full bg-border rounded-full h-2 mb-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${template?.completionRate}%`,
                backgroundColor: template?.color
              }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{template?.totalTasks} Tareas</span>
            <span>{template?.avgCycleTime} días</span>
            {template?.bottlenecks > 0 && (
              <span className="text-warning">{template?.bottlenecks} cuellos</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Ranking de Plantillas</h3>
          <p className="text-sm text-text-secondary">Rendimiento de plantillas de flujo de trabajo</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 border border-border rounded text-sm bg-surface"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            iconName="List"
          />
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            iconName="Grid3X3"
          />
        </div>
      </div>
      {viewMode === 'list' ? renderListView() : renderGridView()}
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-text-primary">6</div>
            <div className="text-sm text-text-secondary">Plantillas Activas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">91.2%</div>
            <div className="text-sm text-text-secondary">Promedio Eficiencia</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">3.2</div>
            <div className="text-sm text-text-secondary">Días Promedio</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">11</div>
            <div className="text-sm text-text-secondary">Cuellos Totales</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTemplateRanking;