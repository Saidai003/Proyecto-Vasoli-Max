import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ filters, onFilterChange, onBookmark, bookmarks = [] }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'quarter', label: 'Este Trimestre' },
    { value: 'year', label: 'Este Año' },
    { value: 'fy2024', label: 'Año Fiscal 2024' },
    { value: 'fy2023', label: 'Año Fiscal 2023' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const areaOptions = [
    { value: 'all', label: 'Todas las Áreas' },
    { value: 'ventas', label: 'Ventas' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'desarrollo', label: 'Desarrollo' },
    { value: 'soporte', label: 'Soporte' },
    { value: 'rrhh', label: 'Recursos Humanos' },
    { value: 'finanzas', label: 'Finanzas' }
  ];

  const taskTypeOptions = [
    { value: 'all', label: 'Todos los Tipos' },
    { value: 'revision', label: 'Revisión' },
    { value: 'aprobacion', label: 'Aprobación' },
    { value: 'desarrollo', label: 'Desarrollo' },
    { value: 'testing', label: 'Testing' },
    { value: 'documentacion', label: 'Documentación' }
  ];

  const userRoleOptions = [
    { value: 'all', label: 'Todos los Roles' },
    { value: 'manager', label: 'Gerente' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'analyst', label: 'Analista' },
    { value: 'specialist', label: 'Especialista' },
    { value: 'coordinator', label: 'Coordinador' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleBookmarkSave = () => {
    const bookmarkName = prompt('Nombre del marcador:');
    if (bookmarkName) {
      onBookmark({ name: bookmarkName, filters: { ...filters } });
    }
  };

  const applyBookmark = (bookmark) => {
    onFilterChange(bookmark?.filters);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Filtros Avanzados</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBookmarkSave}
            iconName="Bookmark"
            iconPosition="left"
          >
            Guardar Filtros
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAdvanced ? 'Ocultar' : 'Mostrar'} Avanzados
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Período"
          options={dateRangeOptions}
          value={filters?.dateRange || 'month'}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
        
        <Select
          label="Área"
          options={areaOptions}
          value={filters?.area || 'all'}
          onChange={(value) => handleFilterChange('area', value)}
          searchable
        />
        
        <Select
          label="Tipo de Tarea"
          options={taskTypeOptions}
          value={filters?.taskType || 'all'}
          onChange={(value) => handleFilterChange('taskType', value)}
        />
        
        <Select
          label="Rol de Usuario"
          options={userRoleOptions}
          value={filters?.userRole || 'all'}
          onChange={(value) => handleFilterChange('userRole', value)}
        />
      </div>
      {/* Comparison Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Checkbox
          label="Modo Comparación"
          description="Comparar con período anterior"
          checked={comparisonMode}
          onChange={(e) => setComparisonMode(e?.target?.checked)}
        />
        
        {bookmarks?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Marcadores:</span>
            {bookmarks?.slice(0, 3)?.map((bookmark, index) => (
              <Button
                key={index}
                variant="ghost"
                size="xs"
                onClick={() => applyBookmark(bookmark)}
              >
                {bookmark?.name}
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Rango de Eficiencia (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-20 px-2 py-1 border border-border rounded text-sm"
                  min="0"
                  max="100"
                />
                <span className="text-text-secondary">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-20 px-2 py-1 border border-border rounded text-sm"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tiempo de Ciclo (días)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-20 px-2 py-1 border border-border rounded text-sm"
                  min="0"
                />
                <span className="text-text-secondary">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-20 px-2 py-1 border border-border rounded text-sm"
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Prioridad
              </label>
              <Select
                options={[
                  { value: 'all', label: 'Todas' },
                  { value: 'high', label: 'Alta' },
                  { value: 'medium', label: 'Media' },
                  { value: 'low', label: 'Baja' }
                ]}
                value={filters?.priority || 'all'}
                onChange={(value) => handleFilterChange('priority', value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                label="Solo Tareas vencidas"
                checked={filters?.overdue || false}
                onChange={(e) => handleFilterChange('overdue', e?.target?.checked)}
              />
              <Checkbox
                label="Incluir Tareas archivadas"
                checked={filters?.includeArchived || false}
                onChange={(e) => handleFilterChange('includeArchived', e?.target?.checked)}
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange({})}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {Object.keys(filters)?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-text-secondary">Filtros activos:</span>
            {Object.entries(filters)?.map(([key, value]) => (
              value && value !== 'all' && (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                >
                  {key}: {value}
                  <button
                    onClick={() => handleFilterChange(key, null)}
                    className="ml-1 hover:text-accent/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;