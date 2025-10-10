import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AdvancedFilters from './components/AdvancedFilters';
import TrendAnalysisChart from './components/TrendAnalysisChart';
import WorkflowTemplateRanking from './components/WorkflowTemplateRanking';
import WorkflowFunnelVisualization from './components/WorkflowFunnelVisualization';
import PredictiveAnalyticsModule from './components/PredictiveAnalyticsModule';
import ConnectionStatusIndicator from './components/ConnectionStatusIndicator';
import ExportOptionsPanel from './components/ExportOptionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PerformanceAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    area: 'all',
    taskType: 'all',
    userRole: 'all'
  });
  const [bookmarks, setBookmarks] = useState([
    { name: 'Vista Mensual', filters: { dateRange: 'month', area: 'desarrollo' } },
    { name: 'Análisis Trimestral', filters: { dateRange: 'quarter', area: 'all' } }
  ]);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const mockNotifications = [
    {
      title: 'Cuello de botella detectado',
      message: 'Se ha identificado un posible cuello de botella en el proceso de revisión',
      time: 'Hace 15 min',
      read: false
    },
    {
      title: 'Reporte programado completado',
      message: 'El reporte semanal ha sido generado y enviado',
      time: 'Hace 1 hora',
      read: false
    },
    {
      title: 'Predicción actualizada',
      message: 'Los modelos predictivos han sido actualizados con nuevos datos',
      time: 'Hace 2 horas',
      read: true
    }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBookmarkSave = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const handleDrillDown = (data) => {
    console.log('Drill down data:', data);
    // Implement drill-down functionality
  };

  const handleTemplateSelect = (template) => {
    console.log('Selected template:', template);
    // Implement template selection logic
  };

  const handleStageClick = (stageData) => {
    console.log('Stage clicked:', stageData);
    // Implement stage analysis
  };

  const handleRecommendationClick = (recommendation) => {
    console.log('Recommendation clicked:', recommendation);
    // Implement recommendation details
  };

  const handleExport = (config) => {
    console.log('Export config:', config);
    // Implement export functionality
  };

  const handleSchedule = (config) => {
    console.log('Schedule config:', config);
    // Implement schedule functionality
  };

  const tabOptions = [
    { value: 'overview', label: 'Vista General', icon: 'BarChart3' },
    { value: 'trends', label: 'Tendencias', icon: 'TrendingUp' },
    { value: 'templates', label: 'Plantillas', icon: 'FileText' },
    { value: 'funnel', label: 'Embudo', icon: 'Filter' },
    { value: 'predictions', label: 'Predicciones', icon: 'Zap' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`}>
        <NavigationHeader 
          onMenuToggle={handleSidebarToggle}
          notifications={mockNotifications}
          globalFilters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <main className="p-6">
          <BreadcrumbTrail filters={filters} />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Análisis de Rendimiento</h1>
              <p className="text-text-secondary mt-1">
                Capacidades analíticas profundas para optimización de flujos de trabajo
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowExportPanel(true)}
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
              <Button
                variant="outline"
                iconName="Bookmark"
                iconPosition="left"
              >
                Marcadores
              </Button>
              <Button
                iconName="RefreshCw"
                iconPosition="left"
              >
                Actualizar
              </Button>
            </div>
          </div>

          {/* Connection Status */}
          <div className="mb-6">
            <ConnectionStatusIndicator refreshInterval={15} />
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onBookmark={handleBookmarkSave}
            bookmarks={bookmarks}
          />

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabOptions?.map((tab) => (
                  <button
                    key={tab?.value}
                    onClick={() => setActiveTab(tab?.value)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm hover-transition ${
                      activeTab === tab?.value
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {(activeTab === 'overview' || activeTab === 'trends') && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <TrendAnalysisChart data={filters} onDrillDown={handleDrillDown} />
                </div>
                <div>
                  <WorkflowTemplateRanking onTemplateSelect={handleTemplateSelect} />
                </div>
              </div>
            )}

            {(activeTab === 'overview' || activeTab === 'templates') && activeTab !== 'trends' && (
              <WorkflowTemplateRanking onTemplateSelect={handleTemplateSelect} />
            )}

            {(activeTab === 'overview' || activeTab === 'funnel') && activeTab !== 'trends' && activeTab !== 'templates' && (
              <WorkflowFunnelVisualization onStageClick={handleStageClick} />
            )}

            {(activeTab === 'overview' || activeTab === 'predictions') && activeTab !== 'trends' && activeTab !== 'templates' && activeTab !== 'funnel' && (
              <PredictiveAnalyticsModule onRecommendationClick={handleRecommendationClick} />
            )}
          </div>

          {/* Mobile Tab Content */}
          <div className="lg:hidden mt-6">
            {activeTab === 'trends' && (
              <TrendAnalysisChart data={filters} onDrillDown={handleDrillDown} />
            )}
            {activeTab === 'templates' && (
              <WorkflowTemplateRanking onTemplateSelect={handleTemplateSelect} />
            )}
            {activeTab === 'funnel' && (
              <WorkflowFunnelVisualization onStageClick={handleStageClick} />
            )}
            {activeTab === 'predictions' && (
              <PredictiveAnalyticsModule onRecommendationClick={handleRecommendationClick} />
            )}
          </div>

          {/* Key Insights Summary */}
          <div className="mt-8 p-6 bg-surface border border-border rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Resumen de Insights Clave</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">+15%</div>
                <div className="text-sm text-text-secondary">Mejora en Eficiencia</div>
                <div className="text-xs text-text-secondary mt-1">vs. trimestre anterior</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">-44%</div>
                <div className="text-sm text-text-secondary">Reducción Tiempo Ciclo</div>
                <div className="text-xs text-text-secondary mt-1">promedio mensual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">92%</div>
                <div className="text-sm text-text-secondary">Precisión Predictiva</div>
                <div className="text-xs text-text-secondary mt-1">modelo actual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">3</div>
                <div className="text-sm text-text-secondary">Cuellos Identificados</div>
                <div className="text-xs text-text-secondary mt-1">requieren atención</div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Export Panel */}
      <ExportOptionsPanel
        isOpen={showExportPanel}
        onClose={() => setShowExportPanel(false)}
        onExport={handleExport}
        onSchedule={handleSchedule}
      />
    </div>
  );
};

export default PerformanceAnalytics;