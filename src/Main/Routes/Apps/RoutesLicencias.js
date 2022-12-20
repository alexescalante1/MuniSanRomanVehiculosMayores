import { Routes, Route } from "react-router-dom";
//import { UsuariosIndex } from "../../../presentation/View/Pages/Apps/Configuraciones";
import { Inicio } from "../../../presentation/View/Pages/Apps/Inicio";
import {
  AutorizacionesIndex,
  EmpresasIndex,
} from "../../../presentation/View/Pages/Apps/Licencias";
import {
  RutasIndex,
  TUCGenerador,
  TUCImprimir,
  UsuariosIndex,
  MantenimientoIndex
} from "../../../presentation/View/Pages/Apps/Licencias";
import RenovacionEmpresaIndex from "../../../presentation/View/Pages/Apps/Licencias/Autorizaciones/Renovacion/RenovacionEmpresaIndex";
import FormRegistrarVehiculo from "../../../presentation/View/Pages/Apps/Licencias/Fiscalizacion/Vehiculos/FormRegistrarVehiculo";
import VehiculosIndex from "../../../presentation/View/Pages/Apps/Licencias/Fiscalizacion/Vehiculos/VehiculosIndex";
import { RenovacionIndex } from "../../../presentation/View/Pages/Apps/Licencias";
import ResponsabilidadIndex from "../../../presentation/View/Pages/Apps/Licencias/Autorizaciones/Responsabilidad/ResponsabilidadIndex";
import InspeccionIndes from "../../../presentation/View/Pages/Apps/Licencias/Fiscalizacion/Inspeccion/InspeccionIndes";

export function RoutesLicencias() {
  return (
    <>
      <Routes>
        <Route
          path="/vehiculos-mayores"
          element={
            <>
              <Inicio />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/licencias"
          element={<>{/* <Perfiles /> */}</>}
        />
        <Route
          path="/vehiculos-mayores/autorizaciones"
          element={
            <>
              <AutorizacionesIndex />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/empresa"
          element={
            <>
              <AutorizacionesIndex />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/rutas"
          element={
            <>
              <RutasIndex />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/consultas"
          element={
            <>
              <Inicio />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/cargar-excel"
          element={
            <>
              <TUCGenerador />
            </>
          }
        />
        <Route
          path="/vehiculos-mayores/certificados"
          element={
            <>
              <TUCImprimir />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/renovacion"
          element={
            <>
              <RenovacionEmpresaIndex />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/vehiculos"
          element={
            <>
              <VehiculosIndex />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/inspeccion"
          element={
            <>
              <InspeccionIndes />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/apoyo-del-sistema"
          element={
            <>
              <RenovacionIndex />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/responsabilidad"
          element={
            <>
              <ResponsabilidadIndex />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/usuarios"
          element={
            <>
              <UsuariosIndex />
            </>
          }
        />
        <Route
          path="vehiculos-mayores/mantenimiento"
          element={
            <>
              <MantenimientoIndex />
            </>
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
