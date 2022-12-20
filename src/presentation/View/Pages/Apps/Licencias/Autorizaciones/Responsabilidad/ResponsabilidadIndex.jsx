import React, { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import FormRegistrarConductor from "../../Fiscalizacion/Vehiculos/FormRegistrarConductor";
import { Alertas } from "../../../../../../Components";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { ResponsabilidadesDT } from "../../../../../../../Data/UseCases/Apps/Licencia/Responsabilidades/ResponsabilidadesDT";
import { Card } from "primereact/card";
import { FormRegistrarPropietario } from "../../Fiscalizacion/Vehiculos/FormRegistrarPropietario";
import FormAdministrador from "../Autorizaciones/FormAdministrador";
const ResponsabilidadIndex = () => {
  const [datosConductor, setDatosConductor] = useState("");

  const [conductorMostrar, setConductorMostrar] = useState({
    cApellidoMaterno: undefined,
    cApellidoPaterno: undefined,
    cCelular: undefined,
    cDireccion: undefined,
    cDocumento: undefined,
    cEmail: undefined,
    cLicencia: undefined,
    cNombres: undefined,
    dFechaModificacion: undefined,
    dFinActividad: undefined,
    dIniActividad: undefined,
    idCategoria: undefined,
    idConductor: undefined,
    lEstado: undefined,
    lTipo: undefined,
    nGenero: undefined,
  });
  const [message, setMessage] = useState("");
  const [messagePropietario, setMessagePropietario] = useState("");
  const [messageRepresentante, setMessageRepresentante] = useState("");
  const [datosPropietarios, setDatosPropietario] = useState("");

  const [lgShowConductor, setLgShowConductor] = useState(false);
  const [lgShowPropietario, setLgShowPropietario] = useState(false);
  const [lgShowRepresentante, setLgShowRepresentante] = useState(false);

  const getCategoria = () => {
    let categoria;
    switch (conductorMostrar.idCategoria) {
      case "1":
        categoria = "AI";
        break;

      case "2":
        categoria = "AIAIIa";
        break;

      case "3":
        categoria = "AIIb";
        break;

      case "4":
        categoria = "AIIIa";
        break;

      case "5":
        categoria = "AIIIb";
        break;
      case "6":
        categoria = "AIIIc";
        break;
      case "7":
        categoria = "BI";
        break;
      case "8":
        categoria = "AIIIb";
        break;
      case "9":
        categoria = "BIIb";
        break;

      default:
        break;
    }
    return categoria;
  };
  const enviarDatosConductor = () => {
    setDatosConductor(conductorMostrar);
    setLgShowConductor(true);
  };
  const footer = (
    <span>
      <Button
        label="EDITAR"
        icon="pi pi-user-edit"
        onClick={enviarDatosConductor}
      />
    </span>
  );

  const limpiarConductor = () => {
    // setConductorMostrar({
    //   cApellidoMaterno: undefined,
    //   cApellidoPaterno: undefined,
    //   cCelular: undefined,
    //   cDireccion: undefined,
    //   cDocumento: undefined,
    //   cEmail: undefined,
    //   cLicencia: undefined,
    //   cNombres: undefined,
    //   dFechaModificacion: undefined,
    //   dFinActividad: undefined,
    //   dIniActividad: undefined,
    //   idCategoria: undefined,
    //   idConductor: undefined,
    //   lEstado: undefined,
    //   lTipo: undefined,
    //   nGenero: undefined,
    // });
    setMessage("");
  };
  const handleClose = () => {
    setLgShowConductor(false);
  };
  const handleClosePropietario = () => {
    setLgShowPropietario(false);
  };
  const handleCloseRepresentante = () => {
    setLgShowRepresentante(false);
  };
  const handleClickOpen = () => {
    setLgShowConductor(true);
  };
  const handleClickOpenRepresentante = () => {
    setLgShowRepresentante(true);
  };
  const handleClickOpenPropietario = () => {
    setLgShowPropietario(true);
  };
  const ponerDato = async (e) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
  const ponerDatoPropietario = async (e) => {
    setMessagePropietario(e.target.value);
    console.log(e.target.value);
  };
  const ponerDatoRepresentante = async (e) => {
    setMessageRepresentante(e.target.value);
    console.log(e.target.value);
  };

  const atraparValor = async () => {
    if (message.length <= 6) {
      Alertas("warning", "Escriba un número de DNI Válido");
    } else {
      const Access = ApiContextRequest("27");
      const urlGetEmpresa = Access.cPath + "?nTipo=2&cBusqueda=" + message;
      try {
        const data = await new ResponsabilidadesDT(
          urlGetEmpresa,
          Access.cMethod
        ).GetConductorId();
        const informacionConductor = data.data;
        console.log("VERIFICAR DATOS CONDUCTOR");
        setConductorMostrar(informacionConductor);
        console.log(data.data);
        if (data.header.errors.length > 0) {
          console.log(data.header.errors[0].message);
          const alertas = data.header.errors;
          alertas.map((e) => Alertas("warning", e.message));
          //Alertas("warning", data.body.errors[0].message);
        } else {
          Alertas("success", "DATOS DEL CONDUCTOR ECONTRADOS");
        }
      } catch (error) {
        Alertas("error", "hubo un error en llamar a la Api");
      }
    }
  };

  const atraparValorPropietario = async () => {
    console.log(messagePropietario);
  };
  const atraparValorRepresentante = async () => {
    console.log(messagePropietario);
  };
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-success">
              <div className="card-header">
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="card-refresh"
                    data-source="widgets.html"
                    data-source-selector="#card-refresh-content"
                    data-load-on-init="false"
                    // onClick={()=>ActualizarCard}
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
                <Accordion className="accordion-custom" activeIndex={0}>
                  <AccordionTab
                    onClick={limpiarConductor}
                    header={
                      <React.Fragment>
                        <i className="pi pi-car mr-3"></i>
                        <span>CONDUCTOR</span>
                      </React.Fragment>
                    }
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-inputgroup col-span-2">
                        <InputText
                          type="number"
                          placeholder="Buscar Conductor (INGRESE DNI)"
                          onChange={(e) => ponerDato(e)}
                        />
                        <Button
                          icon="pi pi-search"
                          className="p-button p-component p-button-warning p-button-icon-only"
                          onClick={(e) => atraparValor(e)}
                        />
                      </div>
                      <Button
                        variant="contained"
                        className="text-center"
                        onClick={handleClickOpen}
                      >
                        AGREGAR NUEVO CONDUCTOR
                      </Button>
                    </div>
                    {conductorMostrar.idConductor ? (
                      <div>
                        <Card
                          footer={footer}
                          title={
                            conductorMostrar.cNombres +
                            " (" +
                            conductorMostrar.cDocumento +
                            ")"
                          }
                          style={{
                            width: "98%",
                            marginBottom: "2em",
                            marginTop: "2em",
                          }}
                        >
                          <div className="justify-between md:flex bg-gray-50 p-2 rounded-xl">
                            <div className="text-left w-full sm:w-2/4 mr-3">
                              <p className="mb-2">
                                <span className="text-bold mr-3">DNI:</span>
                                {conductorMostrar.cDocumento}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">NOMBRE:</span>{" "}
                                {conductorMostrar.cNombres}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">
                                  APELLIDOS:
                                </span>{" "}
                                {conductorMostrar.cApellidoPaterno +
                                  " " +
                                  conductorMostrar.cApellidoMaterno}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">CORREO:</span>{" "}
                                {conductorMostrar.cEmail}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">CELULAR:</span>{" "}
                                {conductorMostrar.cCelular}
                              </p>
                            </div>
                            <div className="text-left sm:w-2/5 w-full">
                              <p className="mb-2">
                                <span className="text-bold mr-3">
                                  LICENCIA DE CONDUCIR:
                                </span>{" "}
                                {conductorMostrar.cLicencia}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">
                                  FECHA DE EXPEDICIÓN:
                                </span>{" "}
                                {conductorMostrar.dIniActividad}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">
                                  FECHA DE REAVLIDACIÓN:
                                </span>{" "}
                                {conductorMostrar.dFinActividad}
                              </p>
                              <p className="mb-2">
                                <span className="text-bold mr-3">
                                  CATEGORIA:
                                </span>{" "}
                                {getCategoria()}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <></>
                    )}
                  </AccordionTab>
                  <AccordionTab
                    header={
                      <React.Fragment>
                        <i className="mr-3 pi pi-user"></i>
                        <span>PROPIETARIO</span>
                      </React.Fragment>
                    }
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-inputgroup col-span-2">
                        <InputText
                          type="number"
                          placeholder="Buscar PROPIETARIO (INGRESE DNI)"
                          onChange={(e) => ponerDatoPropietario(e)}
                        />
                        <Button
                          icon="pi pi-search"
                          className="p-button p-component p-button-warning p-button-icon-only"
                          onClick={(e) => atraparValorPropietario(e)}
                        />
                      </div>
                      <Button
                        variant="contained"
                        className="text-center"
                        onClick={handleClickOpenPropietario}
                      >
                        AGREGAR NUEVO PROPIETARIO
                      </Button>
                    </div>
                  </AccordionTab>
                  <AccordionTab
                    header={
                      <React.Fragment>
                        <i className="mr-3 pi pi-user"></i>
                        <span>REPRESENTANTE</span>
                      </React.Fragment>
                    }
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-inputgroup col-span-2">
                        <InputText
                          type="number"
                          placeholder="Buscar REPRESENTANTE (INGRESE DNI)"
                          onChange={(e) => ponerDatoRepresentante(e)}
                        />
                        <Button
                          icon="pi pi-search"
                          className="p-button p-component p-button-warning p-button-icon-only"
                          onClick={(e) => atraparValorRepresentante(e)}
                        />
                      </div>
                      <Button
                        variant="contained"
                        className="text-center"
                        onClick={handleClickOpenRepresentante}
                      >
                        AGREGAR NUEVO PROPIETARIO
                      </Button>
                    </div>
                  </AccordionTab>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog fullScreen open={lgShowConductor} onClose={handleClose}>
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
          <FormRegistrarConductor
            //conductor={conductor}
            datosConductor={datosConductor}
            setDatosConductor={setDatosConductor}
            setLgShowConductor={setLgShowConductor}
          />
        </List>
      </Dialog>
      <Dialog
        fullScreen
        open={lgShowPropietario}
        onClose={handleClosePropietario}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClosePropietario}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <FormRegistrarPropietario
            setDatosPropietario={setDatosPropietario}
            datosPropietarios={datosPropietarios}
            setLgShowPropietario={setLgShowPropietario}
          />
        </List>
      </Dialog>
      <Dialog
        fullScreen
        open={lgShowRepresentante}
        onClose={handleCloseRepresentante}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseRepresentante}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <FormAdministrador />
        </List>
      </Dialog>
    </section>
  );
};

export default ResponsabilidadIndex;
