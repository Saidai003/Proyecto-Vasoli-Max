import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskQueue = ({ tasks = [], onTaskAction, onTaskClick }) => {
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');

  // Mock real-time task queue data
  const mockTasks = [
    {
      id: 1,
      title: "Revisar propuesta cliente ABC",
      priority: "critical",
      assignee: "Ana García",
      department: "Ventas",
      dueDate: new Date(2025, 9, 11),
      estimatedTime: 2,
      status: "pending",
      tags: ["urgente", "cliente-vip"]
    },
    {
      id: 2,
      title: "Actualizar documentación API",
      priority: "high",
      assignee: "Carlos López",
      department: "Tecnología",
      dueDate: new Date(2025, 9, 12),
      estimatedTime: 4,
      status: "in_progress",
      tags: ["documentación", "api"]
    },
    {
      id: 3,
      title: "Análisis de costos Q4",
      priority: "medium",
      assignee: "María Rodríguez",
      department: "Finanzas",
      dueDate: new Date(2025, 9, 15),
      estimatedTime: 6,
      status: "pending",
      tags: ["análisis", "trimestral"]
    },
    {
      id: 4,
      title: "Diseño campaña navideña",
      priority: "medium",
      assignee: "Juan Martínez",
      department: "Marketing",
      dueDate: new Date(2025, 9, 18),
      estimatedTime: 8,
      status: "pending",
      tags: ["diseño", "campaña"]
    },
    {
      id: 5,
      title: "Capacitación nuevo personal",
      priority: "low",
      assignee: "Sofía Hernández",
      department: "Recursos Humanos",
      dueDate: new Date(2025, 9, 20),
      estimatedTime: 3,
      status: "scheduled",
      tags: ["capacitación", "rrhh"]
    }
  ];

  const tasksData = tasks?.length > 0 ? tasks : mockTasks;

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return { color: 'bg-error', textColor: 'text-error', icon: 'AlertTriangle', label: 'Crítica' };
      case 'high':
        return { color: 'bg-warning', textColor: 'text-warning', icon: 'ArrowUp', label: 'Alta' };
      case 'medium':
        return { color: 'bg-accent', textColor: 'text-accent', icon: 'Minus', label: 'Media' };
      case 'low':
        return { color: 'bg-success', textColor: 'text-success', icon: 'ArrowDown', label: 'Baja' };
      default:
        return { color: 'bg-muted', textColor: 'text-muted-foreground', icon: 'Circle', label: 'Sin prioridad' };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendiente' };
      case 'in_progress':
        return { color: 'bg-primary/10 text-primary border-primary/20', label: 'En progreso' };
      case 'scheduled':
        return { color: 'bg-accent/10 text-accent border-accent/20', label: 'Programado' };
      case 'blocked':
        return { color: 'bg-error/10 text-error border-error/20', label: 'Bloqueado' };
      default:
        return { color: 'bg-muted/10 text-muted-foreground border-muted/20', label: 'Sin estado' };
    }
  };

  const sortTasks = (tasks) => {
    return [...tasks]?.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'estimatedTime':
          return a?.estimatedTime - b?.estimatedTime;
        case 'assignee':
          return a?.assignee?.localeCompare(b?.assignee);
        default:
          return 0;
      }
    });
  };

  const filterTasks = (tasks) => {
    if (filterBy === 'all') return tasks;
    return tasks?.filter(task => task?.status === filterBy);
  };

  const processedTasks = sortTasks(filterTasks(tasksData));

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Vencido';
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    return `${diffDays} días`;
  };

  const getDueDateColor = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-error';
    if (diffDays <= 1) return 'text-warning';
    if (diffDays <= 3) return 'text-accent';
    return 'text-muted-foreground';
  };

  const handleQuickAction = (task, action) => {
    onTaskAction?.(task, action);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="List" size={20} />
            <h3 className="font-medium text-foreground">Cola de Tareas</h3>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {processedTasks?.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Actualizar
          </Button>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="priority">Prioridad</option>
              <option value="dueDate">Fecha límite</option>
              <option value="estimatedTime">Tiempo estimado</option>
              <option value="assignee">Asignado</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Filtrar por estado
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="scheduled">Programado</option>
              <option value="blocked">Bloqueado</option>
            </select>
          </div>
        </div>
      </div>
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {processedTasks?.map((task) => {
            const priorityConfig = getPriorityConfig(task?.priority);
            const statusConfig = getStatusConfig(task?.status);
            
            return (
              <div
                key={task?.id}
                className="border border-border rounded-lg p-3 hover:shadow-sm transition-smooth cursor-pointer"
                onClick={() => onTaskClick?.(task)}
              >
                {/* Task Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-2 flex-1">
                    <div className={`w-2 h-2 rounded-full mt-2 ${priorityConfig?.color}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2">
                        {task?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task?.assignee} • {task?.department}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={priorityConfig?.icon} 
                      size={12} 
                      className={priorityConfig?.textColor}
                    />
                  </div>
                </div>
                {/* Task Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${getDueDateColor(task?.dueDate)}`}>
                      {formatDueDate(task?.dueDate)}
                    </span>
                    <span className="text-muted-foreground">
                      ~{task?.estimatedTime}h
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded border ${statusConfig?.color}`}>
                      {statusConfig?.label}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      {task?.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleQuickAction(task, 'start');
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          Iniciar
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleQuickAction(task, 'more');
                        }}
                        className="h-6 w-6"
                      >
                        <Icon name="MoreHorizontal" size={12} />
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  {task?.tags && task?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {task?.tags?.slice(0, 2)?.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {task?.tags?.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{task?.tags?.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Actualizado hace 30s</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            Ver todas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskQueue;