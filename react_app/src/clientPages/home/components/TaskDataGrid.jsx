import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskDataGrid = ({ tasks = [], onTaskEdit, onBulkAction, onTaskClick }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Mock comprehensive task data
  const mockTasks = [
    {
      id: 1,
      title: "Análisis de mercado Q4",
      assignee: "Ana García",
      department: "Marketing",
      priority: "high",
      status: "in_progress",
      progress: 75,
      dueDate: new Date(2025, 9, 15),
      createdDate: new Date(2025, 9, 1),
      estimatedHours: 40,
      actualHours: 30,
      tags: ["análisis", "mercado", "q4"],
      dependencies: [],
      attachments: 3
    },
    {
      id: 2,
      title: "Desarrollo módulo pagos",
      assignee: "Carlos López",
      department: "Tecnología",
      priority: "critical",
      status: "in_progress",
      progress: 45,
      dueDate: new Date(2025, 9, 25),
      createdDate: new Date(2025, 9, 5),
      estimatedHours: 80,
      actualHours: 36,
      tags: ["desarrollo", "pagos", "backend"],
      dependencies: [1],
      attachments: 7
    },
    {
      id: 3,
      title: "Revisión presupuesto anual",
      assignee: "María Rodríguez",
      department: "Finanzas",
      priority: "medium",
      status: "completed",
      progress: 100,
      dueDate: new Date(2025, 9, 20),
      createdDate: new Date(2025, 9, 10),
      estimatedHours: 24,
      actualHours: 22,
      tags: ["presupuesto", "anual", "finanzas"],
      dependencies: [],
      attachments: 5
    },
    {
      id: 4,
      title: "Campaña redes sociales",
      assignee: "Juan Martínez",
      department: "Marketing",
      priority: "low",
      status: "pending",
      progress: 0,
      dueDate: new Date(2025, 9, 30),
      createdDate: new Date(2025, 9, 12),
      estimatedHours: 32,
      actualHours: 0,
      tags: ["campaña", "social", "marketing"],
      dependencies: [1],
      attachments: 2
    },
    {
      id: 5,
      title: "Auditoría de seguridad",
      assignee: "Sofía Hernández",
      department: "Tecnología",
      priority: "high",
      status: "blocked",
      progress: 60,
      dueDate: new Date(2025, 9, 22),
      createdDate: new Date(2025, 9, 8),
      estimatedHours: 48,
      actualHours: 29,
      tags: ["auditoría", "seguridad", "compliance"],
      dependencies: [],
      attachments: 4
    }
  ];

  const tasksData = tasks?.length > 0 ? tasks : mockTasks;

  const columns = [
    { key: 'title', label: 'Tarea', sortable: true, width: '25%' },
    { key: 'assignee', label: 'Asignado', sortable: true, width: '15%' },
    { key: 'department', label: 'Departamento', sortable: true, width: '12%' },
    { key: 'priority', label: 'Prioridad', sortable: true, width: '10%' },
    { key: 'status', label: 'Estado', sortable: true, width: '10%' },
    { key: 'progress', label: 'Progreso', sortable: true, width: '10%' },
    { key: 'dueDate', label: 'Fecha Límite', sortable: true, width: '12%' },
    { key: 'actions', label: 'Acciones', sortable: false, width: '6%' }
  ];

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasksData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(task =>
        task?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        task?.assignee?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        task?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        task?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'dueDate' || sortConfig?.key === 'createdDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [tasksData, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTasks(filteredAndSortedTasks?.map(task => task?.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (taskId, checked) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev?.filter(id => id !== taskId));
    }
  };

  const handleEditStart = (task) => {
    setEditingTask(task?.id);
    setEditValues({
      title: task?.title,
      assignee: task?.assignee,
      priority: task?.priority,
      status: task?.status,
      progress: task?.progress
    });
  };

  const handleEditSave = () => {
    onTaskEdit?.(editingTask, editValues);
    setEditingTask(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingTask(null);
    setEditValues({});
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return { color: 'bg-error text-error-foreground', label: 'Crítica' };
      case 'high':
        return { color: 'bg-warning text-warning-foreground', label: 'Alta' };
      case 'medium':
        return { color: 'bg-accent text-accent-foreground', label: 'Media' };
      case 'low':
        return { color: 'bg-success text-success-foreground', label: 'Baja' };
      default:
        return { color: 'bg-muted text-muted-foreground', label: 'Sin prioridad' };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-success/10 text-success border-success/20', label: 'Completado' };
      case 'in_progress':
        return { color: 'bg-primary/10 text-primary border-primary/20', label: 'En progreso' };
      case 'pending':
        return { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendiente' };
      case 'blocked':
        return { color: 'bg-error/10 text-error border-error/20', label: 'Bloqueado' };
      default:
        return { color: 'bg-muted/10 text-muted-foreground border-muted/20', label: 'Sin estado' };
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isAllSelected = selectedTasks?.length === filteredAndSortedTasks?.length && filteredAndSortedTasks?.length > 0;
  const isIndeterminate = selectedTasks?.length > 0 && selectedTasks?.length < filteredAndSortedTasks?.length;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card mt-2">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Table" size={20} />
            <h3 className="font-medium text-foreground">Datos Detallados de Tareas</h3>
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedTasks?.length} de {tasksData?.length} tareas
            </span>
          </div>

          {/* Bulk Actions */}
          {selectedTasks?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedTasks?.length} seleccionadas
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.('complete', selectedTasks)}
                iconName="Check"
              >
                Completar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.('assign', selectedTasks)}
                iconName="User"
              >
                Reasignar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.('delete', selectedTasks)}
                iconName="Trash2"
              >
                Eliminar
              </Button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="w-full max-w-md">
          <Input
            type="search"
            placeholder="Buscar tareas, asignados, departamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="w-12 p-3 text-left">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="p-3 text-left text-sm font-medium text-foreground"
                  style={{ width: column?.width }}
                >
                  {column?.sortable ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-primary transition-colors"
                    >
                      <span>{column?.label}</span>
                      <Icon
                        name={
                          sortConfig?.key === column?.key
                            ? sortConfig?.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                        }
                        size={14}
                      />
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks?.map((task) => (
              <tr
                key={task?.id}
                className="border-b border-border hover:bg-muted/20 transition-colors"
              >
                <td className="p-3">
                  <Checkbox
                    checked={selectedTasks?.includes(task?.id)}
                    onChange={(e) => handleSelectTask(task?.id, e?.target?.checked)}
                  />
                </td>
                
                {/* Title */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <Input
                      value={editValues?.title}
                      onChange={(e) => setEditValues(prev => ({ ...prev, title: e?.target?.value }))}
                      className="w-full"
                    />
                  ) : (
                    <div
                      className="cursor-pointer hover:text-primary transition-colors"
                      onClick={() => onTaskClick?.(task)}
                    >
                      <div className="font-medium text-foreground line-clamp-2">
                        {task?.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {task?.tags?.slice(0, 2)?.join(', ')}
                        {task?.tags?.length > 2 && ` +${task?.tags?.length - 2}`}
                      </div>
                    </div>
                  )}
                </td>

                {/* Assignee */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <select
                      value={editValues?.assignee}
                      onChange={(e) => setEditValues(prev => ({ ...prev, assignee: e?.target?.value }))}
                      className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                    >
                      <option value="Ana García">Ana García</option>
                      <option value="Carlos López">Carlos López</option>
                      <option value="María Rodríguez">María Rodríguez</option>
                      <option value="Juan Martínez">Juan Martínez</option>
                      <option value="Sofía Hernández">Sofía Hernández</option>
                    </select>
                  ) : (
                    <span className="text-sm text-foreground">{task?.assignee}</span>
                  )}
                </td>

                {/* Department */}
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">{task?.department}</span>
                </td>

                {/* Priority */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <select
                      value={editValues?.priority}
                      onChange={(e) => setEditValues(prev => ({ ...prev, priority: e?.target?.value }))}
                      className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                    >
                      <option value="critical">Crítica</option>
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityConfig(task?.priority)?.color}`}>
                      {getPriorityConfig(task?.priority)?.label}
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <select
                      value={editValues?.status}
                      onChange={(e) => setEditValues(prev => ({ ...prev, status: e?.target?.value }))}
                      className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in_progress">En progreso</option>
                      <option value="completed">Completado</option>
                      <option value="blocked">Bloqueado</option>
                    </select>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusConfig(task?.status)?.color}`}>
                      {getStatusConfig(task?.status)?.label}
                    </span>
                  )}
                </td>

                {/* Progress */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editValues?.progress}
                      onChange={(e) => setEditValues(prev => ({ ...prev, progress: parseInt(e?.target?.value) }))}
                      className="w-20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${task?.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {task?.progress}%
                      </span>
                    </div>
                  )}
                </td>

                {/* Due Date */}
                <td className="p-3">
                  <span className="text-sm text-foreground">{formatDate(task?.dueDate)}</span>
                </td>

                {/* Actions */}
                <td className="p-3">
                  {editingTask === task?.id ? (
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditSave}
                        className="h-8 w-8"
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditCancel}
                        className="h-8 w-8"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStart(task)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {filteredAndSortedTasks?.length} de {tasksData?.length} tareas
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download">
              Exportar
            </Button>
            <Button variant="ghost" size="sm" iconName="Filter">
              Más filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDataGrid;