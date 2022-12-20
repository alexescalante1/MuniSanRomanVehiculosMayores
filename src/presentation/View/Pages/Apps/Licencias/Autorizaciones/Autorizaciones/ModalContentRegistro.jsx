import { Field, Formik, validateYupSchema } from "formik";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import Button from "@mui/material/Button";

export const ModalContentRegistro = (actualizar) => {
  const { dato, lgShow,setLgShow } = actualizar;
  console.log(dato.cRucEmpresa);
  //const {estadoModal} = lgShow;
  const errorValidator = Yup.object().shape({
    cResolucion: Yup.string().required("El elemento es requerido"),
    idServicio: Yup.string()
      .required("la Modalidad es requerida")
      .min(1, "Seleccione la modalidad de servicio"),
    cRucEmpresa: Yup.number().required("El N° Resolucion es requerido"),
    cHorario: Yup.string().required("El horario es requerido"),
    nVehiculos: Yup.number().required("El N° nVehiculos es requerido"),
    dInicioVigecia: Yup.date().required("Fecha de Inicio es requerido"),
    dFinalVigencia: Yup.date().required("La fecha de vencimiento es requerido"),
    cRecorridoIda: Yup.string().required("El Paradero de Inicio es requerido"),
    cRecorridoRetorno: Yup.string().required(
      "El paradero Retorno es requerido"
    ),
    cPlacas: Yup.string().required("Las placas son necesarias"),
    cClaseAutorizacion: Yup.string().required(
      "La Clase de Resolucion es requerida"
    ),
  });
  //console.log(estadoModal)
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          enableReinitialize={true}
          initialValues={{
            cRucEmpresa: dato.cRucEmpresa ?? "",
            cResolucion: dato.cResolucion ?? "",
            cPlacas: dato.cPlacas ?? "",
            cClaseAutorizacion: dato.cClaseAutorizacion ?? "",
            idServicio: dato.idServicio ?? "",
            cHorario: dato.cHorario ?? "",
            nVehiculos: dato.nVehiculos ?? "",
            dInicioVigecia: dato.dInicioVigecia ?? "",
            dFinalVigencia: dato.dFinalVigencia ?? "",
            cRecorridoIda: dato.cRecorridoIda ?? "",
            cRecorridoRetorno: dato.cRecorridoRetorno ?? "",
          }}
          validationSchema={errorValidator}
          onSubmit={async (values, actions) => {
            if (dato.idAutorizacion) {
              console.log("actualizar valores ::");
              console.log(values);
              const Access = ApiContextRequest("18");
              try {
                const data = await new AutorizacionDT(
                  Access.cPath + "?idAutorizacion=" + dato.idAutorizacion,
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
                  setLgShow(false)
                  Alertas("success", "ACTUALIZADO CORRECTAMENTE");
                }
              } catch {
                console.log("ERROR");
                Alertas("error", "Hubo un error en Registrar la Autorizacion");
              }
            } else {
              const Access = ApiContextRequest("16");
              console.log(values);
              try {
                const data = await new AutorizacionDT(
                  Access.cPath,
                  Access.cMethod
                ).SetAutorizacionRegistrar({
                  IdEmpresa: "1",
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
                });
                console.log("desde la registrar data");
                console.log(data.header);
                if (data.header.errors.length > 0) {
                  console.log(data.header.errors[0].message);
                  const alertas = data.header.errors;
                  alertas.map((e) => Alertas("warning", e.message));
                  //Alertas("warning", data.header.errors[0].message);
                } else {
                  actions.resetForm();
                  setLgShow(false)
                  Alertas("success", "REGISTRADO CORRECTAMENTE");
                }
              } catch {
                console.log("error");
                Alertas("error", "Hubo un error en Registrar la Autorizacion");
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
            <form id="quickForm" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="cRucEmpresa">Ruc Empresa</label>
                    <Field
                      type="number"
                      name="cRucEmpresa"
                      className="p-inputtext p-component p-filled w-full"
                      id="cRucEmpresa"
                      placeholder="Ingrese Ruc de la Empresa"
                    />
                    {errors.cRucEmpresa &&
                    touched.cRucEmpresa &&
                    errors.cRucEmpresa ? (
                      <AlertaError mensaje={errors.cRucEmpresa} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="cResolucion">Resolucion</label>
                    <Field
                      type="text"
                      name="cResolucion"
                      className="p-inputtext p-component p-filled w-full"
                      id="cResolucion"
                      placeholder="Ingrese la Resolucion"
                    />
                    {errors.cResolucion &&
                    touched.cResolucion &&
                    errors.cResolucion ? (
                      <AlertaError mensaje={errors.cResolucion} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <label htmlFor="cClaseAutorizacion">
                      Clase Autorizacion
                    </label>
                    <Field
                      type="text"
                      name="cClaseAutorizacion"
                      className="p-inputtext p-component p-filled w-full"
                      id="cClaseAutorizacion"
                      placeholder="Ingrese la Clase de Resolucion"
                    />

                    {errors.cClaseAutorizacion &&
                    touched.cClaseAutorizacion &&
                    errors.cClaseAutorizacion ? (
                      <AlertaError mensaje={errors.cClaseAutorizacion} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="idServicio">Autoriazcion Servicio</label>
                    <Field
                      as="select"
                      type="text"
                      name="idServicio"
                      className="p-inputtext p-component p-filled w-full"
                      id="idServicio"
                      placeholder="Ingrese la Modalidad de Servicio"
                    >
                      <option selected value="">
                        Seleccione Una Modalidad de Servicio
                      </option>
                      <option value="1">Servicio de transporte urbano</option>
                      <option value="2">
                        Servicio de transporte interurbano
                      </option>
                      <option value="3">Servicio de transporte de Taxi</option>
                      <option value="4">
                        Servicio de transporte de carga y mudansa
                      </option>
                      <option value="5">
                        Servicio de transporte turistico
                      </option>
                      <option value="6">
                        Servicio de transporte de Construcci?n
                      </option>
                      <option value="7">Servicio de transporte de Taxi</option>
                      <option value="8">
                        Servicio de transporte de estudiantes
                      </option>
                      <option value="9">Servicio de transporte especial</option>
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
                    {errors.cHorario && touched.cHorario && errors.cHorario ? (
                      <AlertaError mensaje={errors.cHorario} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-8">
                    <label htmlFor="cPlacas">Placas</label>
                    <Field
                      type="text"
                      name="cPlacas"
                      className="p-inputtext p-component p-filled w-full"
                      id="cPlacas"
                      placeholder="Ingrese las Placas de los carros"
                    />
                    {errors.cPlacas && touched.cPlacas && errors.cPlacas ? (
                      <AlertaError mensaje={errors.cPlacas} />
                    ) : null}
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="nVehiculos">Flota</label>
                    <Field
                      type="number"
                      name="nVehiculos"
                      className="p-inputtext p-component p-filled w-full"
                      id="nVehiculos"
                      placeholder="Ingrese la cantidad de nVehiculos"
                    />
                    {errors.nVehiculos &&
                    touched.nVehiculos &&
                    errors.nVehiculos ? (
                      <AlertaError mensaje={errors.nVehiculos} />
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-6">
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
                  <div className="form-group col-6">
                    <label htmlFor="dFinalVigencia">Fecha de Vencimiento</label>
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
                  <div className="form-group col-6">
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
                  <div className="form-group col-6">
                    <label htmlFor="cRecorridoRetorno">Paradero Retorno</label>
                    <Field
                      type="text"
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

              <Button type="submit" variant="contained" fullWidth>
                REGISTRAR AUTORIZACIÓN
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
