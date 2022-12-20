import { Routes, Route } from "react-router-dom";
import { Inicio } from "../../../presentation/View/Pages/Apps/Inicio";

export function RoutesBase() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Inicio />
            </>
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
