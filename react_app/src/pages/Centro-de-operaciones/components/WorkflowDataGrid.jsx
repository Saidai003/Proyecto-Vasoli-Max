import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const WorkflowDataGrid = ({ onPriorityChange = () => {}, onResourceReallocation = () => {} }) => {
  const [sortField, setSortField] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);

  const workflows = [
    {
      id: 'WF-001',
      name: 'Proceso de Onboarding - Juan Pérez',
      area: 'RRHH',
      status: 'in_progress',
      priority: 'high',
      assignee: 'María González',
      progress: 65,
      startDate: new Date('2024-10-07'),
      dueDate: new Date('2024-10-12'),
      tasksCompleted: 8,
      totalTasks: 12,
      bottleneck: false
    },
    {
      id: 'WF-002',
      name: 'Campaña Q4 - Lanzamiento Producto',
      area: 'Marketing',
      status: 'blocked',
      priority: 'critical',
      assignee: 'Carlos Ruiz',
      progress: 35,
      startDate: new Date('2024-10-05'),
      dueDate: new Date('2024-10-15'),
      tasksCompleted: 4,
      totalTasks: 15,
      bottleneck: true
    },
    {
      id: 'WF-003',
      name: 'Procesamiento Pedido #12345',
      area: 'Operaciones',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Ana Martín',
      progress: 80,
      startDate: new Date('2024-10-08'),
      dueDate: new Date('2024-10-10'),
      tasksCompleted: 12,
      totalTasks: 15,
      bottleneck: false
    },
    {
      id: 'WF-004',
      name: 'Aprobación Presupuesto 2025',
      area: 'Finanzas',
      status: 'pending_approval',
      priority: 'high',
      assignee: 'Roberto Silva',
      progress: 90,
      startDate: new Date('2024-10-01'),
      dueDate: new Date('2024-10-11'),
      tasksCompleted: 9,
      totalTasks: 10,
      bottleneck: false
    },
    {
      id: 'WF-005',
      name: 'Migración Sistema CRM',
      area: 'IT',
      status: 'in_progress',
      priority: 'critical',
      assignee: 'Laura Vega',
      progress: 45,
      startDate: new Date('2024-09-25'),
      dueDate: new Date('2024-10-20'),
      tasksCompleted: 18,
      totalTasks: 40,
      bottleneck: true
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      in_progress: { label: 'En Progreso', color: 'bg-blue-100 text-blue-800', icon: 'Play' },
      blocked: { label: 'Bloqueado', color: 'bg-red-100 text-red-800', icon: 'AlertCircle' },
      pending_approval: { label: 'Pendiente Aprobación', color: 'bg-orange-100 text-orange-800', icon: 'Clock' },
      completed: { label: 'Completado', color: 'bg-green-100 text-green-800', icon: 'CheckCircle' }
    };
    return configs?.[status] || configs?.in_progress;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { label: 'Baja', color: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Alta', color: 'bg-orange-100 text-orange-800' },
      critical: { label: 'Crítica', color: 'bg-red-100 text-red-800' }
    };
    return configs?.[priority] || configs?.medium;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowSelect = (workflowId) => {
    setSelectedRows(prev => 
      prev?.includes(workflowId) 
        ? prev?.filter(id => id !== workflowId)
        : [...prev, workflowId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows?.length === workflows?.length 
        ? [] 
        : workflows?.map(w => w?.id)
    );
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Estado Individual de Flujos de Trabajo
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filtros
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Exportar
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows?.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
            <span className="text-sm text-text-primary">
              {selectedRows?.length} flujo{selectedRows?.length !== 1 ? 's' : ''} seleccionado{selectedRows?.length !== 1 ? 's' : ''}
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Cambiar Prioridad
              </Button>
              <Button variant="outline" size="sm">
                Reasignar
              </Button>
              <Button variant="outline" size="sm">
                Exportar Selección
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === workflows?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="p-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Flujo de Trabajo</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="p-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('area')}
              >
                <div className="flex items-center space-x-1">
                  <span>Área</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Estado</th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Prioridad</th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Asignado</th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Progreso</th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Vencimiento</th>
              <th className="p-3 text-left text-sm font-medium text-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {workflows?.map((workflow) => {
              const statusConfig = getStatusConfig(workflow?.status);
              const priorityConfig = getPriorityConfig(workflow?.priority);
              const daysUntilDue = getDaysUntilDue(workflow?.dueDate);
              
              return (
                <tr 
                  key={workflow?.id} 
                  className={`border-b border-border hover:bg-muted/50 ${
                    selectedRows?.includes(workflow?.id) ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows?.includes(workflow?.id)}
                      onChange={() => handleRowSelect(workflow?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="font-medium text-text-primary text-sm">
                          {workflow?.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          ID: {workflow?.id}
                        </div>
                      </div>
                      {workflow?.bottleneck && (
                        <Icon name="AlertTriangle" size={16} className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-text-primary">{workflow?.area}</span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.color}`}>
                      <Icon name={statusConfig?.icon} size={12} className="mr-1" />
                      {statusConfig?.label}
                    </span>
                  </td>
                  <td className="p-3">
                    <Select
                      options={priorityOptions}
                      value={workflow?.priority}
                      onChange={(value) => onPriorityChange(workflow?.id, value)}
                      className="w-32"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <span className="text-sm text-text-primary">{workflow?.assignee}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">
                          {workflow?.tasksCompleted}/{workflow?.totalTasks}
                        </span>
                        <span className="font-medium text-text-primary">
                          {workflow?.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${workflow?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div className="text-text-primary">{formatDate(workflow?.dueDate)}</div>
                      <div className={`text-xs ${
                        daysUntilDue < 0 ? 'text-red-600' : 
                        daysUntilDue <= 2 ? 'text-orange-600' : 'text-text-secondary'
                      }`}>
                        {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} días atrasado` :
                         daysUntilDue === 0 ? 'Vence hoy' :
                         `${daysUntilDue} días restantes`}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        title="Ver detalles"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Users"
                        title="Reasignar recursos"
                        onClick={() => onResourceReallocation(workflow?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        title="Más opciones"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Mostrando {workflows?.length} de {workflows?.length} flujos de trabajo</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded">1</span>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDataGrid;