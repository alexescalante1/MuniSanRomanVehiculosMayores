import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { Alertas } from "../../../../../../Components";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { ConductorDT } from "../../../../../../../Data/UseCases/Apps";

export const FormRegistrarPropietario = ({
  propietario,
  setDatosPropietario,
  datosPropietarios,
  setLgShowPropietario,
}) => {
  console.log("DESDE propietario");
  console.log(propietario);
  console.log(datosPropietarios);
  const SignupSchema = Yup.object().shape({
    cDocumento: Yup.string()
      .required("El Dni es requerido")
      .min(8, "Documento Invalido"),
    cNombres: Yup.string().required("El nombre es requerido"),
    cApellidoPaterno: Yup.string().required("El Apellido es requerido"),
    cApellidoMaterno: Yup.string().required("El Apellido es requerido"),
  });
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={{
            cDocumento: propietario ?? "",
            cNombres: datosPropietarios.cNombres ?? "",
            cApellidoPaterno: datosPropietarios.cApellidoPaterno ?? "",
            cApellidoMaterno: datosPropietarios.cApellidoMaterno ?? "",
            cCelular: datosPropietarios.cTelefono ?? "",
          }}
          validationSchema={SignupSchema}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            console.log(values);
            const Access = ApiContextRequest("31");
            try {
              const httpResponse = await new ConductorDT(
                Access.cPath,
                Access.cMethod
              ).SetPropietario({
                cDocumento: values.cDocumento,
                cNombres: values.cNombres,
                cApellidoPaterno: values.cApellidoPaterno,
                cApellidoMaterno: values.cApellidoMaterno,
                cCelular: values.cCelular,
              });
              console.log("DESDE FRM REGISTRAR PROPIETARIO");
              console.log(httpResponse);
              if (httpResponse.header.errors.length > 0) {
                const alertas = httpResponse.header.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                setDatosPropietario(httpResponse.data);
                console.log("REGISTRADO CORRECTAMENTE CONDUCTOR");
                actions.resetForm();
                setLgShowPropietario(false);
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
                  <div className="form-group col-6">
                    <label htmlFor="cDocumento">Documento de Identidad</label>
                    <Field
                      placeholder="Ingrese el cDocumento"
                      type="number"
                      name="cDocumento"
                      id="cDocumento"
                      className="p-inputtext p-component p-filled w-full"
                      value={propietario ?? ""}
                    />
                    {errors.cDocumento &&
                    touched.cDocumento &&
                    errors.cDocumento ? (
                      <AlertaError mensaje={errors.cDocumento} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label className="" htmlFor="password">
                      Nombre
                    </label>
                    {datosPropietarios.cNombre ? (
                      <Field
                        value={datosPropietarios.cNombre ?? ""}
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
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cApellidoPaterno">
                      Apellido Paterno
                    </label>
                    {datosPropietarios.cApellidoPaterno ? (
                      <Field
                        value={datosPropietarios.cApellidoPaterno ?? ""}
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
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="">
                      Apellido Materno
                    </label>
                    {datosPropietarios.cApellidoMaterno ? (
                      <Field
                        value={datosPropietarios.cApellidoMaterno ?? ""}
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
                  <div className="form-group col-12">
                    <label className="mb-1 mt-1" htmlFor="cCelular">
                      Celular
                    </label>
                    {datosPropietarios.cTelefono ? (
                      <Field
                        value={datosPropietarios.cTelefono ?? ""}
                        placeholder="Ingrese su Numero de Celular"
                        type="number"
                        id="cCelular"
                        name="cCelular"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    ) : (
                      <Field
                        placeholder="Ingrese su Numero de Celular"
                        type="number"
                        id="cCelular"
                        name="cCelular"
                        className=" p-inputtext p-component p-filled w-full"
                      />
                    )}
                    {errors.cCelular && touched.cCelular && errors.cCelular ? (
                      <AlertaError mensaje={errors.cCelular} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  REGISTRAR PROPIETARIO
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
