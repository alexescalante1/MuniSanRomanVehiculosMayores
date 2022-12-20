import React, { useState } from "react";
import { Field, Formik } from "formik";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import { InputText } from "primereact/inputtext";
import Button from "@mui/material/Button";

export const ModalContentRegistro = ({ dato,setLgShow }) => {
  const [autorizacion, setAutorizacion] = useState({});
  const [message, setMessage] = useState("");
  console.log("desde el modal Actualizar");
  console.log(autorizacion);
  let autorizacionValue = autorizacion.cResolucion ?? "";
  const validarRegEmpresa = Yup.object().shape({
    cDocumento: Yup.number("Tiene que ingresar numeros")
      .min(11, "Ingrese un cDocumento Valido")
      .required("Este dato es requerido"),
    cRazonSocial: Yup.string().required("La razon social es obligario"),
    cNombreComercial: Yup.string().required("El nombre Comercial es requerido"),
    cDireccion: Yup.string().required("La direccion Fiscal es Requerido"),
    cCelular: Yup.number().required("El Numero de telefono es obligatorio"),
    cEmail: Yup.string()
      .required("El Email es requerido")
      .email("Email Invalido"),
  });
  const ponerDato = async (e) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
  const atraparValor = async () => {
    if (message.length <= 3) {
      Alertas("warning", "Escriba una Resolucion Valida");
    } else {
      const Access = ApiContextRequest("15");
      const urlGetEmpresa = Access.cPath + "?idTipo=2&cBusqueda=" + message;
      console.log(Access);
      try {
        const data = await new EmpresaDT(
          urlGetEmpresa,
          Access.cMethod
        ).GetEmpresAutorizacion();
        if (data.header.errors.length > 0) {
          console.log(data.header.errors[0].message);
          const alertas = data.header.errors;
          alertas.map((e) => Alertas("warning", e.message));
          //Alertas("warning", data.body.errors[0].message);
        } else {
          setAutorizacion(data.data);
          Alertas("success", "Autorización Encontrada");
        }
      } catch (error) {
        Alertas("error", "hubo un error en llamar a la Api");
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          enableReinitialize={true}
          initialValues={{
            cDocumento: dato.cRUC ?? "",
            cRazonSocial: dato.cRazonSocial ?? "",
            cNombreComercial: dato.cNombreComercial ?? "",
            cDireccion: dato.cDireccion ?? "",
            cCelular: dato.cCelular ?? "",
            cEmail: dato.cEmail ?? "",
          }}
          validationSchema={() => validarRegEmpresa}
          onSubmit={async (values, resetForm) => {
            const Access = ApiContextRequest("21");
            try {
              const data = await new EmpresaDT(
                Access.cPath,
                Access.cMethod
              ).SetEmpresaRegistrar({
                cDocumento: values.cDocumento,
                cNombreComercial: values.cNombreComercial,
                cRazonSocial: values.cRazonSocial,
                cDireccion: values.cDireccion,
                cCelular: values.cCelular,
                cEmail: values.cEmail,
                idAutorizacion: autorizacion.idAutorizacion,
              });
              console.log(data)
              if (data.errors.length > 0) {
                console.log(data.errors[0].message);
                const alertas = data.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                setLgShow(false);
                Alertas("success", "Empresa Registrada Correctamente");
              }
            } catch (error) {
              Alertas("error", "Error");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  {!dato.cRUC && (
                    <>
                      <div className="form-group col-12">
                        <div className="p-inputgroup">
                          <InputText
                            placeholder="Buscar Autorización (RESOLUCIÓN)"
                            onChange={(e) => ponerDato(e)}
                          />
                          <Button
                            icon="fa fa-edit"
                            className="p-button p-component p-button-warning p-button-icon-only"
                            onClick={(e) => atraparValor(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="cResolucion">Resolución</label>
                        <Field
                          value={autorizacionValue ?? ""}
                          placeholder="Resolucíon"
                          type="text"
                          name="cResolucion"
                          id="cResolucion"
                          className=" p-inputtext p-component p-filled w-full"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group col-12">
                    <label htmlFor="cDocumento">Documento de Identidad</label>
                    <Field
                      placeholder="Ingrese el cDocumento"
                      type="number"
                      name="cDocumento"
                      id="cDocumento"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cDocumento &&
                    touched.cDocumento &&
                    errors.cDocumento ? (
                      <AlertaError mensaje={errors.cDocumento} />
                    ) : null}
                  </div>
                </div>
                <div>
                  <label className="" htmlFor="password">
                    Razon Social
                  </label>
                  <Field
                    placeholder="Ingrese la Razon Social"
                    type="text"
                    id="cRazonSocial"
                    name="cRazonSocial"
                    className=" p-inputtext p-component p-filled w-full"
                  />
                </div>
                {errors.cRazonSocial &&
                touched.cRazonSocial &&
                errors.cRazonSocial ? (
                  <AlertaError mensaje={errors.cRazonSocial} />
                ) : null}
                <div>
                  <label className="mb-2 mt-2" htmlFor="password">
                    Nombre Comercial
                  </label>
                  <Field
                    placeholder="Ingrese el Nombre Comercial"
                    type="text"
                    name="cNombreComercial"
                    id="cNombreComercial"
                    className=" p-inputtext p-component p-filled w-full"
                  />
                </div>
                {errors.cNombreComercial &&
                touched.cNombreComercial &&
                errors.cNombreComercial ? (
                  <AlertaError mensaje={errors.cNombreComercial} />
                ) : null}
                <div>
                  <label className="mb-2 mt-2" htmlFor="password">
                    Direccion Fiscal
                  </label>
                  <Field
                    placeholder="Ingrese la Direccion Fiscal"
                    type="text"
                    name="cDireccion"
                    id="cDireccion"
                    className=" p-inputtext p-component p-filled w-full"
                  />
                </div>
                {errors.cDireccion &&
                touched.cDireccion &&
                errors.cDireccion ? (
                  <AlertaError mensaje={errors.cDireccion} />
                ) : null}
                <div>
                  <label className="mb-2 mt-2" htmlFor="password">
                    Numero de Celular
                  </label>
                  <Field
                    placeholder="Ingrese los Numeros Celulares"
                    type="text"
                    id="cCelular"
                    name="cCelular"
                    className=" p-inputtext p-component p-filled w-full"
                  />
                </div>
                {errors.cCelular && touched.cCelular && errors.cCelular ? (
                  <AlertaError mensaje={errors.cCelular} />
                ) : null}
                <div>
                  <label className="mb-2 mt-2" htmlFor="password">
                    Email
                  </label>
                  <Field
                    placeholder="Ingrese Correo Electronico"
                    type="cEmail"
                    id="cEmail"
                    name="cEmail"
                    className=" p-inputtext p-component p-filled w-full"
                  />
                </div>
                {errors.cEmail && touched.cEmail && errors.cEmail ? (
                  <AlertaError mensaje={errors.cEmail} />
                ) : null}
              </div>
              <div className="flex">
                <Button type="submit" variant="contained" fullWidth>
                  REGISTRAR EMPRESA
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
