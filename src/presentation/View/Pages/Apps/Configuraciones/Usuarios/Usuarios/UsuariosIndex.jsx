import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import FormRegistrarUsuario from "./FormRegistrarUsuario";
import UsuarioDataTable from "./UsuarioDataTable";
import { Alertas, DataTableComponent } from "../../../../../../Components";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { UsuariosDT } from "../../../../../../../Data/UseCases/Apps";
export function UsuariosIndex() {
  const [products, setProducts] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [UsuarioEditar, setUsuarioEditar] = useState([]);
  const [usuarioActualizar, setUsuarioActualizar] = useState({});
  const [actualizar, setActualizar] = useState(0);
  const ActualizarCard = async (e) => {
    e.preventDefault();
    setActualizar(actualizar + 1);
  };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  const getAllUsers = async (e) => {
    const Access = ApiContextRequest("10");
    // try {
    //   let data = await new UsuariosDT(
    //     Access.cPath,
    //     Access.cMethod
    //   ).GetAllUsuariosRegistrados();
    //   console.log(data);
    //   setProducts(data);
    //   return data;
    // } catch (error) {
    //   Alertas("error", "Hubo un error Interno");
    // }
  };
  return (
    <div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Registrar Usuario</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="card-refresh"
                      data-source="widgets.html"
                      data-source-selector="#card-refresh-content"
                      data-load-on-init="false"
                      onClick={ActualizarCard}
                    >
                      <i className="fas fa-sync-alt" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="maximize"
                    >
                      <i className="fas fa-expand" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <Button
                    onClick={() => setLgShow(true)}
                    type="submit"
                    variant="contained"
                  >
                    REGISTRAR USUARIO
                  </Button>
                  {/* <DataTableEmpresas /> */}
                  <UsuarioDataTable
                    usuarioActualizar={usuarioActualizar}
                    products={products}
                  />
                  <DataTableComponent products={products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            REGISTRAR USUARIO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistrarUsuario
            dato={UsuarioEditar}
            setUsuarioActualizar={setUsuarioActualizar}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
