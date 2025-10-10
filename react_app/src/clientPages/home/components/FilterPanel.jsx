import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFiltersChange, savedFilters = [], onSaveFilter, onLoadFilter }) => {
  const [filters, setFilters] = useState({
    departments: [],
    taskTypes: [],
    priorities: [],
    assignees: [],
    dateRange: { start: '', end: '' },
    status: 'all'
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const departmentOptions = [
    { value: 'sales', label: 'Ventas' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operaciones' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'hr', label: 'Recursos Humanos' },
    { value: 'it', label: 'Tecnología' }
  ];

  const taskTypeOptions = [
    { value: 'analysis', label: 'Análisis' },
    { value: 'development', label: 'Desarrollo' },
    { value: 'review', label: 'Revisión' },
    { value: 'approval', label: 'Aprobación' },
    { value: 'documentation', label: 'Documentación' },
    { value: 'testing', label: 'Pruebas' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const assigneeOptions = [
    { value: 'ana_garcia', label: 'Ana García' },
    { value: 'carlos_lopez', label: 'Carlos López' },
    { value: 'maria_rodriguez', label: 'María Rodríguez' },
    { value: 'juan_martinez', label: 'Juan Martínez' },
    { value: 'sofia_hernandez', label: 'Sofía Hernández' },
    { value: 'diego_morales', label: 'Diego Morales' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'in_progress', label: 'En progreso' },
    { value: 'completed', label: 'Completado' },
    { value: 'overdue', label: 'Vencido' },
    { value: 'blocked', label: 'Bloqueado' }
  ];

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      departments: [],
      taskTypes: [],
      priorities: [],
      assignees: [],
      dateRange: { start: '', end: '' },
      status: 'all'
    });
  };

  const handleSaveFilter = () => {
    if (filterName?.trim()) {
      const savedFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters },
        createdAt: new Date()
      };
      onSaveFilter?.(savedFilter);
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadFilter = (savedFilter) => {
    setFilters(savedFilter?.filters);
    onLoadFilter?.(savedFilter);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.departments?.length > 0) count++;
    if (filters?.taskTypes?.length > 0) count++;
    if (filters?.priorities?.length > 0) count++;
    if (filters?.assignees?.length > 0) count++;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    if (filters?.status !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} />
          <h3 className="font-medium text-foreground">Filtros Avanzados</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()} activos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            disabled={getActiveFiltersCount() === 0}
          >
            Limpiar
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Departamentos"
              options={departmentOptions}
              value={filters?.departments}
              onChange={(value) => handleFilterChange('departments', value)}
              multiple
              searchable
              placeholder="Seleccionar departamentos"
            />
            
            <Select
              label="Tipos de Tarea"
              options={taskTypeOptions}
              value={filters?.taskTypes}
              onChange={(value) => handleFilterChange('taskTypes', value)}
              multiple
              searchable
              placeholder="Seleccionar tipos"
            />
            
            <Select
              label="Prioridades"
              options={priorityOptions}
              value={filters?.priorities}
              onChange={(value) => handleFilterChange('priorities', value)}
              multiple
              placeholder="Seleccionar prioridades"
            />
            
            <Select
              label="Estado"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Seleccionar estado"
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Asignados"
              options={assigneeOptions}
              value={filters?.assignees}
              onChange={(value) => handleFilterChange('assignees', value)}
              multiple
              searchable
              placeholder="Seleccionar asignados"
            />
            
            <Input
              label="Fecha Inicio"
              type="date"
              value={filters?.dateRange?.start}
              onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
            />
            
            <Input
              label="Fecha Fin"
              type="date"
              value={filters?.dateRange?.end}
              onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
            />

            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(true)}
                iconName="Bookmark"
                iconPosition="left"
                className="flex-1"
              >
                Guardar Filtro
              </Button>
            </div>
          </div>

          {/* Saved Filters */}
          {savedFilters?.length > 0 && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Filtros Guardados
              </label>
              <div className="flex flex-wrap gap-2">
                {savedFilters?.map((savedFilter) => (
                  <Button
                    key={savedFilter?.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadFilter(savedFilter)}
                    className="border border-border"
                  >
                    <Icon name="Bookmark" size={14} className="mr-1" />
                    {savedFilter?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-surface border border-border rounded-lg shadow-modal p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-foreground mb-4">Guardar Filtro</h3>
            <Input
              label="Nombre del filtro"
              value={filterName}
              onChange={(e) => setFilterName(e?.target?.value)}
              placeholder="Ej: Tareas críticas de ventas"
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveFilter}
                disabled={!filterName?.trim()}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;