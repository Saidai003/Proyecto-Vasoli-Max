import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ currentPath, filters = {} }) => {
  const location = useLocation();
  
  const routeLabels = {
    '/executive-overview': 'Resumen Ejecutivo',
    '/operations-command-center': 'Centro de Operaciones',
    '/performance-analytics': 'Análisis de Rendimiento',
    '/team-performance-hub': 'Rendimiento del Equipo'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', path: '/', isHome: true }
    ];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't render if we're on the home page
  if (location?.pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            
            {crumb?.isHome ? (
              <Link
                to={crumb?.path}
                className="flex items-center hover:text-text-primary nav-transition"
              >
                <Icon name="Home" size={14} className="mr-1" />
                <span className="hidden sm:inline">{crumb?.label}</span>
              </Link>
            ) : crumb?.isLast ? (
              <span className="text-text-primary font-medium">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="hover:text-text-primary nav-transition truncate max-w-32 sm:max-w-none"
                title={crumb?.label}
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {/* Active Filters Indicator */}
      {Object.keys(filters)?.length > 0 && (
        <div className="hidden md:flex items-center ml-4 pl-4 border-l border-border">
          <Icon name="Filter" size={14} className="mr-1 text-accent" />
          <span className="text-xs text-accent">
            {Object.keys(filters)?.length} filtro{Object.keys(filters)?.length !== 1 ? 's' : ''} activo{Object.keys(filters)?.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </nav>
  );
};

export default BreadcrumbTrail;