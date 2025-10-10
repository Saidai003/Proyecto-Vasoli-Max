import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineVisualization = ({ tasks = [], onTaskClick, onZoomChange }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewportStart, setViewportStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const timelineRef = useRef(null);

  // Mock tasks data
  const mockTasks = [
    {
      id: 1,
      title: "Análisis de mercado Q4",
      department: "Marketing",
      assignee: "Ana García",
      startDate: new Date(2025, 9, 1),
      endDate: new Date(2025, 9, 15),
      progress: 75,
      priority: "high",
      status: "in_progress",
      dependencies: []
    },
    {
      id: 2,
      title: "Desarrollo módulo pagos",
      department: "Tecnología",
      assignee: "Carlos López",
      startDate: new Date(2025, 9, 5),
      endDate: new Date(2025, 9, 25),
      progress: 45,
      priority: "critical",
      status: "in_progress",
      dependencies: [1]
    },
    {
      id: 3,
      title: "Revisión presupuesto anual",
      department: "Finanzas",
      assignee: "María Rodríguez",
      startDate: new Date(2025, 9, 10),
      endDate: new Date(2025, 9, 20),
      progress: 90,
      priority: "medium",
      status: "in_progress",
      dependencies: []
    },
    {
      id: 4,
      title: "Campaña redes sociales",
      department: "Marketing",
      assignee: "Juan Martínez",
      startDate: new Date(2025, 9, 12),
      endDate: new Date(2025, 9, 30),
      progress: 30,
      priority: "low",
      status: "pending",
      dependencies: [1]
    },
    {
      id: 5,
      title: "Auditoría de seguridad",
      department: "Tecnología",
      assignee: "Sofía Hernández",
      startDate: new Date(2025, 9, 8),
      endDate: new Date(2025, 9, 22),
      progress: 60,
      priority: "high",
      status: "in_progress",
      dependencies: []
    }
  ];

  const tasksData = tasks?.length > 0 ? tasks : mockTasks;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-error';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in_progress': return 'bg-primary';
      case 'pending': return 'bg-muted';
      case 'overdue': return 'bg-error';
      case 'blocked': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getTaskAging = (startDate, endDate) => {
    const now = new Date();
    const totalDuration = endDate - startDate;
    const elapsed = now - startDate;
    const agingPercentage = (elapsed / totalDuration) * 100;
    
    if (agingPercentage > 100) return 'overdue';
    if (agingPercentage > 80) return 'critical';
    if (agingPercentage > 60) return 'warning';
    return 'normal';
  };

  const getAgingColor = (aging) => {
    switch (aging) {
      case 'overdue': return 'border-error border-2';
      case 'critical': return 'border-warning border-2';
      case 'warning': return 'border-accent border-2';
      default: return 'border-border';
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel * 1.5, 4);
    setZoomLevel(newZoom);
    onZoomChange?.(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel / 1.5, 0.5);
    setZoomLevel(newZoom);
    onZoomChange?.(newZoom);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e?.clientX, viewport: viewportStart });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    
    const deltaX = e?.clientX - dragStart?.x;
    const newViewport = dragStart?.viewport - (deltaX / zoomLevel);
    setViewportStart(Math.max(0, newViewport));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const formatDate = (date) => {
    return date?.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const calculateTaskPosition = (startDate, endDate) => {
    const timelineStart = new Date(2025, 9, 1);
    const timelineEnd = new Date(2025, 9, 31);
    const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24);
    
    const taskStart = (startDate - timelineStart) / (1000 * 60 * 60 * 24);
    const taskDuration = (endDate - startDate) / (1000 * 60 * 60 * 24);
    
    const left = (taskStart / totalDays) * 100;
    const width = (taskDuration / totalDays) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} />
          <h3 className="font-medium text-foreground">Cronograma de Tareas</h3>
          <span className="text-sm text-muted-foreground">
            Octubre 2025
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            iconName="ZoomOut"
          >
            Alejar
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 4}
            iconName="ZoomIn"
          >
            Acercar
          </Button>
        </div>
      </div>
      {/* Timeline Container */}
      <div 
        ref={timelineRef}
        className="relative overflow-hidden"
        style={{ height: '400px' }}
        onMouseDown={handleMouseDown}
      >
        {/* Time Scale */}
        <div className="sticky top-0 bg-muted border-b border-border p-2 z-10">
          <div className="flex justify-between text-xs text-muted-foreground">
            {Array.from({ length: 31 }, (_, i) => {
              const date = new Date(2025, 9, i + 1);
              return (
                <div key={i} className="flex-1 text-center">
                  {i % 5 === 0 && formatDate(date)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks Timeline */}
        <div className="p-4 space-y-3" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
          {tasksData?.map((task, index) => {
            const position = calculateTaskPosition(task?.startDate, task?.endDate);
            const aging = getTaskAging(task?.startDate, task?.endDate);
            
            return (
              <div key={task?.id} className="relative">
                {/* Task Row */}
                <div className="flex items-center mb-2">
                  <div className="w-48 flex-shrink-0 pr-4">
                    <div className="text-sm font-medium text-foreground truncate">
                      {task?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task?.assignee} • {task?.department}
                    </div>
                  </div>
                  
                  {/* Timeline Bar Container */}
                  <div className="flex-1 relative h-8 bg-muted rounded">
                    {/* Task Bar */}
                    <div
                      className={`
                        absolute top-1 bottom-1 rounded cursor-pointer transition-smooth hover:shadow-sm
                        ${getPriorityColor(task?.priority)} ${getAgingColor(aging)}
                      `}
                      style={position}
                      onClick={() => onTaskClick?.(task)}
                    >
                      {/* Progress Bar */}
                      <div
                        className="h-full bg-white/30 rounded-l"
                        style={{ width: `${task?.progress}%` }}
                      />
                      
                      {/* Task Info */}
                      <div className="absolute inset-0 flex items-center justify-between px-2">
                        <span className="text-xs font-medium text-white truncate">
                          {task?.progress}%
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={task?.priority === 'critical' ? 'AlertTriangle' : 'Circle'} 
                            size={10} 
                            color="white" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Dependencies Lines */}
                    {task?.dependencies?.map(depId => {
                      const depTask = tasksData?.find(t => t?.id === depId);
                      if (!depTask) return null;
                      
                      return (
                        <div
                          key={depId}
                          className="absolute top-0 h-full border-l-2 border-dashed border-muted-foreground/30"
                          style={{ left: calculateTaskPosition(depTask?.endDate, depTask?.endDate)?.left }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="w-16 flex-shrink-0 pl-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(task?.status)}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Date Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-error z-20"
          style={{ left: '33%' }}
        >
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-error rounded-full" />
        </div>
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground">Prioridad:</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded" />
              <span>Crítica</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded" />
              <span>Alta</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent rounded" />
              <span>Media</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded" />
              <span>Baja</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground">Envejecimiento:</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 border-2 border-error rounded" />
              <span>Vencido</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 border-2 border-warning rounded" />
              <span>Crítico</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;