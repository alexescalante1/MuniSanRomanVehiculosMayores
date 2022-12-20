import React from "react";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import FormRegistrarVehiculo from "./FormRegistrarVehiculo";
import { InputText } from "primereact/inputtext";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import MostrarVehiculosEmpresa from "./MostrarVehiculosEmpresa";

import "react-accessible-accordion/dist/fancy-example.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import DataTableVehiculoReno from "./DataTableVehiculoReno";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const VehiculosIndex = () => {
  const [openMAutorizacion, setOpenMAutorizacion] = useState(false);
  const [message, setMessage] = useState("");
  const [datoEmpresa, setDatoEmpresa] = useState({});
  const [actualizar, setActualizar] = useState(1);
  const refresh = () => setActualizar(actualizar + 1);
  const ActualizarCard = async (e) => {
    e.preventDefault();
    setActualizar(actualizar + 1);
  };

  const handleClickOpen = () => {
    setOpenMAutorizacion(true);
  };

  const handleClose = () => {
    setOpenMAutorizacion(false);
  };

  //----------------------------------------------------
  //    METODO PARA TRAER DATOS DE LA EMPRESA Y VEHICULOS
  //----------------------------------------------------
  const atraparValor = async () => {
    if (message.length !== 11) {
      Alertas("warning", "Escriba un número RUC Válido");
    } else {
      const Access = ApiContextRequest("15");
      const urlGetEmpresa =
        Access.cPath + "?nTipo=2&cBusqueda=" + message + "&lVehiculos=1";
      try {
        const data = await new EmpresaDT(
          urlGetEmpresa,
          Access.cMethod
        ).GetEmpresaAutorizacionId();
        const informacionEmpresa = data.data;
        setDatoEmpresa(informacionEmpresa);
        console.log("VERIFICAR DATOS EMPRESA");
        console.log(data.data);
        if (data.header.errors.length > 0) {
          console.log(data.header.errors[0].message);
          const alertas = data.header.errors;
          alertas.map((e) => Alertas("warning", e.message));
          //Alertas("warning", data.body.errors[0].message);
        } else {
          Alertas("success", "DATOS DE LA EMPRESA ECONTRADOS");
        }
      } catch (error) {
        Alertas("error", "hubo un error en llamar a la Api");
      }
    }
  };
  const ponerDato = async (e) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Registrar Vehiculo</h3>
                  <div className="card-tools">
                    {message ? (
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="card-refresh"
                        data-source="widgets.html"
                        data-source-selector="#card-refresh-content"
                        data-load-on-init="false"
                        onClick={atraparValor}
                      >
                        <i className="fas fa-sync-alt" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="card-refresh"
                        data-source="widgets.html"
                        data-source-selector="#card-refresh-content"
                        data-load-on-init="false"
                      >
                        <i className="fas fa-sync-alt" />
                      </button>
                    )}
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
                <div className="grid p-fluid  justify-items-center mb-4">
                  <div className="col-12 md:col-4 w-3/5 text-center">
                    <div className="p-inputgroup mt-4 ">
                      <InputText
                        type="number"
                        placeholder="Buscar Empresa (INGRESE RUC)"
                        onChange={(e) => ponerDato(e)}
                      />
                      <Button
                        icon="pi pi-search"
                        className="p-button p-component p-button-warning p-button-icon-only"
                        onClick={(e) => atraparValor(e)}
                      />
                    </div>
                  </div>
                </div>
                {datoEmpresa.idEmpresa ? (
                  <>
                    <MostrarVehiculosEmpresa datoEmpresa={datoEmpresa} />

                    <div className="w-11/12 m-auto text-center">
                      <Button
                        variant="contained"
                        className="text-center"
                        onClick={handleClickOpen}
                      >
                        AGREGAR NUEVO VEHICULO
                      </Button>
                      <Dialog
                        fullScreen
                        open={openMAutorizacion}
                        onClose={handleClose}
                      >
                        <AppBar sx={{ position: "relative" }}>
                          <Toolbar>
                            <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleClose}
                              aria-label="close"
                            >
                              <CloseIcon />
                            </IconButton>
                          </Toolbar>
                        </AppBar>
                        <List>
                          <FormRegistrarVehiculo
                            datoEmpresa={datoEmpresa}
                            setOpenMAutorizacion={setOpenMAutorizacion}
                          />
                        </List>
                      </Dialog>
                    </div>
                    <DataTableVehiculoReno datoEmpresa={datoEmpresa} />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehiculosIndex;
