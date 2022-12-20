import React, {useState, useEffect} from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import FormEditarAutorizaciones from "./FormEditarAutorizaciones";
import { Alertas } from "../../../../../../Components";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";

const ViewAutorizaciones = ({ idEmpresa, lRenovacion }) => {

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

    //   Alertas("info", "Obteniendo datos.");
    // const Access = ApiContextRequest("15");
    // console.log(idValor);
    // let url = Access.cPath + "?nTipo=1&cBusqueda=" + idValor + "&lVehiculos=1";
    // try {
    //   const data = await new EmpresaDT(
    //     url,
    //     Access.cMethod
    //   ).GetEmpresaAutorizacionId();
    //   console.log(data);
    //   setEmpresaEditar(data.data);
    //   setAutorizacionVisualizar(true);
    // } catch (error) {
    //   Alertas("error", "Error al traer los datos");
    // }

  return (
    <div>
      {lRenovacion ? (
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 mb-3">
            <div className="col-span-1 card text-center mt-4 w-11/12 m-auto shadow-xl mb-4">
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
                        <span className="text-bold uppercase">
                          Razon Social:
                        </span>{" "}
                        {dataEmpresa?.cRazonSocial}
                      </p>
                      <p className="mb-2">
                        <span className="text-bold uppercase">
                          Representate:
                        </span>{" "}
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
                ACTUALIZAR:{" "}
                <span className="font-bold text-lg">RENOVACION</span>
                <BusinessIcon fontSize="large" className="text-red-800" />
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{
                    cResolucion: dataEmpresa?.nResolucion ?? "",
                    cHorario: dataEmpresa?.cHorario,
                    idClaseResolucion: dataEmpresa?.idClaseResolucion,
                    nFlota: dataEmpresa?.cNumVehiculos ?? "",
                    cRecorridoRetorno: dataEmpresa?.cRecorridoRetorno,
                    cRecorridoIda: dataEmpresa?.cRecorridoIda,
                    dFinalVigencia: dataEmpresa?.dFinalVigencia ?? "",
                    dInicioVigecia: dataEmpresa?.dFechaRegistro ?? "",
                    idServicio: dataEmpresa?.idServicio ?? "",
                    cPlaca: dataEmpresa?.cPlaca ?? "",
                  }}
                  //validationSchema={SignupSchema}
                  enableReinitialize={false}
                  onSubmit={async (values, actions) => {
                    const Access = ApiContextRequest("18");
                    console.log(values);
                    try {
                      const httpResponse = await new AutorizacionDT(
                        Access.cPath,
                        "PUT"
                      ).UpdateRenovacion({
                        idEmpresa: dataEmpresa?.idEmpresa,
                        cResolucion: values.cResolucion,
                        idServicio: values.idServicio,
                        idClaseResolucion: values.idClaseResolucion,
                        cHorario: values.cHorario,
                        cPlacas: values.cPlaca,
                        nFlota: values.nFlota,
                        dInicioVigecia: values.dInicioVigecia,
                        dFinalVigencia: values.dFinalVigencia,
                        cRecorridoIda: values.cRecorridoIda,
                        cRecorridoRetorno: values.cRecorridoRetorno,
                      });
                      console.log("DESDE FRM REGISTRAR PROPIETARIO");
                      console.log(httpResponse);
                      if (httpResponse.header.errors.length > 0) {
                        const alertas = httpResponse.header.errors;
                        alertas.map((e) => Alertas("warning", e.message));
                        //Alertas("warning", data.body.errors[0].message);
                      } else {
                        console.log("ACTUALIZADO CORRECTAMENTE GERENTE");
                        console.log(httpResponse);
                        // setDatosGerente(httpResponse.data)
                        //setOpen(false);
                        actions.resetForm();
                        //setLgShow(false)
                        Alertas("success", "REGISTRADO CORRECTAMENTE");
                      }
                    } catch (error) {
                      Alertas("error", "Error en Registrar");
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
                            {errors.nFlota &&
                            touched.nFlota &&
                            errors.nFlota ? (
                              <AlertaError mensaje={errors.nFlota} />
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
                            <label htmlFor="cRecorridoIda">
                              Paradero Inicio
                            </label>
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
                      <div className="p-3">
                        <button
                          type="submit"
                          className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                        >
                          ACTUALIZAR RENOVACIÓN
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="card-footer text-muted">
                Informacion proporcionado por LICENCIAS-APP
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <FormEditarAutorizaciones />
        </>
      )}
    </div>
  );
};

export default ViewAutorizaciones;
