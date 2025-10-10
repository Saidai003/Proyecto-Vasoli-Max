import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportOptionsPanel = ({ onExport, onSchedule, isOpen, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [includePredictions, setIncludePredictions] = useState(true);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [emailRecipients, setEmailRecipients] = useState('');

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' },
    { value: 'powerpoint', label: 'PowerPoint Presentation', icon: 'Presentation' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' }
  ];

  const handleExport = () => {
    const exportConfig = {
      format: exportFormat,
      includeCharts,
      includeRawData,
      includePredictions,
      timestamp: new Date()?.toISOString()
    };
    
    if (onExport) {
      onExport(exportConfig);
    }
    onClose();
  };

  const handleSchedule = () => {
    const scheduleConfig = {
      format: exportFormat,
      frequency: scheduleFrequency,
      recipients: emailRecipients?.split(',')?.map(email => email?.trim()),
      includeCharts,
      includeRawData,
      includePredictions
    };
    
    if (onSchedule) {
      onSchedule(scheduleConfig);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-300"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-surface border-l border-border z-400 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Opciones de Exportación</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Export Format */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Formato de Exportación</h4>
            <div className="grid grid-cols-2 gap-2">
              {formatOptions?.map((format) => (
                <button
                  key={format?.value}
                  onClick={() => setExportFormat(format?.value)}
                  className={`p-3 rounded-lg border text-left hover-transition ${
                    exportFormat === format?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={format?.icon} size={16} />
                    <span className="font-medium text-sm">{format?.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Options */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Contenido a Incluir</h4>
            <div className="space-y-3">
              <Checkbox
                label="Gráficos y Visualizaciones"
                description="Incluir todos los gráficos del dashboard"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
              />
              <Checkbox
                label="Datos en Bruto"
                description="Incluir tablas de datos sin procesar"
                checked={includeRawData}
                onChange={(e) => setIncludeRawData(e?.target?.checked)}
              />
              <Checkbox
                label="Análisis Predictivo"
                description="Incluir predicciones y recomendaciones"
                checked={includePredictions}
                onChange={(e) => setIncludePredictions(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Quick Export */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Exportación Inmediata</h4>
            <Button
              onClick={handleExport}
              className="w-full"
              iconName="Download"
              iconPosition="left"
            >
              Exportar Ahora
            </Button>
          </div>

          {/* Scheduled Reports */}
          <div className="mb-6 pt-6 border-t border-border">
            <h4 className="font-medium text-text-primary mb-3">Reportes Programados</h4>
            
            <div className="space-y-4">
              <Select
                label="Frecuencia"
                options={frequencyOptions}
                value={scheduleFrequency}
                onChange={setScheduleFrequency}
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Destinatarios (separados por comas)
                </label>
                <textarea
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e?.target?.value)}
                  placeholder="admin@empresa.com, gerente@empresa.com"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={handleSchedule}
                variant="outline"
                className="w-full"
                iconName="Calendar"
                iconPosition="left"
              >
                Programar Reporte
              </Button>
            </div>
          </div>

          {/* Existing Schedules */}
          <div className="pt-6 border-t border-border">
            <h4 className="font-medium text-text-primary mb-3">Reportes Programados Activos</h4>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">Reporte Semanal</span>
                  <Button variant="ghost" size="xs">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
                <div className="text-xs text-text-secondary">
                  <p>Formato: PDF • Cada lunes a las 9:00</p>
                  <p>Destinatarios: 3 personas</p>
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">Reporte Mensual</span>
                  <Button variant="ghost" size="xs">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
                <div className="text-xs text-text-secondary">
                  <p>Formato: Excel • Primer día del mes</p>
                  <p>Destinatarios: 5 personas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Export History */}
          <div className="pt-6 border-t border-border">
            <h4 className="font-medium text-text-primary mb-3">Historial de Exportaciones</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-text-primary">Reporte_Analytics_2024-10-09.pdf</span>
                  <p className="text-xs text-text-secondary">Hace 2 horas</p>
                </div>
                <Button variant="ghost" size="xs">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-text-primary">Datos_Rendimiento_2024-10-08.xlsx</span>
                  <p className="text-xs text-text-secondary">Ayer</p>
                </div>
                <Button variant="ghost" size="xs">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-text-primary">Presentacion_Ejecutiva_2024-10-07.pptx</span>
                  <p className="text-xs text-text-secondary">Hace 2 días</p>
                </div>
                <Button variant="ghost" size="xs">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportOptionsPanel;