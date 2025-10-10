import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatusIndicator = ({ refreshInterval = 15 }) => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [nextUpdate, setNextUpdate] = useState(refreshInterval);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextUpdate(prev => {
        if (prev <= 1) {
          setLastUpdate(new Date());
          // Simulate occasional connection issues
          const random = Math.random();
          if (random < 0.05) {
            setConnectionStatus('error');
          } else if (random < 0.15) {
            setConnectionStatus('warning');
          } else {
            setConnectionStatus('connected');
          }
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success',
          icon: 'Wifi',
          label: 'Conectado',
          description: 'Datos actualizándose en tiempo real'
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning',
          icon: 'WifiOff',
          label: 'Conexión Lenta',
          description: 'Algunos datos pueden estar desactualizados'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error',
          icon: 'AlertCircle',
          label: 'Sin Conexión',
          description: 'Mostrando datos en caché'
        };
      default:
        return {
          color: 'text-text-secondary',
          bgColor: 'bg-text-secondary',
          icon: 'Loader',
          label: 'Conectando...',
          description: 'Estableciendo conexión'
        };
    }
  };

  const status = getStatusConfig();

  const formatTime = (date) => {
    return date?.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${status?.bgColor}`} />
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${status?.bgColor} animate-ping opacity-75`} />
        </div>
        
        <div>
          <div className="flex items-center space-x-2">
            <Icon name={status?.icon} size={16} className={status?.color} />
            <span className={`text-sm font-medium ${status?.color}`}>
              {status?.label}
            </span>
          </div>
          <p className="text-xs text-text-secondary">{status?.description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-text-primary">
          Última actualización: {formatTime(lastUpdate)}
        </div>
        <div className="text-xs text-text-secondary">
          Próxima en: {nextUpdate} min
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatusIndicator;