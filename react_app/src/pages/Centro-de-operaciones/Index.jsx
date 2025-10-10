import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/Sidebar';
import NavigationHeader from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import KPIMetricsStrip from './components/KPIMetricsStrip';
import GlobalControlsPanel from './components/GlobalControlsPanel';
import WorkflowHeatMap from './components/WorkflowHeatMap';
import AlertsFeed from './components/AlertsFeed';
import WorkflowDataGrid from './components/WorkflowDataGrid';

const OperationsCommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalFilters, setGlobalFilters] = useState({
    environment: 'production',
    timeRange: 'today',
    selectedAreas: ['ventas', 'marketing'],
    autoRefresh: true
  });
  const [metrics, setMetrics] = useState({});
  const [notifications] = useState([
    {
      id: 1,
      title: 'Cuello de botella detectado',
      message: 'El proceso de aprobación en Marketing requiere atención inmediata.',
      time: 'hace 5 min',
      read: false
    },
    {
      id: 2,
      title: 'Flujo completado exitosamente',
      message: 'El proceso de onboarding de Juan Pérez ha sido completado.',
      time: 'hace 15 min',
      read: false
    },
    {
      id: 3,
      title: 'Actualización del sistema',
      message: 'El sistema se actualizará esta noche a las 2:00 AM.',
      time: 'hace 1 hora',
      read: true
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    if (globalFilters?.autoRefresh) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          activeWorkflows: 127 + Math.floor(Math.random() * 10) - 5,
          pendingTasks: 342 + Math.floor(Math.random() * 20) - 10,
          completionRate: 87.3 + (Math.random() * 4) - 2,
          avgProcessingTime: 4.2 + (Math.random() * 0.8) - 0.4,
          bottleneckCount: 7 + Math.floor(Math.random() * 4) - 2,
          teamUtilization: 73.8 + (Math.random() * 10) - 5
        }));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [globalFilters?.autoRefresh]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFilterChange = (newFilters) => {
    setGlobalFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleEnvironmentChange = (environment) => {
    handleFilterChange({ environment });
  };

  const handleAutoRefreshToggle = (enabled) => {
    handleFilterChange({ autoRefresh: enabled });
  };

  const handleTimeRangeChange = (timeRange) => {
    handleFilterChange({ timeRange });
  };

  const handleAreaFilterChange = (selectedAreas) => {
    handleFilterChange({ selectedAreas });
  };

  const handleHeatMapDrillDown = (area, stage) => {
    console.log('Drilling down into:', area, stage);
    // Implement drill-down functionality
  };

  const handleAlertAction = (alertId, action) => {
    console.log('Alert action:', alertId, action);
    // Implement alert action handling
  };

  const handlePriorityChange = (workflowId, newPriority) => {
    console.log('Priority change:', workflowId, newPriority);
    // Implement priority change logic
  };

  const handleResourceReallocation = (workflowId) => {
    console.log('Resource reallocation for:', workflowId);
    // Implement resource reallocation logic
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'
      }`}>
        <NavigationHeader 
          onMenuToggle={handleSidebarToggle}
          notifications={notifications}
          globalFilters={globalFilters}
          onFilterChange={handleFilterChange}
        />
        
        <main className="p-6">
          <BreadcrumbTrail 
            currentPath="/operations-command-center"
            filters={globalFilters}
          />
          
          {/* Global Controls */}
          <GlobalControlsPanel
            onEnvironmentChange={handleEnvironmentChange}
            onAutoRefreshToggle={handleAutoRefreshToggle}
            onTimeRangeChange={handleTimeRangeChange}
            onAreaFilterChange={handleAreaFilterChange}
            autoRefreshEnabled={globalFilters?.autoRefresh}
            currentEnvironment={globalFilters?.environment}
            currentTimeRange={globalFilters?.timeRange}
            selectedAreas={globalFilters?.selectedAreas}
          />
          
          {/* KPI Metrics Strip */}
          <KPIMetricsStrip metrics={metrics} />
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
            {/* Heat Map - Main Content (12 cols equivalent) */}
            <div className="xl:col-span-3">
              <WorkflowHeatMap onDrillDown={handleHeatMapDrillDown} />
            </div>
            
            {/* Alerts Feed - Right Panel (4 cols equivalent) */}
            <div className="xl:col-span-1">
              <AlertsFeed onActionClick={handleAlertAction} />
            </div>
          </div>
          
          {/* Workflow Data Grid - Full Width */}
          <WorkflowDataGrid
            onPriorityChange={handlePriorityChange}
            onResourceReallocation={handleResourceReallocation}
          />
        </main>
      </div>
    </div>
  );
};

export default OperationsCommandCenter;