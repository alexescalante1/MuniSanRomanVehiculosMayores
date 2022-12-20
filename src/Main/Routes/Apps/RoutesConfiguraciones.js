import { Routes, Route } from "react-router-dom";
import { Inicio } from "../../../presentation/View/Pages/Apps/Inicio";

export function RoutesConfiguraciones() {
  return (
    <>
      <Routes>
        <Route
          path="/configuraciones"
          element={
            <>
              {/* <Inicio /> */}
            </>
          }
        />
        <Route
          path="/configuraciones/configuraciones"
          element={
            <>
              {/* <Perfiles /> */}
            </>
          }
        />
        <Route
          path="/configuraciones/configuraciones"
          element={
            <>
              {/* <Perfiles /> */}
            </>
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
