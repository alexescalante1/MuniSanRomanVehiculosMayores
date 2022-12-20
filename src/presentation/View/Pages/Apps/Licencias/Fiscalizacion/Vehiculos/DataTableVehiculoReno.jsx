import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import Button from "react-bootstrap/esm/Button";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import FrmEditarVehiculo from "../Editar/FrmEditarVehiculo";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { ConductorDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
const DataTableVehiculoReno = ({ datoEmpresa }) => {
  const { lstVehiculos } = datoEmpresa;
  const [modalVehiculo, setModalVehiculo] = useState(false);
  const [vehiculoData, setVehiculoData] = useState({});
  console.log("LISTA VEHICULOS");
  console.log(datoEmpresa);

  const editarEmpresa = async (idValor) => {
    const Access = ApiContextRequest("20");
    const UrlNew = Access.cPath + "?nTipo=1&cBusqueda=" + idValor;
    try {
      const httpResponse = await new ConductorDT(
        UrlNew,
        Access.cMethod
      ).GetVehiculoId();
      if (httpResponse.header.errors.length > 0) {
        console.log(httpResponse.header.errors[0].message);
        const alertas = httpResponse.header.errors;
        alertas.map((e) => Alertas("warning", e.message));
      } else {
        setVehiculoData(httpResponse.data);
      }
    } catch (error) {
      Alertas("error", "Error en Obtener los datos del vehículo");
    }
    setModalVehiculo(true);
    console.log(idValor);
  };

  const ObtenerIdUsuario = (idValor) => {
    return (
      <div>
        <>
          <Button type="" onClick={() => editarEmpresa(idValor.idVehiculo)}>
            <i className="fa fa-edit"></i>
          </Button>
          <Button
            type=""
            className="ml-1 bg-green-500"
            //onClick={() => mostrarInformacion(idValor.idEmpresa)}
          >
            <i className="fa fa-eye"></i>
          </Button>
        </>
      </div>
    );
  };
  return (
    <div className="mt-4">
      <div className="card mt-3 w-11/12  m-auto ">
        <DataTable value={lstVehiculos} responsiveLayout="scroll" size="large">
          <Column field="cPlaca" header="PLACA"></Column>
          <Column
            field="cPropietario"
            style={{ width: "25%" }}
            header="CONDUCTOR"
          ></Column>
          <Column
            field="idVehiculo"
            style={{ width: "20%", minWidth: "124px" }}
            body={ObtenerIdUsuario.bind(this)}
            header="ACCIONES"
          ></Column>
          <Column field="cMarca" header="MARCA"></Column>
          <Column field="cModelo" header="MODELO"></Column>
        </DataTable>
      </div>

      <Dialog
        header="ACTUALIZAR VEHÍCULO"
        visible={modalVehiculo}
        style={{ width: "80vw" }}
        //footer={renderFooter("displayBasic")}
        onHide={() => setModalVehiculo(false)}
        breakpoints={{ "960px": "75vw", "500px": "100vw" }}
      >
        <FrmEditarVehiculo
          vehiculoData={vehiculoData}
          setModalVehiculo={setModalVehiculo}
        />
      </Dialog>
    </div>
  );
};

export default DataTableVehiculoReno;
