import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/Header';
import NavigationBar from '../../components/ui/Sidebar';
import FilterPanel from './components/FilterPanel';
import MetricsStrip from './components/MetricsStrip';
import TimelineVisualization from './components/TimelineVisualization';
import TaskQueue from './components/TaskQueue';
import TaskDataGrid from './components/TaskDataGrid';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TaskAnalyticsCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [currentTimeRange, setCurrentTimeRange] = useState('7d');
  const [currentDepartment, setCurrentDepartment] = useState('all');
  const [activeFilters, setActiveFilters] = useState({});
  const [savedFilters, setSavedFilters] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, grid, predictions
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data state
  const [tasksData, setTasksData] = useState([]);
  const [metricsData, setMetricsData] = useState({});

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate minor metric updates
      setMetricsData(prev => ({
        ...prev,
        taskVelocity: {
          ...prev?.taskVelocity,
          value: 24.5 + (Math.random() - 0.5) * 2
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (timeRange) => {
    setCurrentTimeRange(timeRange);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDepartmentChange = (department) => {
    setCurrentDepartment(department);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSaveFilter = (savedFilter) => {
    setSavedFilters(prev => [...prev, savedFilter]);
  };

  const handleLoadFilter = (savedFilter) => {
    setActiveFilters(savedFilter?.filters);
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // Navigate to task detail or open modal
  };

  const handleTaskAction = (task, action) => {
    console.log('Task action:', action, task);
    // Handle task actions like start, complete, etc.
  };

  const handleBulkAction = (action, taskIds) => {
    console.log('Bulk action:', action, taskIds);
    setSelectedTasks([]);
  };

  const handleTaskEdit = (taskId, editValues) => {
    console.log('Task edit:', taskId, editValues);
    // Update task data
  };

  const handleZoomChange = (zoomLevel) => {
    console.log('Zoom changed:', zoomLevel);
  };

  const handlePredictionClick = (prediction) => {
    console.log('Prediction clicked:', prediction);
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Export functionality
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatLastUpdated = (date) => {
    return date?.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        onTimeRangeChange={handleTimeRangeChange}
        onDepartmentChange={handleDepartmentChange}
        currentTimeRange={currentTimeRange}
        currentDepartment={currentDepartment}
        alertCount={3}
        isConnected={true}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 mt-6`}>
        <div className="w-full px-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Centro de Análisis de Tareas
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitoreo detallado del rendimiento de tareas y identificación de cuellos de botella
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Última actualización: {formatLastUpdated(lastUpdated)}
              </div>
              <Button
                variant="outline"
                onClick={handleRefreshData}
                loading={isLoading}
                iconName="RefreshCw"
              >
                Actualizar
              </Button>
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
              >
                Exportar
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            savedFilters={savedFilters}
            onSaveFilter={handleSaveFilter}
            onLoadFilter={handleLoadFilter}
          />

          {/* Metrics Strip */}
          <MetricsStrip metrics={metricsData} />

          {/* View Mode Selector */}

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Primary Content */}
            <div className="lg:col-span-8 space-t-6">
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('timeline')}
                      iconName="Calendar"
                      size="sm"
                    >
                      Cronograma
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('grid')}
                      iconName="Table"
                      size="sm"
                    >
                      Tabla de Datos
                    </Button>
                    <Button
                      variant={viewMode === 'predictions' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('predictions')}
                      iconName="TrendingUp"
                      size="sm"
                    >
                      Análisis Predictivo
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Filter" size={16} />
                    <span>
                      {Object.keys(activeFilters)?.filter(key =>
                        activeFilters?.[key] &&
                        (Array.isArray(activeFilters?.[key]) ? activeFilters?.[key]?.length > 0 : activeFilters?.[key] !== 'all')
                      )?.length} filtros activos
                    </span>
                  </div>
                </div>
              </div>


              {viewMode === 'timeline' && (
                <TimelineVisualization
                  tasks={tasksData}
                  onTaskClick={handleTaskClick}
                  onZoomChange={handleZoomChange}
                />
              )}

              {viewMode === 'grid' && (
                <TaskDataGrid
                  tasks={tasksData}
                  onTaskEdit={handleTaskEdit}
                  onBulkAction={handleBulkAction}
                  onTaskClick={handleTaskClick}
                />
              )}

              {viewMode === 'predictions' && (
                <PredictiveAnalytics
                  tasks={tasksData}
                  onPredictionClick={handlePredictionClick}
                />
              )}
              {/* Additional Data Grid (when not in grid view mode) */}
              {viewMode !== 'grid' && (
                <TaskDataGrid
                  tasks={tasksData}
                  onTaskEdit={handleTaskEdit}
                  onBulkAction={handleBulkAction}
                  onTaskClick={handleTaskClick}
                />
              )}
            </div>

            {/* Right Sidebar - Task Queue */}
            <div className="lg:col-span-4">
              <TaskQueue
                tasks={tasksData}
                onTaskAction={handleTaskAction}
                onTaskClick={handleTaskClick}
              />
            </div>
          </div>



          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-surface border border-border rounded-lg p-6 shadow-modal">
                <div className="flex items-center space-x-3">
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  <span className="text-foreground">Actualizando datos...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskAnalyticsCenter;