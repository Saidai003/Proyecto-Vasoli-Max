import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsFeed = ({ onActionClick = () => {} }) => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Cuello de botella crítico detectado',
      message: 'El proceso de aprobación en Marketing tiene 15 Tareas pendientes por más de 4 horas.',
      timestamp: new Date(Date.now() - 300000),
      area: 'Marketing',
      actionable: true,
      actions: ['Reasignar', 'Escalar']
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Tiempo de procesamiento elevado',
      message: 'Las Tareas de Ventas están tomando 2.3x más tiempo del promedio.',
      timestamp: new Date(Date.now() - 900000),
      area: 'Ventas',
      actionable: true,
      actions: ['Investigar', 'Optimizar']
    },
    {
      id: 3,
      severity: 'info',
      title: 'Nuevo flujo de trabajo iniciado',
      message: 'Se ha iniciado el proceso de onboarding para 5 nuevos empleados.',
      timestamp: new Date(Date.now() - 1800000),
      area: 'RRHH',
      actionable: false,
      actions: []
    },
    {
      id: 4,
      severity: 'critical',
      title: 'Fallo en integración de sistema',
      message: 'La conexión con el sistema ERP está experimentando intermitencias.',
      timestamp: new Date(Date.now() - 2700000),
      area: 'IT',
      actionable: true,
      actions: ['Reiniciar', 'Contactar Soporte']
    },
    {
      id: 5,
      severity: 'warning',
      title: 'Capacidad del equipo al límite',
      message: 'El equipo de Operaciones está al 95% de su capacidad actual.',
      timestamp: new Date(Date.now() - 3600000),
      area: 'Operaciones',
      actionable: true,
      actions: ['Redistribuir', 'Contratar Temporal']
    },
    {
      id: 6,
      severity: 'info',
      title: 'Reporte mensual generado',
      message: 'El reporte de productividad mensual está disponible para revisión.',
      timestamp: new Date(Date.now() - 7200000),
      area: 'Finanzas',
      actionable: false,
      actions: []
    }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        color: 'border-red-500 bg-red-50',
        icon: 'AlertCircle',
        iconColor: 'text-red-600',
        badge: 'bg-red-100 text-red-800'
      },
      warning: {
        color: 'border-orange-500 bg-orange-50',
        icon: 'AlertTriangle',
        iconColor: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800'
      },
      info: {
        color: 'border-blue-500 bg-blue-50',
        icon: 'Info',
        iconColor: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      }
    };
    return configs?.[severity] || configs?.info;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `hace ${minutes}m`;
    if (hours < 24) return `hace ${hours}h`;
    return timestamp?.toLocaleDateString('es-ES');
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  const severityCounts = {
    critical: alerts?.filter(a => a?.severity === 'critical')?.length,
    warning: alerts?.filter(a => a?.severity === 'warning')?.length,
    info: alerts?.filter(a => a?.severity === 'info')?.length
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Alertas en Tiempo Real
          </h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary">En vivo</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { key: 'all', label: 'Todas', count: alerts?.length },
            { key: 'critical', label: 'Críticas', count: severityCounts?.critical },
            { key: 'warning', label: 'Advertencias', count: severityCounts?.warning },
            { key: 'info', label: 'Info', count: severityCounts?.info }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setFilter(tab?.key)}
              className={`
                flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors
                ${filter === tab?.key 
                  ? 'bg-surface text-text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {tab?.label} ({tab?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-4">
          {filteredAlerts?.map((alert) => {
            const config = getSeverityConfig(alert?.severity);
            
            return (
              <div
                key={alert?.id}
                className={`border-l-4 rounded-lg p-4 ${config?.color} hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={config?.icon} 
                    size={18} 
                    className={`mt-0.5 ${config?.iconColor}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {alert?.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.badge}`}>
                        {alert?.area}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {alert?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(alert?.timestamp)}
                      </span>
                      
                      {alert?.actionable && alert?.actions?.length > 0 && (
                        <div className="flex space-x-2">
                          {alert?.actions?.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="xs"
                              onClick={() => onActionClick(alert?.id, action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            {filteredAlerts?.length} alerta{filteredAlerts?.length !== 1 ? 's' : ''}
          </span>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            Ver Todas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertsFeed;