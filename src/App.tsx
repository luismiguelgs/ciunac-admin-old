import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { useStateContext } from "./contexts/ContextProvider";
import Layout from "./routes/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./routes/ErrorPage";
import CertificadosPage from "./pages/certificados/CertificadosPage";
import ReportesPage from "./pages/reportes/ReportesPage";
import ProcesoPage from "./pages/ProcesoPage";
import OpcionesPage from "./pages/opciones/OpcionesPage";
import SolicitudesPage from "./pages/certificados/solicitudes/SolicitudesPage";
import DetalleSolicitudesPage from "./pages/certificados/solicitudes/DetalleSolicitudesPage";
import NuevaSolicitudPage from "./pages/certificados/solicitudes/NuevaSolicitudPage";
import MantenimientoPage from "./pages/MantenimientoPage";
import UsuariosPage from "./pages/UsuariosPage";
import ExamenesPage from "./pages/examen-ubicacion/ExamenesPage";
import SolicitudesExamenPage from "./pages/examen-ubicacion/solicitudes/SolicitudesExamenPage";
import ProspectosExamenPage from "./pages/examen-ubicacion/prospectos/ProspectosPage";
import Preloader from "./components/Preloader";
import TestPage from "./pages/TestPage";
import NuevaSolicitudExamenPage from "./pages/examen-ubicacion/solicitudes/NuevaSolicitudExamen.page";
import DetalleSolicitudesExamenPage from "./pages/examen-ubicacion/solicitudes/DetalleSolicitudesExamenPage";
import ProspectosDetallePage from "./pages/examen-ubicacion/prospectos/ProspectosDetallePage";
import ProspectosNuevoPage from "./pages/examen-ubicacion/prospectos/ProspectosNuevoPage";
import ConfiguracionPage from "./pages/examen-ubicacion/ConfiguracionPage";
import ExamenesDetailPage from "./pages/examen-ubicacion/examenes/ExamenDetailPage"
import RegistroCertificadosPage from "./pages/registro-certificados/RegistroCertificadosPage";
import RegistroCertificadosDetallePage from "./pages/registro-certificados/RegistroCertificadosDetallePage";
import RegistroCertificadosNuevoPage from "./pages/registro-certificados/RegistroCertificadosNuevoPage";
import ExamenNuevoPage from "./pages/examen-ubicacion/examenes/ExamenNuevoPage";

function App() 
{
    const { auth } = useStateContext()
    return (
        <>
            <Preloader />
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/test' element={<TestPage />} />
                    <Route path='*' element={<ErrorPage />} />
                    <Route element={<PrivateRoutes auth={auth}/>}>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<DashboardPage/>} />
                            {/** Solicitudes */}
                            <Route path='/certificados' element={<CertificadosPage />} />
                            <Route path='/reportes' element={<ReportesPage />} />
                            <Route path='/proceso' element={<ProcesoPage />} />
                            {/** Certificados */}
                            <Route path='/registro-certificados' element={<RegistroCertificadosPage />} />
                            <Route path='/registro-certificados/nuevo' element={<RegistroCertificadosNuevoPage />} />
                            <Route path='/registro-certificados/:id' element={<RegistroCertificadosDetallePage />} />
                            {/** Examen de Ubicación */}
                            <Route path='/examenes' element={<ExamenesPage />} />
                            <Route path="/examenes/nuevo" element={<ExamenNuevoPage />} />
                            <Route path='/examenes/:id' element={<ExamenesDetailPage />} />
                            <Route path='/examenes/solicitudes' element={<SolicitudesExamenPage />} />
                            <Route path='/examenes/solicitudes/:id' element={<DetalleSolicitudesExamenPage />} />
                            <Route path='/examenes/solicitudes/nueva' element={<NuevaSolicitudExamenPage />} />
                            <Route path='/examenes/prospectos' element={<ProspectosExamenPage />} />
                            <Route path='/examenes/prospectos/:id' element={<ProspectosDetallePage />} />
                            <Route path='/examenes/prospectos/nuevo' element={<ProspectosNuevoPage />} />
                            <Route path='/examenes/configuracion' element={<ConfiguracionPage />} />
                            {/** Opciones */}
                            <Route path='/opciones' element={<OpcionesPage />} />
                            <Route path='/solicitudes' element={<SolicitudesPage />} />
                            <Route path='/solicitudes/:id' element={<DetalleSolicitudesPage />} />
                            <Route path='/solicitud-nueva' element={<NuevaSolicitudPage />} />
                            <Route path='/mantenimiento' element={<MantenimientoPage />} />
                            <Route path='/usuarios' element={<UsuariosPage />} />
                            <Route path='*' element={<ErrorPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
