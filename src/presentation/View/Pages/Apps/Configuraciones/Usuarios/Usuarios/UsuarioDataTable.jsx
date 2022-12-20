import React from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { UsuariosDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/esm/Button";
import FormRegistrarUsuario from "./FormRegistrarUsuario";

const UsuarioDataTable = ({usuarioActualizar,products}) => {
  
  console.log("Desde productos table")
  console.log(products)

  const [lgShow, setLgShow] = useState(false);
  const [UsuarioEditar, setUsuarioEditar] = useState([]);

  //MOSTRAR MODAL PARA EDITAR USUARIO
  const mostrarValor = async (idValor) => {
    const Access = ApiContextRequest("11");
    let url = Access.cPath + "?idUsuario=" + idValor;
    try {
      const data = await new UsuariosDT(url, Access.cMethod).GetUsuario();
      console.log(data);
      setUsuarioEditar(data.data)
      setLgShow(true);
    } catch (error) {
      Alertas("error", "Error al traer los datos");
    }

    console.log("Presionaste el siguente ID:" + idValor);
  };
  //OBTIENE EL ELEMENTO DE CADA VALOR
  const ObtenerIdUsuario = (idValor) => {
    return (
      <div>
        <Button type="" onClick={() => mostrarValor(idValor.idUsuario)}>
          <i className="fa fa-edit"></i>
        </Button>
        <Button
          type=""
          className="ml-2 bg-green-500"
          onClick={() => mostrarValor(idValor.idUsuario)}
        >
          <i className="fa fa-eye"></i>
        </Button>
      </div>
    );
  };
  return (
    <div>
      <div className="card mt-3">
        <DataTable value={products.data} responsiveLayout="scroll">
          <Column
            field="idUsuario"
            body={ObtenerIdUsuario.bind(this)}
            header="ACCIONES"
          ></Column>
          <Column field="cCelular" header="Celular"></Column>
          <Column field="cDocumento" header="DNI"></Column>
          <Column field="cNombreCompleto" header="Nombre Completo"></Column>
          <Column field="cEmail" header="Email"></Column>
        </DataTable>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg mb-5">
            ACTUALIZAR USUARIO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistrarUsuario dato={UsuarioEditar} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsuarioDataTable;
