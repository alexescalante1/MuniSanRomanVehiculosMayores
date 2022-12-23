import React from "react";
import * as Yup from "yup";
import { Field, Formik, validateYupSchema } from "formik";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { InputText } from "primereact/inputtext";
import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "primereact/button";
import Dialog from "@mui/material/Dialog";
import { RepresentateContext } from "../../../../../../Components";

import FormAdministrador from "./FormAdministrador";

const ModalRegistrarAutorizacion = (ActualizarCard) => {
  const [representante, setRepresentante] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [capturarRuc, setCapturarRuc] = useState("");
  const [representanteReniec, setRepresentateReniec] = useState("");
  const [rucReniec, setRucReniec] = useState("");
  const [open, setOpen] = React.useState(false);
  const [datosGerente, setDatosGerente] = useState("");
  console.log("GERENTE SETEAR");
  console.log(empresa);
  console.log(datosGerente);
  let datosGerenteInput = "";
  if (datosGerente) {
    datosGerenteInput =
      datosGerente.cNombres +
      " " +
      datosGerente.cApellidoPaterno +
      "" +
      datosGerente.cApellidoMaterno +
      " (" +
      datosGerente.cDocumento +
      ")";
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dato = {};
  //console.log(dato.cRucEmpresa);
  const ponerDatosRepresentate = (e) => {
    setRepresentante(e.target.value);
  };
  const ponerDatosEmpresa = (e) => {
    setCapturarRuc(e.target.value);
  };
  //OBTENER DATOS DE LA BD?SETEAR:REGISTRAR-SETEAR
  const enviarDatosRepresentate = async () => {
    if (representante.length === 8) {
      const Access = ApiContextRequest("33");
      const ruta = Access.cPath + "?nTipo=2&cBusqueda=" + representante;
      //console.log(ruta);
      try {
        const data = await new AutorizacionDT(
          ruta,
          Access.cMethod
        ).GetGerente();
        if (data.data.idRepresentante) {
          Alertas("success", "Datos del representante encontrado");
          setDatosGerente(data.data);
        } else {
          //------------------------------
          //  METODO PARA BUSCAR RENIEC
          //------------------------------
          try {
            console.log("BUSCAR RENIEC");
            const data = await new AutorizacionDT(representante).GetReniec();
            console.log("DATOS RENIEC");
            console.log(data.data);
            if (data.header.code === 200) {
              if (data.data.cDocumento) {
                Alertas("warning", "Registrar un nuevo Representante");
                console.log("FRM REGISTRAR REPRESENTANTE");
                console.log(data);
                setRepresentateReniec(data);
                setOpen(true);
              } else {
                Alertas("warning", "Registrar un nuevo Representante");
                try {
                  const dataReniec = await new AutorizacionDT(
                    representante
                  ).GetReniecUs();
                  console.log("dataReniec------------------");
                  console.log(dataReniec.data);
                  //dataReniec.data.cDni ?setRepresentateReniec(dataReniec.data):setRepresentateReniec()
                  setRepresentateReniec(dataReniec.data);
                  setOpen(true);
                } catch (error) {
                  Alertas("error", "hubo un error en consultar al servidor");
                }
              }
            } else {
              setRepresentateReniec({
                cDocumento: undefined,
                cNombres: undefined,
                cApellidoPaterno: undefined,
                cApellidoMaterno: undefined,
              });
              setOpen(true);
              Alertas("warning", "Registrar un nuevo Representante");
            }
          } catch (error) {
            Alertas("error", "hubo un error en consultar a la RENIEC");
          }
        }
      } catch (error) {
        Alertas("error", "hubo un error en obtener datos del representante");
      }
    } else {
      Alertas("warning", "Ingrese un Documento valido");
    }
  };

  //-------------------
  //-  CONSULTAR SUNAT
  //-------------------
  const enviarDatosEmpresa = async () => {
    if (capturarRuc.length !== 11) {
      Alertas("warning", "Escriba un RUC válido");
    } else {
      const data = await new AutorizacionDT(capturarRuc).GetSunat();
      console.log(data.data.ruc);
      if (data.data.ruc) {
        Alertas("success", "Se encontraron Datos del RUC");
        setEmpresa(data.data);
      } else {
        setEmpresa(data.data);
        Alertas(
          "warning",
          "No se encontraron Datos del RUC (INGRESE MANUALMENTE)"
        );
      }
    }
  };
  //const {estadoModal} = lgShow;
  const errorValidator = Yup.object().shape({
    cResolucion: Yup.string().required("El elemento es requerido"),
    idServicio: Yup.string()
      .required("la Modalidad es requerida")
      .min(1, "Seleccione la modalidad de servicio"),
    idClaseResolucion: Yup.string()
      .required("la Modalidad es requerida")
      .min(1, "Seleccione la modalidad de servicio"),
    //cRazonSocial: Yup.string().required("La razon social es requerido"),
    cHorario: Yup.string().required("El horario es requerido"),
    //cNombreComercial: Yup.string().required("El nombre comercial es requerido"),
    cDireccion: Yup.string().required("La dirección fiscal es requerida"),
    nFlota: Yup.string().required("El N° nVehiculos es requerido"),
    dInicioVigecia: Yup.date().required("Fecha de Inicio es requerido"),
    dFinalVigencia: Yup.date().required("La fecha de vencimiento es requerido"),
    cRecorridoIda: Yup.string().required("El Paradero de Inicio es requerido"),
    cRecorridoRetorno: Yup.string().required(
      "El paradero Retorno es requerido"
    ),
  });
  return (
    <RepresentateContext.Provider value={representanteReniec}>
      <div className="row p-2">
        <div className="col-md-12">
          <Formik
            enableReinitialize={true}
            initialValues={{
              cRazonSocial: empresa.razonSocial ?? "",
              cNombreComercial: empresa.nombreComercial ?? "",
              cDireccion: empresa.direccion ?? "",
              cRucEmpresa: "",//dato.cRucEmpresa ?? "",
              //idGerente/
              cResolucion: "",//dato.cResolucion ?? "",
              cPlacas: "",//dato.cPlacas ?? "",
              idServicio: "",//dato.idServicio ?? "",
              cHorario: "",//dato.cHorario ?? "",
              dInicioVigecia: "",//dato.dInicioVigecia ?? "",
              dFinalVigencia: "",//dato.dFinalVigencia ?? "",
              cRecorridoIda: "",//dato.cRecorridoIda ?? "",
              cRecorridoRetorno: "",//dato.cRecorridoRetorno ?? "",
              nFlota: "",//dato.nFlota ?? "",
            }}
            validationSchema={errorValidator}
            onSubmit={async (values, actions) => {
              console.log(empresa.razonSocial);
              console.log(empresa.direccion ?? values.cDireccion);
              console.log(empresa.nombreComercial ?? values.cNombreComercial);
              console.log(values);

              //ACTUALIAR DATOS
              if (false) {
                console.log("actualizar valores ::");
                console.log(values);
                const Access = ApiContextRequest("18");
                try {
                  const data = await new AutorizacionDT(
                    Access.cPath + "?idAutorizacion=" + dato?.idAutorizacion,
                    Access.cMethod
                  ).SetAutorizacionEditar({
                    idServicio: values.idServicio,
                    cRucEmpresa: values.cRucEmpresa,
                    cPlacas: values.cPlacas,
                    cResolucion: values.cResolucion,
                    cClaseAutorizacion: values.cClaseAutorizacion,
                    nVehiculos: values.nVehiculos,
                    cHorario: values.cHorario,
                    dInicioVigecia: values.dInicioVigecia,
                    dFinalVigencia: values.dFinalVigencia,
                    cRecorridoIda: values.cRecorridoIda,
                    cRecorridoRetorno: values.cRecorridoRetorno,
                    lEstado: true,
                  });
                  console.log("desde actualizar");
                  console.log(data);
                  if (data.header.errors.length > 0) {
                    console.log(data.header.errors[0].message);
                    const alertas = data.header.errors;
                    alertas.map((e) => Alertas("warning", e.message));
                    //Alertas("warning", data.header.errors[0].message);
                  } else {
                    actions.resetForm();
                    //setOpenMAutorizacion(false);
                    Alertas("success", "ACTUALIZADO CORRECTAMENTE");
                  }
                } catch {
                  console.log("ERROR");
                  Alertas(
                    "error",
                    "Hubo un error en Registrar la Autorizacion"
                  );
                }
              } else {
                const Access = ApiContextRequest("16");
                const Path = Access.cPath;
                console.log(Path);
                console.log(datosGerente.idRepresentante);
                try {
                  const data = await new AutorizacionDT(
                    Path,
                    Access.cMethod
                  ).SetAutorizacionRegistrar({
                    cRucEmpresa: capturarRuc,
                    idRepresentante: datosGerente.idRepresentante,
                    cRazonSocial: empresa.razonSocial ?? values.cRazonSocial,
                    cNombreComercial:
                      empresa.nombreComercial ?? values.cNombreComercial,
                    cDireccion: empresa.direccion ?? values.cDireccion,
                    cCelular: values.cCelular,
                    cResolucion: values.cResolucion,
                    idServicio: values.idServicio,
                    idClaseResolucion: values.idClaseResolucion,
                    cHorario: values.cHorario,
                    cPlacas: values.cPlacas,
                    nFlota: values.nFlota,
                    dInicioVigecia: values.dInicioVigecia,
                    dFinalVigencia: values.dFinalVigencia,
                    cRecorridoIda: values.cRecorridoIda,
                    cRecorridoRetorno: values.cRecorridoRetorno,
                  });
                  console.log("desde la registrar data");
                  console.log(data);
                  if (data.header.errors.length > 0) {
                    console.log(data.header.errors[0].message);
                    const alertas = data.header.errors;
                    alertas.map((e) => Alertas("warning", e.message));
                    //Alertas("warning", data.header.errors[0].message);
                  } else {
                    //setOpenMAutorizacion(false);
                    Alertas("success", "REGISTRADO CORRECTAMENTE");
                    //setTable(true);
                    ActualizarCard();
                  }
                } catch {
                  console.log("error");
                  Alertas(
                    "error",
                    "Hubo un error en Registrar la Autorizacion"
                  );
                }
              }
            }}
          >
            {({
              errors,
              values,
              touched,
              handleSubmit,
              handleBlur,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-3">
                  <div className="card-body bg-green-50">
                    <h1 className="font-normal text-lg text-center mb-3 uppercase">
                      Datos de la Empresa de Transporte
                    </h1>
                    <div className="row">
                      <div className="form-group col-sm-12 col-12">
                        <label htmlFor="cRucEmpresa">R.U.C.</label>
                        <div className="p-inputgroup">
                          <InputText
                            placeholder="Ingrese RUC"
                            onChange={(e) => ponerDatosEmpresa(e)}
                          />
                          <Button
                            type="button"
                            icon="pi pi-search"
                            aria-hidden="true"
                            className="p-button p-component p-button-success p-button-icon-only"
                            onClick={(e) => enviarDatosEmpresa(e)}
                          />
                        </div>
                        {/* <Field
                          placeholder="RUC de la empresa"
                          type="number"
                          name="cRucEmpresa"
                          id="cRucEmpresa"
                          className=" p-inputtext p-component p-filled w-full"
                        />
                        {errors.cRucEmpresa &&
                        touched.cRucEmpresa &&
                        errors.cRucEmpresa ? (
                          <AlertaError mensaje={errors.cRucEmpresa} />
                        ) : null} */}
                      </div>
                      <div className="form-group col-sm-12 col-12">
                        <label htmlFor="cDocumento">
                          DNI del representante
                        </label>
                        <div className="p-inputgroup">
                          <InputText
                            placeholder="Ingrese DNI"
                            onChange={(e) => ponerDatosRepresentate(e)}
                          />
                          <Button
                            type="button"
                            icon="pi pi-search"
                            aria-hidden="true"
                            className="p-button p-component p-button-success p-button-icon-only"
                            onClick={(e) => enviarDatosRepresentate(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label className="" htmlFor="Gerente">
                          Nombre del Representante
                        </label>
                        <Field
                          value={datosGerenteInput ?? ""}
                          placeholder="Nombre del Representante"
                          type="text"
                          id="Gerente"
                          name="Gerente"
                          className=" p-inputtext p-component p-filled w-full"
                        />
                      </div>
                      <div className="mb-2 col-12">
                        <label className="" htmlFor="cRazonSocial">
                          Razon Social
                        </label>
                        {empresa.razonSocial ? (
                          <Field
                            value={empresa.razonSocial ?? ""}
                            placeholder="Ingrese la Razon Social"
                            type="text"
                            id="cRazonSocial"
                            name="cRazonSocial"
                            className=" p-inputtext p-component p-filled w-full"
                          />
                        ) : (
                          <Field
                            placeholder="Ingrese la Razon Social"
                            type="text"
                            id="cRazonSocial"
                            name="cRazonSocial"
                            className=" p-inputtext p-component p-filled w-full"
                          />
                        )}
                      </div>
                      {errors.cRazonSocial &&
                      touched.cRazonSocial &&
                      errors.cRazonSocial ? (
                        <AlertaError mensaje={errors.cRazonSocial} />
                      ) : null}
                      <div className="form-group col-12">
                        {empresa.nombreComercial ? (
                          <>
                            <label htmlFor="cNombreComercial">
                              Nombre Comercial
                            </label>
                            <Field
                              value={empresa.nombreComercial ?? ""}
                              placeholder="Ingrese el Nombre Comercial"
                              type="text"
                              name="cNombreComercial"
                              id="cNombreComercial"
                              className=" p-inputtext p-component p-filled w-full"
                            />
                            {errors.cNombreComercial &&
                            touched.cNombreComercial &&
                            errors.cNombreComercial ? (
                              <AlertaError mensaje={errors.cNombreComercial} />
                            ) : null}
                          </>
                        ) : (
                          <>
                            <label htmlFor="cNombreComercial">
                              Nombre Comercial
                            </label>
                            <Field
                              placeholder="Ingrese el Nombre Comercial"
                              type="text"
                              name="cNombreComercial"
                              id="cNombreComercial"
                              className=" p-inputtext p-component p-filled w-full"
                            />
                            {errors.cNombreComercial &&
                            touched.cNombreComercial &&
                            errors.cNombreComercial ? (
                              <AlertaError mensaje={errors.cNombreComercial} />
                            ) : null}
                          </>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <label className="mb-2 mt-2" htmlFor="cDireccion">
                          Dirección Fiscal
                        </label>
                        {empresa.direccion ? (
                          <Field
                            value={empresa.direccion ?? ""}
                            placeholder="Ingrese la Direccion Fiscal"
                            type="text"
                            name="cDireccion"
                            id="cDireccion"
                            className=" p-inputtext p-component p-filled w-full"
                          />
                        ) : (
                          <Field
                            placeholder="Ingrese la Direccion Fiscal"
                            type="text"
                            name="cDireccion"
                            id="cDireccion"
                            className=" p-inputtext p-component p-filled w-full"
                          />
                        )}
                      </div>
                      {errors.cDireccion &&
                      touched.cDireccion &&
                      errors.cDireccion ? (
                        <AlertaError mensaje={errors.cDireccion} />
                      ) : null}
                      <div className="form-group col-12">
                        <label className="mb-2 mt-2" htmlFor="cCelular">
                          Teléfono{" "}
                          <i
                            className="fa fa-exclamation-circle text-red-600"
                            aria-hidden="true"
                          ></i>
                        </label>
                        <Field
                          placeholder="Teléfonos de la empresa"
                          type="text"
                          id="cCelular"
                          name="cCelular"
                          className=" p-inputtext p-component p-filled w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 card-body">
                    <h1 className="font-normal text-lg text-center mb-3 uppercase">
                      Datos de la Autorización
                    </h1>
                    <div className="row">
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="cResolucion">
                          Número de Resolución
                        </label>
                        <Field
                          type="text"
                          name="cResolucion"
                          className="p-inputtext p-component p-filled w-full"
                          id="cResolucion"
                          placeholder="Número de Resolución"
                        />
                        {errors.cResolucion &&
                        touched.cResolucion &&
                        errors.cResolucion ? (
                          <AlertaError mensaje={errors.cResolucion} />
                        ) : null}
                      </div>
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="idClaseResolucion">
                          Clase de Resolución
                        </label>
                        <Field
                          required
                          as="select"
                          type="text"
                          name="idClaseResolucion"
                          className="p-inputtext p-component p-filled w-full"
                          id="idClaseResolucion"
                          placeholder="SELECCIONE UNA CLASE DE RESOLUCIÓN"
                        >
                          <option selected value="">
                            SELECCIONE UNA CLASE DE RESOLUCIÓN
                          </option>
                          <option value="1">Fiscalización</option>
                          <option value="2">Autorización</option>
                          <option value="3">Regulación</option>
                        </Field>
                        {errors.idClaseResolucion &&
                        touched.idClaseResolucion &&
                        errors.idClaseResolucion ? (
                          <AlertaError mensaje={errors.idClaseResolucion} />
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="idServicio">
                          Modalidad de servicio
                        </label>
                        <Field
                          required
                          as="select"
                          type="text"
                          name="idServicio"
                          className="p-inputtext p-component p-filled w-full"
                          id="idServicio"
                          placeholder="SELECCIONE UNA CLASE DE RESOLUCIÓN"
                        >
                          <option selected value="">
                            SELECCIONE UNA MODALIDAD DE SERVICIO
                          </option>
                          <option value="1">
                            Servicio de transporte urbano
                          </option>
                          <option value="2">
                            Servicio de transporte interurbano
                          </option>
                          <option value="3">
                            Servicio de transporte de Taxi
                          </option>
                          <option value="4">
                            Servicio de transporte de carga y mudansa
                          </option>
                          <option value="5">
                            Servicio de transporte turistico
                          </option>
                          <option value="6">
                            Servicio de transporte de trabajadores
                          </option>
                          <option value="7">
                            Servicio de transporte de Construcción
                          </option>
                          <option value="8">
                            Servicio de transporte de estudiantes
                          </option>
                          <option value="9">
                            Servicio de transporte especial
                          </option>
                          <option value="10">
                            Servicio de transporte de auto colectivo
                          </option>
                        </Field>
                        {errors.idServicio &&
                        touched.idServicio &&
                        errors.idServicio ? (
                          <AlertaError mensaje={errors.idServicio} />
                        ) : null}
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="cHorario">Horario</label>
                        <Field
                          type="text"
                          name="cHorario"
                          className="p-inputtext p-component p-filled w-full"
                          id="cHorario"
                          placeholder="Ingrese el Horario"
                        />
                        {errors.cHorario &&
                        touched.cHorario &&
                        errors.cHorario ? (
                          <AlertaError mensaje={errors.cHorario} />
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-8">
                        <label htmlFor="cPlacas">
                          Placas
                          <i
                            className="fa fa-exclamation-circle text-red-600 ml-2"
                            aria-hidden="true"
                          ></i>
                        </label>
                        <Field
                          type="text"
                          name="cPlacas"
                          className="p-inputtext p-component p-filled w-full"
                          id="cPlacas"
                          placeholder="Ingrese las placas"
                        />
                      </div>
                      <div className="form-group col-sm-4 col-12">
                        <label htmlFor="nFlota">Flota</label>
                        <Field
                          type="number"
                          name="nFlota"
                          className="p-inputtext p-component p-filled w-full"
                          id="nFlota"
                          placeholder="Ingrese la cantidad de vehículos"
                        />
                        {errors.nFlota && touched.nFlota && errors.nFlota ? (
                          <AlertaError mensaje={errors.nFlota} />
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="dInicioVigecia">
                          Fecha de Inicio de Vigencia
                        </label>
                        <Field
                          type="date"
                          name="dInicioVigecia"
                          className="p-inputtext p-component p-filled w-full"
                          id="dInicioVigecia"
                          placeholder="Ingrese la Fecha de Vigencia"
                        />
                        {errors.dInicioVigecia &&
                        touched.dInicioVigecia &&
                        errors.dInicioVigecia ? (
                          <AlertaError mensaje={errors.dInicioVigecia} />
                        ) : null}
                      </div>
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="dFinalVigencia">
                          Fecha de Vencimiento
                        </label>
                        <Field
                          type="date"
                          name="dFinalVigencia"
                          className="p-inputtext p-component p-filled w-full"
                          id="dFinalVigencia"
                        />
                        {errors.dFinalVigencia &&
                        touched.dFinalVigencia &&
                        errors.dFinalVigencia ? (
                          <AlertaError mensaje={errors.dFinalVigencia} />
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="cRecorridoIda">Paradero Inicio</label>
                        <Field
                          type="text"
                          name="cRecorridoIda"
                          className="p-inputtext p-component p-filled w-full"
                          id="cRecorridoIda"
                          placeholder="Ingrese el Paradero de Inicio"
                        />
                        {errors.cRecorridoIda &&
                        touched.cRecorridoIda &&
                        errors.cRecorridoIda ? (
                          <AlertaError mensaje={errors.cRecorridoIda} />
                        ) : null}
                      </div>
                      <div className="form-group col-sm-6 col-12">
                        <label htmlFor="cRecorridoRetorno">
                          Paradero Retorno
                        </label>
                        <Field
                          type="textarea"
                          name="cRecorridoRetorno"
                          className="p-inputtext p-component p-filled w-full"
                          id="cRecorridoRetorno"
                          placeholder="Ingrese el paradero de Retorno"
                        />
                        {errors.cRecorridoRetorno &&
                        touched.cRecorridoRetorno &&
                        errors.cRecorridoRetorno ? (
                          <AlertaError mensaje={errors.cRecorridoRetorno} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  className="p-button-info w-full mt-4 justify-center"
                >
                  REGISTRAR AUTORIZACIÓN
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <Dialog fullScreen open={open} onClose={handleClose}>
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
            <FormAdministrador
              representante={representante}
              setDatosGerente={setDatosGerente}
              setOpen={setOpen}
            />
          </List>
        </Dialog>
      </div>
    </RepresentateContext.Provider>
  );
};

export default ModalRegistrarAutorizacion;
