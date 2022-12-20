import React, { useState } from "react";
import { Field, Formik } from "formik";
import AlertaError from "../../../../../../Components/GenComponents/Alertas/AlertaError";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { ConductorDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import { SelectButton } from "primereact/selectbutton";
const FrmEditarVehiculo = ({ vehiculoData, setModalVehiculo }) => {
  const [EstadoVehiculo, setEstadoVehiculo] = useState("EN SERVICIO");
  console.log("DESDE FRM TRAER VEHICULO");
  console.log(vehiculoData);
  const options = ["EN SERVICIO", "DAR DE BAJA"];
  return (
    <div className="row">
      <div className="col-md-12">
        <Formik
          initialValues={{
            idClasificacionAutorizacion:
              vehiculoData.idClasificacionAutorizacion,
            cCodigo: vehiculoData.cCodigo,
            cMarca: vehiculoData.cMarca,
            cModelo: vehiculoData.cModelo,
            cPlacaAnterior: vehiculoData.cPlacaAnterior,
            cPlacaActual: vehiculoData.cPlacaActual,
            nNumeroMotor: vehiculoData.nNumeroMotor,
            cColor: vehiculoData.cColor,
            nAsientos: vehiculoData.nAsientos,
            nAnioFabricacion: vehiculoData.nAnioFabricacion,
            nPeso: vehiculoData.nPeso,
            cClase: vehiculoData.cClase,
          }}
          //validationSchema={SignupSchema}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            //--------------------
            //VERIFICAR BAJA
            //--------------------
            let estado = true;
            EstadoVehiculo === "EN SERVICIO"
              ? (estado = true)
              : (estado = false);
            console.log(vehiculoData.idEmpresa);
            console.log(vehiculoData.idConductor);
            console.log(vehiculoData.idPropietario);
            console.log(vehiculoData.idPropietario);
            console.log(values);
            const Access = ApiContextRequest("22");
            try {
              const httpResponse = await new ConductorDT(
                Access.cPath,
                Access.cMethod
              ).UpdateVehiculo({
                idVehiculo: vehiculoData.idVehiculo,
                idEmpresa: vehiculoData.idEmpresa,
                idConductor: vehiculoData.idConductor,
                idPropietario: vehiculoData.idPropietario,
                idClasificacionAutorizacion: values.idClasificacionAutorizacion,
                cCodigo: values.cCodigo,
                cMarca: values.cMarca,
                cModelo: values.cModelo,
                cPlacaAnterior: values.cPlacaAnterior,
                cPlacaActual: values.cPlacaActual,
                nNumeroMotor: values.nNumeroMotor,
                cColor: values.cColor,
                nAsientos: values.nAsientos,
                nAnioFabricacion: values.nAnioFabricacion,
                nPeso: values.nPeso,
                cClase: values.cClase,
                lEstado: estado,
              });
              console.log("DESDE ACTUALIZAR CONDUCTOR");
              console.log(httpResponse);
              if (httpResponse.header.errors.length > 0) {
                const alertas = httpResponse.header.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                Alertas("success", "ACTUALIZADO CORRECTAMENTE");
                setModalVehiculo(false);
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
                    <label htmlFor="cPlacaActual">Placa Actual</label>
                    <Field
                      placeholder="Ingrese la placa actual del vehiculo"
                      type="text"
                      name="cPlacaActual"
                      id="cPlacaActual"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cPlacaActual &&
                    touched.cPlacaActual &&
                    errors.cPlacaActual ? (
                      <AlertaError mensaje={errors.cPlacaActual} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-6">
                    <label className="" htmlFor="cPlacaAnterior">
                      Placa Anterior
                    </label>
                    <Field
                      placeholder="Ingrese la placa anterior del carro"
                      type="text"
                      name="cPlacaAnterior"
                      id="cPlacaAnterior"
                      className=" p-inputtext p-component p-filled w-full"
                    />
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
                      Seleccione una Modalidad de Ingreso
                    </label>
                    <Field
                      as="select"
                      className="p-inputtext p-component p-filled w-full"
                      name="idClasificacionAutorizacion"
                      id="exampleFormControlSelect1"
                      required
                    >
                      <option selected value="" className="font-bold">
                        Seleccione una Modalidad de Ingreso
                      </option>
                      <option value="1">HABILITACIÓN</option>
                      <option value="1">SUSTITUCIÓN</option>
                      <option value="1">INCREMENTO</option>

                      {/* <option value="1">
                        SEDAN, COUP?, HATCHBACK, CONVERTIBLE, STATION WAGON,
                        ARENERO
                      </option>
                      <option value="2">MICROBUS, COMBI</option>
                      <option value="3">
                        OMNIBUS URBANO, OMNIBUS INTERURBANO, OMNIBUS PANOR?MICO,
                        ARTICULADO
                      </option>
                      <option value="4">PICK UP, CHASIS CABINADO</option>
                      <option value="5">FURGÓN, CHASIS CABINADO</option>
                      <option value="6">
                        REMOLCADOR, REMOLCADOR GRUA, CARGOBUS
                      </option>
                      <option value="7">PLATAFORMA</option>
                      <option value="8">BARANDA</option>
                      <option value="9">FURGÓN GRANDE</option>
                      <option value="10">FURGÓN VOLQUETE</option>
                      <option value="11">
                        BICIMOTO - Vehículos de dos ruedas, de hasta 50 cm3 y
                        velocidad máxima de 50 km/h.
                      </option>
                      <option value="12">
                        RIMOTO PASAJEROS - Vehículos de tres ruedas, de hasta 50
                        cm3 y velocidad máxima de 50 km/h
                      </option>
                      <option value="13">
                        MOTOCICLETA - Vehículos de dos ruedas, de mas de 50 cm3
                        o velocidad mayor a 50 km/h.
                      </option>
                      <option value="14">
                        MOTO SIDECAR - Vehículos de tres ruedas asimétricas al
                        eje longitudinal del vehículo, de mas de
                      </option>
                      <option value="15">
                        TRIMOTO PASAJEROS - Vehículos de tres ruedas simétricas
                        al eje longitudinal del vehículo, de ma
                      </option>
                      <option value="16">
                        Vehículos con cuatro (4) ruedas (cuatriciclos ligeros),
                        con una velocidad m?xi
                      </option>
                      <option value="17">
                        vehículos con cuatro (4) ruedas (cuatriciclos no
                        clasificados en L6), con peso neto de
                      </option> */}
                    </Field>
                    {errors.idClasificacionAutorizacion &&
                    touched.idClasificacionAutorizacion &&
                    errors.idClasificacionAutorizacion ? (
                      <AlertaError
                        mensaje={errors.idClasificacionAutorizacion}
                      />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-3">
                    <label className="mb-1 mt-1" htmlFor="">
                      Año de Fabricación
                    </label>
                    <Field
                      placeholder="Ingrese Año de Fabricacion del carro"
                      type="number"
                      name="nAnioFabricacion"
                      id="nAnioFabricacion"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cModelo && touched.cModelo && errors.cModelo ? (
                      <AlertaError mensaje={errors.cModelo} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-3">
                    <label className="mb-1 mt-1" htmlFor="">
                      Marca
                    </label>
                    <Field
                      required
                      readonly
                      placeholder="Ingrese la marca del carro"
                      type="text"
                      name="cMarca"
                      id="cMarca"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cMarca && touched.cMarca && errors.cMarca ? (
                      <AlertaError mensaje={errors.cMarca} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 col-sm-6">
                    <label className="mb-1 mt-1" htmlFor="password">
                      Modelo
                    </label>
                    <Field
                      required
                      placeholder="Ingrese el modelo del carro"
                      type="text"
                      name="cModelo"
                      id="cModelo"
                      className=" p-inputtext p-component p-filled w-full border-green-500 border"
                    />

                    {errors.cModelo && touched.cModelo && errors.cModelo ? (
                      <AlertaError mensaje={errors.cModelo} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-3">
                    <label className="mb-1 mt-1" htmlFor="nAsientos">
                      N° Asientos
                    </label>
                    <Field
                      placeholder="Ingrese la placa anterior del carro"
                      type="number"
                      name="nAsientos"
                      id="nAsientos"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.nAsientos &&
                    touched.nAsientos &&
                    errors.nAsientos ? (
                      <AlertaError mensaje={errors.nAsientos} />
                    ) : null}
                  </div>
                  <div className="form-group col-12 col-sm-3">
                    <label className="mb-1 mt-1" htmlFor="nPeso">
                      Peso
                    </label>
                    <Field
                      placeholder="KG"
                      type="number"
                      name="nPeso"
                      id="nPeso"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.nPeso && touched.nPeso && errors.nPeso ? (
                      <AlertaError mensaje={errors.nPeso} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-4 col-12">
                    <label htmlFor="cColor">Color</label>
                    <Field
                      placeholder="Ingrese el color del Vehiculo"
                      type="text"
                      name="cColor"
                      id="cColor"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cColor && touched.cColor && errors.cColor ? (
                      <AlertaError mensaje={errors.cColor} />
                    ) : null}
                  </div>
                  <div className="form-group col-sm-4 col-12">
                    <label htmlFor="dFinActividad">Número de Motor</label>
                    <Field
                      placeholder="Ingrese el chasis del vehiculo"
                      type="text"
                      name="nNumeroMotor"
                      id="nNumeroMotor"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.nNumeroMotor &&
                    touched.nNumeroMotor &&
                    errors.nNumeroMotor ? (
                      <AlertaError mensaje={errors.nNumeroMotor} />
                    ) : null}
                  </div>
                  <div className="form-group col-sm-4 col-12">
                    <label htmlFor="cColor">Código</label>
                    <Field
                      placeholder="Ingrese el codigo del vehiculo"
                      type="text"
                      name="cCodigo"
                      id="cCodigo"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cColor && touched.cColor && errors.cColor ? (
                      <AlertaError mensaje={errors.cColor} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6 col-12">
                    <label htmlFor="dFinActividad">Clase</label>
                    <Field
                      placeholder="Ingrese la clase del Vehiculo"
                      type="text"
                      name="cClase"
                      id="cClase"
                      className=" p-inputtext p-component p-filled w-full"
                    />
                    {errors.cClase && touched.cClase && errors.cClase ? (
                      <AlertaError mensaje={errors.cClase} />
                    ) : null}{" "}
                  </div>
                  <div className="form-group col-sm-6 col-12">
                    <label htmlFor="dFinActividad">Habilitar Empresa</label>
                    <SelectButton
                      value={EstadoVehiculo}
                      options={options}
                      onChange={(e) => setEstadoVehiculo(e.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  ACTUALIZAR VEHÍCULO
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FrmEditarVehiculo;
