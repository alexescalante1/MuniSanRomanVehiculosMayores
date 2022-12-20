import { Routes, Route } from "react-router-dom";
import { Inicio, Ejemplo } from "../../../presentation/View/Pages/Apps/Inicio";

export function RoutesInicio() {
  return (
    <>
      <Routes>
        <Route
          path="/inicio"
          element={
            <>
              <Inicio />
            </>
          }
        />
        <Route
          path="/inicio/inbox"
          element={
            <>
              <Ejemplo />
            </>
          }
        />
        <Route
          path="/inicio/mis-eventos"
          element={
            <>
              
            </>
          }
        />
        <Route
          path="/inicio/mi-perfil"
          element={
            <>
              
            </>
          }
        />
        <Route
          path="/configuraciones/usuarios"
          element={
            <>
              {/* <UsuariosSistema/> */}
            </>
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
