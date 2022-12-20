import React from "react";
import { Field, Formik } from "formik";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { ConductorDT } from "../../../../../../../Data/UseCases/Apps/Licencia/Vehiculos/VehiculosConductorDT";
import { Alertas } from "../../../../../../Components";
const FormRegistrarConductor = ({
  conductor,
  setDatosConductor,
  datosConductor,
  setLgShow,
}) => {
  console.log("desde el form conductor");
  console.log(datosConductor);
  const SignupSchema = Yup.object().shape({
    cDocumento: Yup.string()
      .required("El Dni es requerido")
      .min(8, "Documento Invalido"),
    cNombres: Yup.string().required("El nombre es requerido"),
    cApellidoPaterno: Yup.string().required("El Apellido Paterno es requerido"),
    cApellidoMaterno: Yup.string().required("El Apellido Materno es requerido"),
    idCategoria: Yup.string()
      .required("Seleccione una categoría")
      .min(1, "Seleccione una categoría"),
    cLicencia: Yup.string().required("La Licencia es requerida"),
    dIniActividad: Yup.string().required("La Fecha de inicio es requerida"),
    dFinActividad: Yup.string().required("La Fecha de inicio es requerida"),
  });
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={{
            
            cDocumento: conductor ?? "",
            cNombres: datosConductor.cNombres ?? "",
            cApellidoPaterno: datosConductor.cApellidoPaterno ?? "",
            cApellidoMaterno: datosConductor.cApellidoMaterno ?? "",
            idCategoria: datosConductor.idCategoria ?? "",
            cLicencia: datosConductor.cLicencia ?? "",
            dIniActividad: datosConductor.dIniActividad ?? "",
            dFinActividad: datosConductor.dFinActividad ?? "",
          }}
          validationSchema={SignupSchema}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            const Access = ApiContextRequest("28");
            // console.log("VALUES CONDUCTOR")
            console.log(values);
            setDatosConductor(values);
            try {
              const httpResponse = await new ConductorDT(
                Access.cPath,
                Access.cMethod
              ).SetConductor({
                cDocumento: values.cDocumento,
                cNombres: values.cNombres,
                cApellidoPaterno: values.cApellidoPaterno,
                cApellidoMaterno: values.cApellidoMaterno,
                idCategoria: values.idCategoria,
                cLicencia: values.cLicencia,
                dIniActividad: values.dIniActividad,
                dFinActividad: values.dFinActividad,
              });
              console.log("DESDE FRM REGISTRAR CONDUCTOR");
              console.log(httpResponse);
              if (httpResponse.header.errors.length > 0) {
                const alertas = httpResponse.header.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                setDatosConductor(httpResponse.data);
                console.log("REGISTRADO CORRECTAMENTE CONDUCTOR");
                actions.resetForm();
                setLgShow(false);
                Alertas("success", "REGISTRADO CORRECTAMENTE");
              }
            } catch (error) {
              AlertaError("error", "Error en Registrar");
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
                    <label htmlFor="cDocumento">Documento de Identidad</label>
                    {conductor ? (
                      <Field
                        placeholder="Ingrese el cDocumento"
                        type="number"
                        name="cDocumento"
                        id="cDocumento"
                        className="p-inputtext p-component p-filled w-full"
                        value={conductor ?? ""}
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese el cDocumento"
                        type="number"
                        name="cDocumento"
                        id="cDocumento"
                        className="p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cDocumento &&
                    touched.cDocumento &&
                    errors.cDocumento ? (
                      <AlertaError mensaje={errors.cDocumento} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="" htmlFor="password">
                      Nombre
                    </label>
                    {datosConductor.cNombres ? (
                      <Field
                        value={datosConductor.cNombres ?? ""}
                        placeholder="Ingrese su Nombre"
                        type="text"
                        id="cNombres"
                        name="cNombres"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese su Nombre"
                        type="text"
                        id="cNombres"
                        name="cNombres"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cNombres && touched.cNombres && errors.cNombres ? (
                      <AlertaError mensaje={errors.cNombres} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cApellidoPaterno">
                      Apellido Paterno
                    </label>
                    {datosConductor.cApellidoPaterno ? (
                      <Field
                        value={datosConductor.cApellidoPaterno ?? ""}
                        placeholder="Ingrese su Apellido Paterno"
                        type="text"
                        name="cApellidoPaterno"
                        id="cApellidoPaterno"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese su Apellido Paterno"
                        type="text"
                        name="cApellidoPaterno"
                        id="cApellidoPaterno"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cApellidoPaterno &&
                    touched.cApellidoPaterno &&
                    errors.cApellidoPaterno ? (
                      <AlertaError mensaje={errors.cApellidoPaterno} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="">
                      Apellido Materno
                    </label>
                    {datosConductor.cApellidoMaterno ? (
                      <Field
                        value={datosConductor.cApellidoMaterno ?? ""}
                        placeholder="Ingrese su Apellido Materno"
                        type="text"
                        name="cApellidoMaterno"
                        id="cApellidoMaterno"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese su Apellido Materno"
                        type="text"
                        name="cApellidoMaterno"
                        id="cApellidoMaterno"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cApellidoMaterno &&
                    touched.cApellidoMaterno &&
                    errors.cApellidoMaterno ? (
                      <AlertaError mensaje={errors.cApellidoMaterno} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="password">
                      Seleccione una Categoria (*)
                    </label>
                    <Field
                      as="select"
                      className="p-inputtext p-component p-filled w-full"
                      name="idCategoria"
                      id="exampleFormControlSelect1"
                    >
                      <option selected value="" className="font-bold">
                        Seleccione una Categoria
                      </option>
                      <option value="1">AI</option>
                      <option value="2">AIIa</option>
                      <option value="3">AIIb</option>
                      <option value="4">AIIIa</option>
                      <option value="5">AIIIb</option>
                      <option value="6">AIIIc</option>
                      <option value="7">BI</option>
                      <option value="8">BIIa</option>
                      <option value="9">BIIb</option>
                      <option value="10">BIIc</option>
                    </Field>
                    {errors.idCategoria &&
                    touched.idCategoria &&
                    errors.idCategoria ? (
                      <AlertaError mensaje={errors.idCategoria} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="cLicencia">
                      Ingrese la Licencia
                    </label>
                    <Field
                      placeholder="Ingrese su Ingrese la Licencia"
                      type="text"
                      name="cLicencia"
                      id="cLicencia"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cLicencia &&
                    touched.cLicencia &&
                    errors.cLicencia ? (
                      <AlertaError mensaje={errors.cLicencia} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6 col-12">
                    <label htmlFor="dIniActividad">Fecha de Expedición</label>
                    <Field
                      type="date"
                      name="dIniActividad"
                      className="p-inputtext p-component p-filled w-full"
                      id="dIniActividad"
                      placeholder="Ingrese Fecha de Expedición"
                    />
                    {errors.dIniActividad &&
                    touched.dIniActividad &&
                    errors.dIniActividad ? (
                      <AlertaError mensaje={errors.dIniActividad} />
                    ) : null}
                  </div>
                  <div className="form-group col-sm-6 col-12">
                    <label htmlFor="dFinActividad">Fecha de Revalidación</label>
                    <Field
                      type="date"
                      name="dFinActividad"
                      className="p-inputtext p-component p-filled w-full"
                      id="dFinActividad"
                      placeholder="Ingrese Fecha de Revalidación"
                    />
                    {errors.dFinActividad &&
                    touched.dFinActividad &&
                    errors.dFinActividad ? (
                      <AlertaError mensaje={errors.dFinActividad} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  REGISTRAR CONDUCTOR
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormRegistrarConductor;
