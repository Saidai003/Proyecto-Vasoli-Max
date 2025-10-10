import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControlsPanel = ({ 
  onEnvironmentChange = () => {},
  onAutoRefreshToggle = () => {},
  onTimeRangeChange = () => {},
  onAreaFilterChange = () => {},
  autoRefreshEnabled = true,
  currentEnvironment = 'production',
  currentTimeRange = 'today',
  selectedAreas = []
}) => {
  const [isAutoRefresh, setIsAutoRefresh] = useState(autoRefreshEnabled);

  const environmentOptions = [
    { value: 'production', label: 'Producción' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Desarrollo' }
  ];

  const timeRangeOptions = [
    { value: 'realtime', label: 'Tiempo Real' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' }
  ];

  const areaOptions = [
    { value: 'ventas', label: 'Ventas' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operaciones', label: 'Operaciones' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'rrhh', label: 'Recursos Humanos' },
    { value: 'it', label: 'Tecnología' }
  ];

  const handleAutoRefreshToggle = () => {
    setIsAutoRefresh(!isAutoRefresh);
    onAutoRefreshToggle(!isAutoRefresh);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Environment Selector */}
        <div>
          <Select
            label="Entorno"
            options={environmentOptions}
            value={currentEnvironment}
            onChange={onEnvironmentChange}
            className="w-full"
          />
        </div>

        {/* Time Range Picker */}
        <div>
          <Select
            label="Rango de Tiempo"
            options={timeRangeOptions}
            value={currentTimeRange}
            onChange={onTimeRangeChange}
            className="w-full"
          />
        </div>

        {/* Area Multi-Select */}
        <div>
          <Select
            label="Áreas"
            options={areaOptions}
            value={selectedAreas}
            onChange={onAreaFilterChange}
            multiple
            searchable
            placeholder="Seleccionar áreas..."
            className="w-full"
          />
        </div>

        {/* Auto-refresh Toggle */}
        <div className="flex flex-col justify-end">
          <label className="text-sm font-medium text-text-primary mb-2">
            Actualización Automática
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant={isAutoRefresh ? "default" : "outline"}
              size="sm"
              onClick={handleAutoRefreshToggle}
              iconName={isAutoRefresh ? "Pause" : "Play"}
              iconPosition="left"
              className="flex-1"
            >
              {isAutoRefresh ? 'Pausar' : 'Iniciar'}
            </Button>
            {isAutoRefresh && (
              <div className="flex items-center text-xs text-text-secondary">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                30s
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Actualizar Ahora
          </Button>
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
            Exportar
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Configurar
          </Button>
        </div>
        
        <div className="flex items-center text-xs text-text-secondary">
          <Icon name="Clock" size={14} className="mr-1" />
          Última actualización: {new Date()?.toLocaleTimeString('es-ES')}
        </div>
      </div>
    </div>
  );
};

export default GlobalControlsPanel;