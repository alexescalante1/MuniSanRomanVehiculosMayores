import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InspeccionDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import DataTableInspeccion from "./DataTableInspeccion";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { Dropdown } from "primereact/dropdown";
import PrintMasivos from "./PrintMasivos";

const InspeccionIndes = () => {
  const [valorEmpresa, setValorEmpresa] = useState("");
  const [datoEmpresa, setDatoEmpresa] = useState();
  const [seleccionarAnio, setSeleccionarAnio] = useState(null);
  const [year, setYear] = useState([]);
  const [actualizar, setActualizar] = useState(0);

  const ActualizarCard = () => {
    setActualizar(actualizar + 1);
    console.log(actualizar);
  };

  const changeYear = async (e) => {
    e.preventDefault();
    console.log("DESDE ACTUALIZANDO ANDO");
    console.log(e);
    setSeleccionarAnio(e);
    console.log(actualizar);
    const anio = e.value.cDescripcion;
    const Url =
      "/api/licencias/inspeccion?nTipo=2&cBusqueda=" +
      valorEmpresa +
      "&nAnio=" +
      anio;
    const Method = "GET";
    if (valorEmpresa.length >= 8) {
      try {
        const httpResponse = await new InspeccionDT(
          Url,
          Method
        ).GetAllInspeccion();
        console.log(httpResponse);
        if (httpResponse.header.errors.length > 0) {
          const alertas = httpResponse.header.errors;
          alertas.map((e) => Alertas("warning", e.message));
          //Alertas("warning", data.body.errors[0].message);
        } else {
          setDatoEmpresa(httpResponse?.data);
          Alertas("success", "Datos encontrados del RUC de la empresa");
        }
      } catch (error) {
        Alertas("error", "Error con la obtención de datos");
      }
    } else {
      Alertas("warning", "Escriba un RUC VALIDO");
    }
  };

  useEffect(() => {
    changeYear(seleccionarAnio);
    console.log("DESDE EL USE EFFECT INDEX");
  }, [actualizar]);
  //**************************** *****/
  //IMPRIMIR INSPECCION MASIVOS METODO
  //****************************** */

  //**************************** *****/
  //BUSCAR EMPRESA POR RUC -- INSPECCION
  //****************************** */
  const atraparValor = async () => {
    console.log(valorEmpresa);
    const Access = ApiContextRequest("36");
    const Url = Access.cPath + "?nTipo=2&cBusqueda=" + valorEmpresa;
    console.log(Url);
    const Method = "GET";
    if (valorEmpresa.length >= 8) {
      try {
        const httpResponse = await new InspeccionDT(
          Url,
          Method
        ).GetInspeccionYear();
        console.log(httpResponse);
        if (httpResponse.header.errors.length > 0) {
          const alertas = httpResponse.header.errors;
          alertas.map((e) => Alertas("warning", e.message));
          setYear();
          //Alertas("warning", data.body.errors[0].message);
        } else {
          setYear(httpResponse.data);
          Alertas("success", "Datos encontrados del RUC de la empresa");
        }
      } catch (error) {
        Alertas("error", "Error con la obtención de datos");
      }
    } else {
      Alertas("warning", "Escriba un RUC VALID");
    }

    // console.log(valorEmpresa);
    // //const Access = ApiContextRequest("28");
  };
  const ponerDato = async (e) => {
    setValorEmpresa(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Buscar Empresa (Inspección)</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="card-refresh"
                      data-source="widgets.html"
                      data-source-selector="#card-refresh-content"
                      data-load-on-init="false"
                      onClick={ActualizarCard}
                    >
                      <i className="fas fa-sync-alt" />
                    </button>
                  </div>
                </div>
                <div className="grid p-fluid  justify-items-center mb-4">
                  <div className="col-12 md:col-4 w-3/5 text-center">
                    <div className="p-inputgroup mt-4 ">
                      <InputText
                        type="number"
                        placeholder="Buscar Empresa (INGRESE RUC)"
                        onChange={(e) => ponerDato(e)}
                      />
                      <Button
                        icon="pi pi-search"
                        className="p-button p-component p-button-warning p-button-icon-only"
                        onClick={(e) => atraparValor(e)}
                      />
                    </div>
                  </div>
                  <Dropdown
                    className="mt-2 text-left"
                    value={seleccionarAnio?.value}
                    options={year}
                    onChange={changeYear}
                    optionLabel="cDescripcion"
                    placeholder="Seleccione un Año"
                  />
                  {datoEmpresa && (
                    <>
                      <DataTableInspeccion
                        ActualizarCard={ActualizarCard}
                        datoEmpresa={datoEmpresa}
                        actualizar={actualizar}
                      />
                      <PrintMasivos valorEmpresa={valorEmpresa} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InspeccionIndes;
