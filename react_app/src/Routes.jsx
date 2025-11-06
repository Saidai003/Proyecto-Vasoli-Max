import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import NotFound from "./pages/NotFound";
import FormCenter from './pages/form-center/Index.jsx';
import Login from './pages/login/Index.jsx';
import SupportPortal from './pages/support-portal/Index.jsx';
import DashboardHome from './pages/dashboard-home/Index.jsx';
import RequestTracking from './pages/request-tracking/Index.jsx';
import RespuestasForms from './pages/Respuestas/Index.jsx';
import FormBuilder from './pages/form-builder/Index.jsx';
import FormRenderer from './pages/form-renderer/Index.jsx';
import Users from './pages/users/Index.jsx';
import Operationcenter from './pages/Centro-de-operaciones/Index.jsx';
import PerformanceAnalytics from './pages/Analisis-de-rendimiento/Index.jsx';
import Home from './clientPages/home/Index.jsx';
import FormList from './clientPages/FormList/Index.jsx';
import Form from './clientPages/gestion/Index.jsx';
import DashboardGestiones from "./pages/dashboard-gestiones/DashboardGestiones.jsx";
import GestionDetalle from "./pages/gestion/GestionDetalle.jsx";




const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element = {<Login />}/>
          <Route path="/" element = {<Home />}/>
          <Route path="/Remuneraciones" element = {<FormList section={"Remuneraciones"}/>}/>
          <Route path="/Finiquitos" element = {<FormList section={"Finiquitos"} />}/>
          <Route path="/Anexos" element = {<FormList section={"Anexos"} />}/>
          <Route path="/Otras" element = {<FormList section={"Otras"} />}/>
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form-renderer" element={<FormRenderer />} />
          <Route path="/forms" element={<Form />} />
          {/* Rutas protegidas */}
          
          <Route path="/form-center"
            element={
              <ProtectedRoute>
                <FormCenter />
              </ProtectedRoute>
            }
          />
          <Route path="/centro-operaciones" element={<ProtectedRoute><Operationcenter /></ProtectedRoute>}/>
          <Route path="/RespuestasForms" element={<ProtectedRoute><RespuestasForms /></ProtectedRoute>}/>
          <Route path="/support-portal" element={<ProtectedRoute> <SupportPortal /> </ProtectedRoute>}/>
          <Route path="/users" element={<ProtectedRoute> <Users /> </ProtectedRoute>}/>
          <Route path="/dashboard-home" element={<ProtectedRoute> <DashboardHome /> </ProtectedRoute>}/>
          <Route path="/request-tracking" element={<ProtectedRoute> <RequestTracking /> </ProtectedRoute>}/>
          <Route path="/support-portal" element={<ProtectedRoute> <DashboardHome /> </ProtectedRoute>}/>
          <Route path="/analisis-rendimiento" element={<ProtectedRoute> <PerformanceAnalytics /> </ProtectedRoute>}/>
          <Route path="/dashboard-gestiones" element={<ProtectedRoute> <DashboardGestiones /> </ProtectedRoute>}/>
          <Route path="/gestion/:id" element={<ProtectedRoute> <GestionDetalle /> </ProtectedRoute>}/>

            
          {/* Rutas libres */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
