import React from "react";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { Alertas, RepresentateContext } from "../../../../../../Components";
import { useContext } from "react";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";

const FormAdministrador = ({ setDatosGerente, setOpen, representante }) => {
  const representanteReniec = useContext(RepresentateContext);
  console.log("DNI POR DEFECTO");

  console.log(representante);
  const { cDocumento, cNombres, cApellidoPaterno, cApellidoMaterno } =
    representanteReniec;
  console.log("DESDE REGISTRAR REPRESENTANTE RENIEC");
  console.log(representanteReniec);
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={{
            cDocumento: "",
            cNombres: "",
            cApellidoPaterno: "",
            cApellidoMaterno: "",
            cDireccion: "",
            cCelular: "",
            cEmail: "",
            nGenero: "",
            lTipo: true,
          }}
          //validationSchema={SignupSchema}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            const Access = ApiContextRequest("34");
            console.log(values);
            try {
              const httpResponse = await new AutorizacionDT(
                Access.cPath,
                Access.cMethod
              ).setRepresentante({
                cDocumento: cDocumento ?? representante,
                cNombres: cNombres ?? values.cNombres,
                cApellidoPaterno: cApellidoPaterno ?? values.cApellidoPaterno,
                cApellidoMaterno: cApellidoMaterno ?? values.cApellidoMaterno,
                cDireccion: values.cDireccion,
                cCelular: values.cCelular,
                cEmail: values.cEmail,
                nGenero: values.nGenero,
                lTipo: true,
              });
              console.log("DESDE FRM REGISTRAR PROPIETARIO");
              console.log(httpResponse);
              if (httpResponse.header.errors.length > 0) {
                const alertas = httpResponse.header.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                console.log("REGISTRADO CORRECTAMENTE GERENTE");
                console.log(httpResponse);
                setDatosGerente(httpResponse.data);
                setOpen(false);
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
                  <div className="form-group col-6">
                    <label htmlFor="cDocumento">Documento de Identidad</label>
                    <Field
                      value={cDocumento ?? representante}
                      placeholder="Ingrese el cDocumento"
                      type="number"
                      name="cDocumento"
                      id="cDocumento"
                      className="p-inputtext p-component p-filled w-full"
                      //value={propietario??""}
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
                    <Field
                      value={cNombres}
                      placeholder="Ingrese su Nombre"
                      type="text"
                      id="cNombres"
                      name="cNombres"
                      className=" p-inputtext p-component p-filled w-full"
                    />
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
                    <Field
                      value={cApellidoPaterno}
                      placeholder="Ingrese Apellido Paterno"
                      type="text"
                      name="cApellidoPaterno"
                      id="cApellidoPaterno"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cApellidoPaterno &&
                    touched.cApellidoPaterno &&
                    errors.cApellidoPaterno ? (
                      <AlertaError mensaje={errors.cApellidoPaterno} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cApellidoMaterno">
                      Apellido Materno
                    </label>
                    <Field
                      value={cApellidoMaterno}
                      placeholder="Ingrese Apellido Materno"
                      type="text"
                      name="cApellidoMaterno"
                      id="cApellidoMaterno"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cApellidoMaterno &&
                    touched.cApellidoMaterno &&
                    errors.cApellidoMaterno ? (
                      <AlertaError mensaje={errors.cApellidoMaterno} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cDireccion">
                      Direccion
                      <i
                        className="fa fa-exclamation-circle text-red-600 ml-2"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <Field
                      placeholder="Ingrese su Direccion"
                      type="text"
                      id="cDireccion"
                      name="cDireccion"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cDireccion &&
                    touched.cDireccion &&
                    errors.cDireccion ? (
                      <AlertaError mensaje={errors.cDireccion} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cDireccion">
                      Genero
                      <i
                        className="fa fa-exclamation-circle text-red-600 ml-2"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <Field
                      ////defaultValue={dato.nGenero}
                      as="select"
                      className="p-inputtext p-component p-filled w-full bg-red-400"
                      name="nGenero"
                      id="exampleFormControlSelect1"
                    >
                      <option selected value="">
                        Seleccione un Genero
                      </option>
                      <option value="0">Masculino</option>
                      <option value="1">Femenino</option>
                      <option value="2">No especifico</option>
                    </Field>
                    {errors.nGenero && touched.nGenero && errors.nGenero ? (
                      <AlertaError mensaje={errors.nGenero} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cEmail">
                      Email
                      <i
                        className="fa fa-exclamation-circle text-red-600 ml-2"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <Field
                      placeholder="Ingrese Correo Electronico"
                      type="email"
                      id="cEmail"
                      name="cEmail"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cEmail && touched.cEmail && errors.cEmail ? (
                      <AlertaError mensaje={errors.cEmail} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label className="mb-1 mt-1" htmlFor="cCelular">
                      Número de teléfono
                      <i
                        className="fa fa-exclamation-circle text-red-600 ml-2"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <Field
                      placeholder="Ingrese Correo Electronico"
                      type="number"
                      id="cCelular"
                      name="cCelular"
                      className=" p-inputtext p-component p-filled w-full"
                    />
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
                  REGISTRAR REPRESENTATE
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormAdministrador;
