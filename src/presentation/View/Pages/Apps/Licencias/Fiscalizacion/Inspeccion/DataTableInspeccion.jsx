import React, { useEffect, useRef, useState } from "react";
import { Alertas, GenDataTable } from "../../../../../../Components";
import { SelectButton } from "primereact/selectbutton";

import PrintInspeccionUno from "./PrintInspeccionUno";
import CambiarEstado from "./CambiarEstado";

const DataTableInspeccion = ({ datoEmpresa, ActualizarCard, actualizar }) => {
  const [modalInspeccion, setModalInspeccion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [idCertificado, setIdCertificado] = useState("");
  const [idVehiculo, setIdVehiculo] = useState("");

  console.log("datoEmpresa");
  console.log(actualizar);
  const options = ["APROBAR"];

  const columns = [
    {
      name: (
        <>
          <span style={{ minWidth: "300px" }}>PLACA</span>
        </>
      ),
      idName: "cPlaca",
      selector: (row) => row.cPlaca,
    },
    {
      name: "CONDUCTOR",
      idName: "cConductor",
      selector: (row) => row.cConductor,
    },
    {
      name: "CERTIFICADO",
      idName: "nCertificado",
      selector: (row) => row.nCertificado,
    },
    {
      name: (
        <>
          <span style={{ minWidth: "100px", textAlign: "left" }}>
            INSPECCION
          </span>
        </>
      ),
      idName: "Inspeccion",
      selector: (row) => row.Inspeccion,
    },
    {
      name: "ESTADO",
      idName: "Estado",
      selector: (row) => row.Estado,
    },
    {
      name: "TUC",
      idName: "TUC",
      selector: (row) => row.TUC,
    },
  ];

  let values = [];
  const obtenerData = async (e) => {
    datoEmpresa.forEach((element) => {
      values.push({
        Inspeccion: (
          <>
            <span style={{ width: "10px" }}>
              <button
                className="btn btn-success"
                onClick={async () => imprimirInspeccion(element?.idCertificado)}
              >
                <i className="fa fa-print"></i>
              </button>
            </span>
          </>
        ),
        TUC: (
          <>
            {element.idEstado === "6" ? (
              <span style={{ width: "10px" }}>
                <button
                  className="btn btn-success"
                  onClick={async () => editarEmpresa(element?.idCertificado)}
                >
                  <i className="fa fa-print"></i>
                </button>
              </span>
            ) : (
              <div></div>
            )}
          </>
        ),
        Estado: (
          <>
            <SelectButton
              value={element.idEstado === "6" ? "APROBAR" : "ON"}
              options={options}
              onClick={() => cambiarEstadoVehiculo(element.idCertificado)}
            />
          </>
        ),
        cPlaca: element.cPlaca,
        cConductor: element.cConductor,
        nCertificado: element.nCertificado,
      });
    });
  };

  useEffect(() => {
    obtenerData();
    console.log("DESDE EL USE EFFECT DE LLENAR DATATABLE");
  }, [modalInspeccion, visible, actualizar, datoEmpresa]);

  const editarEmpresa = (e) => {
    console.log(e);
  };
  const imprimirInspeccion = (e) => {
    setModalInspeccion(true);
    setIdCertificado(e);
    console.log(e);
  };

  //-------------------------------------
  //CAMBIAR ESTADO METODO
  //-------------------------------------

  const cambiarEstadoVehiculo = (e) => {
    setIdVehiculo(e);
    setVisible(true);
  };

  return (
    <div className="mt-4">
      <div className="card mt-3 w-full">
        <div className="w-full">
          <GenDataTable columns={columns} data={values} />
        </div>
      </div>
      <PrintInspeccionUno
        setModalInspeccion={setModalInspeccion}
        modalInspeccion={modalInspeccion}
        idCertificado={idCertificado}
      />
      <CambiarEstado
        setVisible={setVisible}
        visible={visible}
        idVehiculo={idVehiculo}
        ActualizarCard={ActualizarCard}
      />
    </div>
  );
};

export default DataTableInspeccion;
