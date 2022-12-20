import React, {useState, useEffect} from "react";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DataTableVehiculos from "../../Fiscalizacion/Vehiculos/DataTableVehiculos";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";

const VisualizarAutorizacion = ({ idEmpresa }) => {
  const [dataEmpresa, setDataEmpresa] = useState({});
  
  const ObternerData = async (e) => {
    //Alertas("info", "Obteniendo datos");
    const Access = ApiContextRequest("15");
    let url = Access.cPath + "?nTipo=1&cBusqueda=" + idEmpresa + "&lVehiculos=1";
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new EmpresaDT(
          url,
          Access.cMethod
        ).GetEmpresaAutorizacionId();

        console.log(data);
        if (data?.header?.success) {
          setDataEmpresa(data?.data);
        } else {
          Alertas("error", data?.header?.message);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    ObternerData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-4 mb-3">
          <div className="col-span-2 card text-center mt-4 w-11/12 m-auto shadow-xl mb-4">
            <div className="card-header font-bold uppercase ">
              Informacion de la empresa:{" "}
              <span className="font-bold text-lg">Empresa Transporte</span>
              <BusinessIcon fontSize="large" className="text-red-800" />
            </div>
            <div className="card-body">
              {true && (
                <div className="justify-between md:flex">
                  <div className="text-left">
                    <p className="mb-2">
                      <span className="text-bold uppercase">RUC:</span>{" "}
                      {dataEmpresa?.cRUC}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">Nombre:</span>{" "}
                      {dataEmpresa?.cNombreComercial}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">Razon Social:</span>{" "}
                      {dataEmpresa?.cRazonSocial}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">Representate:</span>{" "}
                      {dataEmpresa?.cRepresentante}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">Dirección:</span>{" "}
                      {dataEmpresa?.cDireccion}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">
                        Tipo Resolución:
                      </span>{" "}
                      {dataEmpresa?.cTipoResolucion}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold uppercase">
                        Tipo Servicio:
                      </span>{" "}
                      {dataEmpresa?.cServicio}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer text-muted">
              Informacion proporcionado por LICENCIAS-APP
            </div>
          </div>
          <div className="col-span-2 card text-center mt-4 w-11/12 m-auto shadow-xl mb-4">
            <div className="card-header font-bold uppercase ">
              INFORMACIÓN DE LA AUTORIZACIÓN:{" "}
              <BusinessIcon fontSize="large" className="text-red-800" />
            </div>
            <div className="card-body">
              {true && (
                <div className="justify-between md:flex">
                  <div className="text-left">
                    <p className="mb-2">
                      <span className="text-bold">AUTORIZACIÓN:</span>{" "}
                      {dataEmpresa?.nResolucion}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold">SERVICIO:</span>{" "}
                      {dataEmpresa?.cServicio}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold">RESOLUCIÓN:</span>{" "}
                      {dataEmpresa?.cTipoResolucion}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold">FECHA REGISTRO:</span>{" "}
                      {dataEmpresa?.dFechaRegistro}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold">FECHA CADUCIDAD:</span>{" "}
                      {dataEmpresa?.dFinalVigencia}
                    </p>
                    <p className="mb-2">
                      <span className="text-bold">N° VEHÍCULOS:</span>{" "}
                      {dataEmpresa?.cNumVehiculos}
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
        <div className="card text-center mt-4 w-full m-auto shadow-xl mb-2">
            <div className="card-header font-bold uppercase ">
              Vehiculos de la empresa
              <DirectionsBusIcon fontSize="large" className="text-red-800" />
            </div>
            <div className="card-body w-full">
              <DataTableVehiculos datoEmpresa={dataEmpresa} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default VisualizarAutorizacion;
