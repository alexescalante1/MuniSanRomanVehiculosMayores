import React, { useState } from "react";
import { Button } from "primereact/button";
import { Alertas } from "../../../../../../Components";
import { TUCImprimir } from "./TUCImprimir";
import { Dialog } from "primereact/dialog";
import { Field, Formik } from "formik";
import { InspeccionDT } from "../../../../../../../Data/UseCases/Apps";

const PrintMasivos = ({ valorEmpresa }) => {
  const [modalInspeccionAll, setModalInspeccionAll] = useState(false);
  const [dataInspeccion, setDataInspeccion] = useState([]);
  const [lgShowPrint, setLgShowPrint] = useState(false);
  console.log(valorEmpresa);
  const ocultarModal = () => {
    setModalInspeccionAll(false);
  };
  const imprimirInspeccionMasivos = async () => {
    setModalInspeccionAll(true);
    console.log("Hola mundo");
  };
  return (
    <section className="content">
      <Dialog
        header="IMPRIMIR INSPECCIÓN"
        visible={modalInspeccionAll}
        style={{ width: "80vw" }}
        //footer={renderFooter("displayBasic")}
        onHide={() => ocultarModal()}
        breakpoints={{ "960px": "75vw", "500px": "100vw" }}
      >
        <Formik
          initialValues={{
            cLugarInspeccion: "",
          }}
          //validationSchema={SignupSchema}
          enableReinitialize={false}
          onSubmit={async (values, actions) => {
            console.log(values);
            const Access = "/api/licencias/inspeccion/certificado/get-all";

            try {
              const httpResponse = await new InspeccionDT(
                Access,
                "POST"
              ).PrintAllCertificado({
                nTipo: "2",
                cBusqueda: valorEmpresa,
                cLugarInspeccion: values.cLugarInspeccion,
              });
              console.log("DESDE FRM IMPRIMIR CERTIFICADO");
              console.log(httpResponse);
              if (httpResponse.header.errors.length > 0) {
                const alertas = httpResponse.header.errors;
                alertas.map((e) => Alertas("warning", e.message));
                //Alertas("warning", data.body.errors[0].message);
              } else {
                actions.resetForm();
                //setLgShow(false)
                setModalInspeccionAll(false);
                setDataInspeccion(httpResponse.data);
                setLgShowPrint(true);
                Alertas("success", "REGISTRADO CORRECTAMENTE");
              }
            } catch (error) {
              Alertas("error", "Error en Registrar");
            }
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-12">
                    <label htmlFor="cLugarInspeccion">
                      Lugar de Inspeccion
                    </label>
                    <Field
                      placeholder="Ingrese el cLugarInspeccion"
                      type="text"
                      name="cLugarInspeccion"
                      id="cLugarInspeccion"
                      className="p-inputtext p-component p-filled w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button
                  type="submit"
                  className="btn btn-info rounded-3xltext-bold bg-green-500 w-full"
                >
                  REGISTRAR LUGAR DE INSPECCIÓN
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
      <div className="card flex justify-start">
        <Button
          label="Imprimir Certificados"
          aria-label="Submit"
          onClick={imprimirInspeccionMasivos}
        />
        <Button
          label="Imprimir TUC"
          aria-label="Submit"
          className="p-button-raised p-button-warning mt-2"
        />{" "}
      </div>
      <TUCImprimir
        setLgShowPrint={setLgShowPrint}
        dataInspeccion={dataInspeccion}
        lgShowPrint={lgShowPrint}
      />
    </section>
  );
};

export default PrintMasivos;
