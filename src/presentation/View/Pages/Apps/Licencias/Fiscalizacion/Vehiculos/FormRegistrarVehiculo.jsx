import React from "react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { InputText } from "primereact/inputtext";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import {
  AutorizacionDT,
  ConductorDT,
} from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import FormRegistrarConductor from "./FormRegistrarConductor";
import { FormRegistrarPropietario } from "./FormRegistrarPropietario";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const FormRegistrarVehiculo = ({ datoEmpresa, setOpenMAutorizacion }) => {
  const { idEmpresa } = datoEmpresa || {};

  console.log("-dato empresa");
  console.log(datoEmpresa);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [lgShowPropietario, setLgShowPropietario] = useState(false);
  const [propietario, setpropietario] = useState("");
  const [placa, setPlaca] = useState("");
  const [datosPlaca, setDatosPlaca] = useState({
    cClase: "",
    cColor: "",
    cMarca: "",
    cMotor: "",
    cPlaca: "",
    cSerie: "",
    nAnio: "",
    nAsiento: "",
    nPeso: "",
    cModelo: "",
  });
  const handleClickOpen = () => {
    setLgShow(true);
  };
  const closePropietario = () => {
    setLgShowPropietario(false);
  };

  const handleClose = () => {
    setLgShow(false);
  };

  console.log("DATOS OBTENIDOS");
  console.log(datosPlaca);
  const [datosPropietarios, setDatosPropietario] = useState("");

  const [conductor, setConductor] = useState("");
  const [datosConductor, setDatosConductor] = useState("");
  console.log("VERIFICAR CONDCUTOR HIJO");
  console.log(datosConductor);
  const validarFormulario = Yup.object().shape({});

  //-------------------------------------
  //OBTENER PLACA METODO
  //-------------------------------------
  const ponerDatosPlaca = (e) => {
    setPlaca(e.target.value);
  };
  const atraparValorPlaca = async () => {
    const urlPlaca = placa;
    if (placa.length >= 6) {
      try {
        const data = await new ConductorDT(urlPlaca, "GET").GetSunarpGet();
        if (data.data.cPlaca) {
          setDatosPlaca(data.data);
        } else {
          console.log(data.data);
          setDatosPlaca({
            cClase: undefined,
            cColor: undefined,
            cMarca: undefined,
            cMotor: undefined,
            cPlaca: undefined,
            cSerie: undefined,
            nAnio: undefined,
            nAsiento: undefined,
            nPeso: undefined,
            cModelo: undefined,
          });
          Alertas("warning", "No se encontró los datos de la PLACA");
        }
        console.log("DATOS PLACA");
        console.log(data);
      } catch (error) {}
    } else {
      Alertas("warning", "Ingrese una Placa Válida");
    }
  };

  const ponerDatoPropietario = (e) => {
    console.log(e);
    setpropietario(e.target.value);
  };
  const atraparValorPropietario = async (e) => {
    const Access = ApiContextRequest("30");
    const ruta = Access.cPath + "?nTipo=2&cBusqueda=" + propietario;
    if (propietario.length === 8) {
      try {
        const data = await new ConductorDT(
          ruta,
          Access.cMethod
        ).GetPropietarioId();
        if (data.data.idPropietario) {
          Alertas("success", "Datos del propietario encontrado");
          console.log(data.data);
          setDatosPropietario(data.data);
        } else {
          try {
            console.log("BUSCAR RENIEC");
            const data = await new AutorizacionDT(propietario).GetReniec();
            console.log("DATOS RENIEC");
            console.log(data);
            if (data.cDocumento) {
              Alertas("warning", "Registrar un nuevo Representante");
              setDatosPropietario(data);
              setLgShowPropietario(true);
            } else {
              Alertas("warning", "Registrar un nuevo Representante");
              try {
                const dataReniec = await new AutorizacionDT(
                  propietario
                ).GetReniecUs();
                console.log("dataReniec------------------");
                console.log(dataReniec.data);
                //dataReniec.data.cDni ?setRepresentateReniec(dataReniec.data):setRepresentateReniec()
                setDatosPropietario(dataReniec.data);
                setLgShowPropietario(true);
              } catch (error) {
                Alertas("error", "hubo un error en consultar al servidor");
              }
            }
          } catch (error) {
            Alertas("error", "hubo un error en consultar a la RENIEC");
          }
        }
      } catch (error) {
        Alertas("error", "hubo un error en obtener el propietario");
      }
    } else {
      Alertas("warning", "Ingrese un Documento valido");
    }
  };
  const ponerDatoConductor = (e) => {
    setConductor(e.target.value);
  };
  const atraparValorConductor = async () => {
    const Access = ApiContextRequest("27");
    const ruta = Access.cPath + "?nTipo=2&cBusqueda=" + conductor;
    if (conductor.length === 8) {
      try {
        const data = await new ConductorDT(
          ruta,
          Access.cMethod
        ).GetConductorId();
        console.log("BUSCANDO AL CONDUCTOR");
        console.log(data);
        if (data.data.idConductor) {
          Alertas("success", "Datos del conductor encontrado");
          console.log(data.data);
          setDatosConductor(data.data);
        } else {
          try {
            console.log("BUSCAR RENIEC");
            const data = await new AutorizacionDT(conductor).GetReniec();
            console.log("DATOS RENIEC");
            console.log(data);
            if (data.cDocumento) {
              Alertas("warning", "Registrar un nuevo Representante");
              setDatosConductor(data);
              setLgShow(true);
            } else {
              Alertas("warning", "Registrar un nuevo Representante");
              try {
                const dataReniec = await new AutorizacionDT(
                  conductor
                ).GetReniecUs();
                console.log("dataReniec------------------");
                console.log(dataReniec.data);
                //dataReniec.data.cDni ?setRepresentateReniec(dataReniec.data):setRepresentateReniec()
                setDatosConductor(dataReniec.data);
                setLgShow(true);
              } catch (error) {
                Alertas("error", "hubo un error en consultar al servidor");
              }
            }
          } catch (error) {
            Alertas("error", "hubo un error en consultar a la RENIEC");
          }
        }
      } catch (error) {
        Alertas("error", "hubo un error en obtener el propietario");
      }
    } else {
      Alertas("warning", "Ingrese un Documento valido");
    }
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={{
            idClasificacionAutorizacion: "",
            cCodigo: datosPlaca.cCodigo ?? "",
            cMarca: datosPlaca.cMarca ?? "",
            cModelo: datosPlaca.cModelo ?? "",
            cPlacaAnterior: datosPlaca.cPlacaAnterior ?? "",
            cPlacaActual: datosPlaca.cPlacaActual ?? "",
            nNumeroMotor: datosPlaca.nNumeroMotor ?? "",
            cColor: datosPlaca.cColor ?? "",
            nAsientos: datosPlaca.nAsientos ?? "",
            nAnioFabricacion: datosPlaca.nAnioFabricacion ?? "",
            nPeso: "",
            cClase: "",
          }}
          validationSchema={validarFormulario}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            const Access = ApiContextRequest("21");
            console.log("ENVIAR VEHICULO REGISTRAR");
            console.log(datosConductor.idConductor);
            console.log(datosPropietarios.idPropietario);
            console.log(idEmpresa);
            console.log(values);
            console.log("DATOS PLACA");
            console.log(datosPlaca);
            if (
              datosConductor.idConductor !== undefined &&
              datosPropietarios.idPropietario !== undefined
            ) {
              try {
                const httpResponse = await new ConductorDT(
                  Access.cPath,
                  Access.cMethod
                ).SetVehiculo({
                  idEmpresa: idEmpresa ?? "",
                  idPropietario: datosPropietarios.idPropietario ?? "",
                  idConductor: datosConductor.idConductor ?? "",
                  idClasificacionAutorizacion:
                    values.idClasificacionAutorizacion,
                  cCodigo: datosPlaca.cSerie ?? values.cCodigo,
                  cColor: datosPlaca.cColor ?? values.cColor,
                  cMarca: datosPlaca.cMarca ?? values.cMarca,
                  cModelo: datosPlaca.cModelo ?? values.cModelo,
                  cPlacaAnterior:
                    datosPlaca.cPlacaAnterior ?? values.cPlacaAnterior,
                  cPlacaActual: datosPlaca.cPlaca ?? values.cPlacaActual,
                  nNumeroMotor: datosPlaca.cMotor ?? values.nNumeroMotor,
                  nAsientos: datosPlaca.nAsiento ?? values.nAsientos,
                  nAnioFabricacion: datosPlaca.nAnio ?? values.nAnioFabricacion,
                  nPeso: datosPlaca.nPeso ?? values.nPeso,
                  cClase: datosPlaca.cClase ?? values.cClase,
                  idModalidaIngreso: "1"
                });
                console.log(httpResponse);
                if (httpResponse.header.errors.length > 0) {
                  console.log(httpResponse.header.errors[0].message);
                  const alertas = httpResponse.header.errors;
                  alertas.map((e) => Alertas("warning", e.message));
                  //Alertas("warning", data.body.errors[0].message);
                } else {
                  actions.resetForm();
                  Alertas("success", "REGISTRADO CORRECTAMENTE");
                  setOpenMAutorizacion(false);
                }
              } catch (error) {
                Alertas("error", "Error en Registrar");
              }
            } else {
              console.log("DESDE VALIDAR ERROR USUARIO");
              Alertas("warning", "Registre el Propietario Y/O Conductor");
            }
          }}
        >
          {({
            alues,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label htmlFor="cDocumento">Buscar Propietario (DNI)</label>
                    <div className="p-inputgroup">
                      <InputText
                        placeholder="BUSCAR PROPIETARIO"
                        onChange={(e) => ponerDatoPropietario(e)}
                      />
                      <Button
                        type="button"
                        icon="fa fa-search"
                        className="p-button p-component p-button-success p-button-icon-only"
                        onClick={(e) => atraparValorPropietario(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="" htmlFor="cNombres">
                      Nombre del Propietario
                    </label>
                    <Field
                      placeholder="DATOS DEL PROPIETARIO"
                      type="text"
                      id="cNombres"
                      className="p-inputtext p-component p-filled w-full"
                      name="propietario"
                      value={datosPropietarios.cNombreCompleto ?? ""}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label htmlFor="cDocumento">Buscar Conductor</label>
                    <div className="p-inputgroup">
                      <InputText
                        placeholder="BUSCAR CONDUCTOR"
                        onChange={(e) => ponerDatoConductor(e)}
                      />
                      <Button
                        type="button"
                        icon="fa fa-search"
                        className="p-button p-component p-button-success p-button-icon-only"
                        onClick={(e) => atraparValorConductor(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="" htmlFor="cNombres">
                      Nombre del conductor
                    </label>
                    <Field
                      placeholder="NOMBRE DEL CONDUCTOR"
                      type="text"
                      id="cNombresConductor"
                      className="p-inputtext p-component p-filled w-full"
                      name="propietario"
                      value={datosConductor.cNombreCompleto ?? ""}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label htmlFor="cDocumento">
                      Buscar Placa (INGRESE PLACA)
                    </label>
                    <div className="p-inputgroup">
                      <InputText
                        placeholder="BUSCAR PROPIETARIO"
                        onChange={(e) => ponerDatosPlaca(e)}
                      />
                      <Button
                        type="button"
                        icon="fa fa-search"
                        className="p-button p-component p-button-success p-button-icon-only"
                        onClick={(e) => atraparValorPlaca(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cModelo">
                      Modelo
                    </label>
                    {datosPlaca.cModelo ? (
                      <Field
                        disabled
                        readonly
                        value={datosPlaca.cModelo ?? ""}
                        placeholder="Ingrese el modelo del carro"
                        type="text"
                        name="cModelo"
                        id="cModelo"
                        className=" p-inputtext p-component p-filled w-full border-green-500 border"
                      />
                    ) : (
                      <Field
                        required
                        placeholder="Ingrese el modelo del carro"
                        type="text"
                        name="cModelo"
                        id="cModelo"
                        className=" p-inputtext p-component p-filled w-full border-green-500 border"
                      />
                    )}
                    {errors.cModelo && touched.cModelo && errors.cModelo ? (
                      <AlertaError mensaje={errors.cModelo} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="password">
                      Marca
                    </label>
                    {datosPlaca.cMarca ? (
                      <Field
                        disabled
                        value={datosPlaca.cMarca ?? ""}
                        placeholder="Ingrese la marca del carro"
                        type="text"
                        name="cMarca"
                        id="cMarca"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        required
                        readonly
                        placeholder="Ingrese la marca del carro"
                        type="text"
                        name="cMarca"
                        id="cMarca"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cMarca && touched.cMarca && errors.cMarca ? (
                      <AlertaError mensaje={errors.cMarca} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cCodigo">
                      Codigo (Serie)
                    </label>
                    {datosPlaca.cSerie ? (
                      <Field
                        disabled
                        value={datosPlaca.cSerie ?? ""}
                        placeholder="Ingrese el codigo del vehiculo"
                        type="text"
                        name="cCodigo"
                        id="cCodigo"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese CODIGO DEL VEHICULO"
                        type="text"
                        name="cCodigo"
                        id="cCodigo"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cCodigo && touched.cCodigo && errors.cCodigo ? (
                      <AlertaError mensaje={errors.cCodigo} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cPlacaActual">
                      Placa Actual
                    </label>
                    {datosPlaca.cPlaca ? (
                      <Field
                        disabled
                        value={datosPlaca.cPlaca ?? ""}
                        placeholder="Ingrese la placa actual del vehiculo"
                        type="text"
                        name="cPlacaActual"
                        id="cPlacaActual"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        required
                        placeholder="Ingrese la placa actual del vehiculo"
                        type="text"
                        name="cPlacaActual"
                        id="cPlacaActual"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cPlacaActual &&
                    touched.cPlacaActual &&
                    errors.cPlacaActual ? (
                      <AlertaError mensaje={errors.cPlacaActual} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cPlacaAnterior">
                      Placa Anterior
                    </label>
                    {datosPlaca.cPlacaAnt ? (
                      <Field
                        disabled
                        value={datosPlaca.cPlacaAnt}
                        placeholder="Ingrese la placa anterior del carro"
                        type="text"
                        name="cPlacaAnterior"
                        id="cPlacaAnterior"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese la placa anterior del carro"
                        type="text"
                        name="cPlacaAnterior"
                        id="cPlacaAnterior"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cPlacaAnterior &&
                    touched.cPlacaAnterior &&
                    errors.cPlacaAnterior ? (
                      <AlertaError mensaje={errors.cPlacaAnterior} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="password">
                      Seleccione una Modalidad de Servicio
                    </label>
                    <Field
                      as="select"
                      className="p-inputtext p-component p-filled w-full"
                      name="idClasificacionAutorizacion"
                      id="exampleFormControlSelect1"
                      required
                    >
                      <option selected value="" className="font-bold">
                        Seleccione una Autorizacion
                      </option>
                      <option value="1">HABILITACIÓN</option>
                      <option value="1">SUSTITUCIÓN</option>
                      <option value="1">INCREMENTO</option>
                    </Field>
                    {errors.idClasificacionAutorizacion &&
                    touched.idClasificacionAutorizacion &&
                    errors.idClasificacionAutorizacion ? (
                      <AlertaError
                        mensaje={errors.idClasificacionAutorizacion}
                      />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="nNumeroMotor">
                      N° Motor
                    </label>
                    {datosPlaca.cMotor ? (
                      <Field
                        disabled
                        value={datosPlaca.cMotor ?? ""}
                        placeholder="Ingrese el chasis del vehiculo"
                        type="text"
                        name="nNumeroMotor"
                        id="nNumeroMotor"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese el chasis del vehiculo"
                        type="text"
                        name="nNumeroMotor"
                        id="nNumeroMotor"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.nNumeroMotor &&
                    touched.nNumeroMotor &&
                    errors.nNumeroMotor ? (
                      <AlertaError mensaje={errors.nNumeroMotor} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cColor">
                      Color
                    </label>
                    {datosPlaca.cColor ? (
                      <Field
                        disabled
                        value={datosPlaca.cColor}
                        placeholder="Ingrese el color del Vehiculo"
                        type="text"
                        name="cColor"
                        id="cColor"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese el color del Vehiculo"
                        type="text"
                        name="cColor"
                        id="cColor"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cColor && touched.cColor && errors.cColor ? (
                      <AlertaError mensaje={errors.cColor} />
                    ) : null}
                  </div>
                  <div className="form-group col-6 col-sm-3">
                    <label className="mb-1 mt-1" htmlFor="nAsientos">
                      N° Asientos
                    </label>
                    {datosPlaca.nAsiento ? (
                      <Field
                        disabled
                        value={datosPlaca.nAsiento ?? ""}
                        placeholder="Ingrese la placa anterior del carro"
                        type="text"
                        name="nAsientos"
                        id="nAsientos"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese la placa anterior del carro"
                        type="number"
                        name="nAsientos"
                        id="nAsientos"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.nAsientos &&
                    touched.nAsientos &&
                    errors.nAsientos ? (
                      <AlertaError mensaje={errors.nAsientos} />
                    ) : null}
                  </div>
                  <div className="form-group col-sm-3 col-6">
                    <label className="mb-1 mt-1" htmlFor="nAnioFabricacion">
                      Año Fabricacion
                    </label>
                    {datosPlaca.nAnio ? (
                      <Field
                        disabled
                        value={datosPlaca.nAnio ?? ""}
                        placeholder="Ingrese Año de Fabricacion del carro"
                        type="text"
                        name="nAnioFabricacion"
                        id="nAnioFabricacion"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese Año de Fabricacion del carro"
                        type="text"
                        name="nAnioFabricacion"
                        id="nAnioFabricacion"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}

                    {errors.nAnioFabricacion &&
                    touched.nAnioFabricacion &&
                    errors.nAnioFabricacion ? (
                      <AlertaError mensaje={errors.nAnioFabricacion} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="nPeso">
                      Peso
                    </label>
                    {datosPlaca.nPeso ? (
                      <Field
                        disabled
                        value={datosPlaca.nPeso ?? ""}
                        placeholder="Ingrese el peso del vehiculo"
                        type="text"
                        name="nPeso"
                        id="nPeso"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese el peso del vehiculo"
                        type="number"
                        name="nPeso"
                        id="nPeso"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.nPeso && touched.nPeso && errors.nPeso ? (
                      <AlertaError mensaje={errors.nPeso} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cClase">
                      Clase
                    </label>
                    {datosPlaca.cClase ? (
                      <Field
                        disabled
                        value={datosPlaca.cClase ?? ""}
                        placeholder="Ingrese la clase del Vehiculo"
                        type="text"
                        name="cClase"
                        id="cClase"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese la clase del Vehiculo"
                        type="text"
                        name="cClase"
                        id="cClase"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cClase && touched.cClase && errors.cClase ? (
                      <AlertaError mensaje={errors.cClase} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  REGISTRAR VEHÍCULO
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {/* MODALES DEL REGISTRO DE CONDUCTOR Y PROPIETARIO */}
      <Dialog fullScreen open={lgShow} onClose={handleClose}>
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
            conductor={conductor}
            datosConductor={datosConductor}
            setDatosConductor={setDatosConductor}
            setLgShow={setLgShow}
          />
        </List>
      </Dialog>

      <Dialog fullScreen open={lgShowPropietario} onClose={closePropietario}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closePropietario}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <FormRegistrarPropietario
            propietario={propietario}
            setDatosPropietario={setDatosPropietario}
            datosPropietarios={datosPropietarios}
            setLgShowPropietario={setLgShowPropietario}
            // conductor={conductor}
            // datosConductor={datosConductor}
            // setDatosConductor={setDatosConductor}
            // setLgShow={setLgShow}
          />
        </List>
      </Dialog>
    </div>
  );
};

export default FormRegistrarVehiculo;
