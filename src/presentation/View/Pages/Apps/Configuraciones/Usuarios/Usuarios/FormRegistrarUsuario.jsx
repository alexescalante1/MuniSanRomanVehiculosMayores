import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { Field, Formik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import Select from "react-select";
import { useState } from "react";
import { Alertas } from "../../../../../../Components";
import { UsuariosDT } from "../../../../../../../Data/UseCases/Apps";

const options = [
  { value: "1", label: "Inicio" },
  { value: "2", label: "Configuraciones" },
  { value: "3", label: "Licencias" },
];
const FormRegistrarUsuario = (UsuarioEditar,setUsuarioActualizar) => {
  const { dato } = UsuarioEditar;
  const lsApp = dato.lstIdApp;
  const refApps = useRef();
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    refApps.current = selectedOption;
  });
  const optionsD = [];
  const getLsIdApp = () => {
    if (lsApp !== undefined) {
      return lsApp.map((e) => {
        switch (e) {
          case "1":
            optionsD.push({ value: "1", label: "Inicio" });
            break;

          case "2":
            optionsD.push({ value: "2", label: "Configuraciones" });
            break;

          case "3":
            optionsD.push({ value: "3", label: "Licencias" });
            break;

          default:
            break;
        }
      });
    } else {
      console.log("NO tiene datos");
    }
  };
  getLsIdApp();
  console.log(optionsD);

  //CONVERTIR UNA LISTA A STRING
  function ConvertString(selectedOption) {
    let lista = "";
    if (selectedOption.length > 0) {
      lista = selectedOption.map((e) => lista + e.value);
    }
    lista = lista.toString();
    console.log(lista);
    return lista;
  }

  const validarUsuario = Yup.object().shape({
    cDocumento: Yup.string()
      .required("El Dni es requerido")
      .min(8, "Documento Invalido"),
    cNombres: Yup.string().required("El nombre es requerido"),
    cApellidos: Yup.string().required("El Apellido es requerido"),
    cDireccion: Yup.string().required("La Direccion es requerido"),
    cCelular: Yup.string().required("El Numero es requerido"),
    nGenero: Yup.string()
      .required("Seleccione un Genero")
      .min(1, "Seleccione un Genero"),
    idRol: Yup.string()
      .required("Seleccione un Rol")
      .min(1, "Seleccione un Rol"),
    cUser: Yup.string()
      .required("El usuario es requerido")
      .min(4, "Requiere minimo de 5 letras")
      .email("Escriba un correo valido"),
    cPassword: Yup.string()
      .required("La contraseña es requerida")
      .min(8, "Requiere una contraseña minima de 8 letras"),
  });
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          enableReinitialize={false}
          initialValues={{
            cDocumento: dato.cDocumento ?? "",
            cNombres: dato.cNombres ?? "",
            cApellidos: dato.cApellidos ?? "",
            cDireccion: dato.cDireccion ?? "",
            cCelular: dato.cCelular ?? "",
            cEmail: dato.cEmail ?? "",
            nGenero: dato.nGenero ?? "",
            idRol: dato.idRole ?? "",
            cUser: dato.cEmail ?? "",
            cPassword: dato.cPassword ?? "",
          }}
          validationSchema={() => validarUsuario}
          onSubmit={async (values, actions) => {
            if (dato.idUsuario) {
              console.log("DESDE ACTUALIZAR");
            } else {
              console.log("Registro Usuario Datos");
              console.log(values);
              ConvertString(selectedOption);
              const Access = ApiContextRequest("12");
              console.log(Access);
              try {
                const data = await new UsuariosDT(
                  Access.cPath,
                  Access.cMethod
                ).RegisterUsuario({
                  cDocumento: values.cDocumento,
                  cNombres: values.cNombres,
                  cApellidos: values.cApellidos,
                  cDireccion: values.cDireccion,
                  cCelular: values.cCelular,
                  cEmail: values.cEmail,
                  nGenero: values.nGenero,
                  idRol: values.idRol,
                  idCompany: "1",
                  cUser: values.cUser,
                  cPassword: values.cPassword,
                  lstIdApp: ConvertString(selectedOption),
                });
                console.log(data);
                if (data.body.errors.length > 0) {
                  console.log(data.body.errors[0].message);
                  const alertas = data.body.errors;
                  alertas.map((e) => Alertas("warning", e.message));
                  //Alertas("warning", data.body.errors[0].message);
                } else {
                  setUsuarioActualizar(data);
                  actions.resetForm();
                  Alertas("success", "REGISTRADO CORRECTAMENTE");
                }
              } catch (error) {
                console.log(error);
                Alertas("error", "Error");
              }
            }
            // actions.resetForm()
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
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
                    />
                    {errors.cDocumento &&
                    touched.cDocumento &&
                    errors.cDocumento ? (
                      <AlertaError mensaje={errors.cDocumento} />
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label className="mb-2" htmlFor="cNombres">
                      Nombre
                    </label>
                    <Field
                      placeholder="Ingrese un Nombre"
                      type="text"
                      id="cNombres"
                      name="cNombres"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cNombres && touched.cNombres && errors.cNombres ? (
                      <AlertaError mensaje={errors.cNombres} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 -mb-1">
                    <label htmlFor="cApellidos">Apellidos</label>
                    <Field
                      placeholder="Ingrese Apellidos"
                      type="text"
                      name="cApellidos"
                      id="cApellidos"
                      className="p-inputtext p-component p-filled w-full"
                    />
                  </div>
                  {errors.cApellidos &&
                  touched.cApellidos &&
                  errors.cApellidos ? (
                    <AlertaError mensaje={errors.cApellidos} />
                  ) : null}
                </div>
                <div className="row">
                  <div className="form-grupo col-12">
                    <label className="mb-2 mt-2" htmlFor="password">
                      Direccion
                    </label>
                    <Field
                      placeholder="Ingrese el domicilio"
                      type="text"
                      name="cDireccion"
                      id="cDireccion"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cDireccion &&
                    touched.cDireccion &&
                    errors.cDireccion ? (
                      <AlertaError mensaje={errors.cDireccion} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grupo col-6">
                    <label className="mb-2 mt-2" htmlFor="password">
                      Correo Electronico
                    </label>
                    <Field
                      placeholder="Ingrese el Email"
                      type="text"
                      name="cEmail"
                      id="cEmail"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cEmail && touched.cEmail && errors.cEmail ? (
                      <AlertaError mensaje={errors.cDireccion} />
                    ) : null}
                  </div>
                  <div className="form-grupo col-6">
                    <label className="mb-2 mt-2" htmlFor="password">
                      N° Celular
                    </label>
                    <Field
                      placeholder="Ingrese el Numero de celular"
                      type="number"
                      name="cCelular"
                      id="cCelular"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cCelular && touched.cCelular && errors.cCelular ? (
                      <AlertaError mensaje={errors.cDireccion} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6 ">
                    <label
                      for="exampleFormControlSelect1"
                      className="mb-2 mt-2"
                    >
                      Seleccione Genero
                    </label>
                    <Field
                      defaultValue={dato.nGenero}
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
                  <div className="form-grupo col-6">
                    <label
                      for="exampleFormControlSelect1"
                      className="mb-2 mt-2"
                    >
                      Seleccione Rol
                    </label>
                    <Field
                      defaultValue={dato.idRole}
                      as="select"
                      className="p-inputtext p-component p-filled w-full"
                      name="idRol"
                      id="exampleFormControlSelect1"
                    >
                      <option selected value="" className="font-bold">
                        Seleccione un Rol
                      </option>
                      <option value="1">SuperUsuario</option>
                      <option value="2">Administrador</option>
                      <option value="3">Asistente</option>
                      <option value="4">Ninguno</option>
                    </Field>
                    {errors.idRol && touched.idRol && errors.idRol ? (
                      <AlertaError mensaje={errors.idRol} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-grupo col-6">
                    <label className="mb-2 mt-2" htmlFor="password">
                      Usuario
                    </label>
                    <Field
                      placeholder="Ingrese el Email"
                      type="text"
                      name="cUser"
                      id="cUser"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cUser && touched.cUser && errors.cUser ? (
                      <AlertaError mensaje={errors.cUser} />
                    ) : null}
                  </div>
                  <div className="form-grupo col-6">
                    <label className="mb-2 mt-2" htmlFor="password">
                      Contraseña
                    </label>
                    <Field
                      placeholder="Ingrese el Numero de celular"
                      type="password"
                      name="cPassword"
                      id="cPassword"
                      className="p-inputtext p-component p-filled w-full"
                    />
                    {errors.cPassword &&
                    touched.cPassword &&
                    errors.cPassword ? (
                      <AlertaError mensaje={errors.cPassword} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <label className="mb-2 mt-2" htmlFor="password">
                      Aplicaciones
                    </label>
                    <Select
                      ref={refApps}
                      options={options}
                      defaultValue={optionsD}
                      isMulti
                      name="lstIdApp"
                      id="lstIdApp"
                      onChange={setSelectedOption}
                      required
                    />
                    {errors.lstIdApp && touched.lstIdApp && errors.lstIdApp ? (
                      <AlertaError mensaje={errors.lstIdApp} />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  Registrar Usuario
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormRegistrarUsuario;
