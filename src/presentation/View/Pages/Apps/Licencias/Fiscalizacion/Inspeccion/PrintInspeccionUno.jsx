import React, { useState } from "react";
import { Field, Formik } from "formik";
import { Dialog } from "primereact/dialog";
import { TUCImprimir } from "./TUCImprimir";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { InspeccionDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";

const PrintInspeccionUno = ({
  setModalInspeccion,
  modalInspeccion,
  idCertificado,
}) => {
  const [dataInspeccion, setDataInspeccion] = useState([]);
  const [lgShowPrint, setLgShowPrint] = useState(false);

  return (
    <div>
      <Dialog
        header="IMPRIMIR INSPECCIÓN"
        visible={modalInspeccion}
        style={{ width: "80vw" }}
        //footer={renderFooter("displayBasic")}
        onHide={() => setModalInspeccion(false)}
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
            const Access = ApiContextRequest("41");
            const url = Access.cPath + "?idCertificado=" + idCertificado;
            try {
              const httpResponse = await new InspeccionDT(
                url,
                "POST"
              ).PrintCertificado({
                idCertificado: idCertificado,
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
                setModalInspeccion(false);
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
      <TUCImprimir
        setLgShowPrint={setLgShowPrint}
        dataInspeccion={dataInspeccion}
        lgShowPrint={lgShowPrint}
      />
    </div>
  );
};

export default PrintInspeccionUno;
