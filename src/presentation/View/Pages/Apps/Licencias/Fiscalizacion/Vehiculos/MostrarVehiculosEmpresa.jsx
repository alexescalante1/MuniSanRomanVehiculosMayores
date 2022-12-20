import React, { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { Card } from "primereact/card";

const MostrarVehiculosEmpresa = ({datoEmpresa}) => {
  console.log("desde informacion de Empresa");
  console.log(datoEmpresa);
  return (
    <div className="mb-4">
      <div className="card text-center mt-4 w-11/12 m-auto shadow-xl mb-4">
        <div className="card-header font-bold uppercase ">
          Informacion de la empresa:{" "}
          <span className="font-extrabold text-lg"></span>
          <BusinessIcon fontSize="large" className="text-red-800" />
        </div>
        <div className="card-body">
          {true && (
            <div className="justify-between md:flex">
              <div className="text-left w-full sm:w-2/4 mr-3">
                <p className="mb-2">
                  <span className="text-bold mr-3">RUC:</span>
                  {datoEmpresa.cRUC}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">NOMBRE COMERCIAL:</span>{" "}
                  {datoEmpresa.cNombreComercial}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">RAZÓN SOCIAL:</span>{" "}
                  {datoEmpresa.cRazonSocial}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">DIRECCIÓN:</span>{" "}
                  {datoEmpresa.cDireccion}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">TIPO SERVICIO:</span>
                  {datoEmpresa.cServicio}
                </p>
              </div>
              <div className="text-left sm:w-2/5 w-full">
                <p className="mb-2">
                  <span className="text-bold mr-3">RESOLUCION:</span>{" "}
                  {datoEmpresa.nResolucion}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">TIPO RESO.:</span>{" "}
                  {datoEmpresa.cTipoResolucion}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">MODALIDAD:</span>{" "}
                </p>
                <p className="mb-2">
                  <span className="text-bold mr-3">FECHA CADUCIDAD:</span>{" "}
                  {datoEmpresa.dFinalVigencia}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Informacion proporcionado por LICENCIAS-APP
        </div>
      </div>
    </div>
  );
};

export default MostrarVehiculosEmpresa;
