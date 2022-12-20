import React from "react";
import { Dialog } from "primereact/dialog";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { InspeccionDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import { Button } from "primereact/button";

const CambiarEstado = ({ setVisible, idVehiculo, visible, ActualizarCard }) => {
  const onHide = () => {
    setVisible(false);
  };

  const vincular = async () => {
    const Access = ApiContextRequest("38");
    const NewUrl = Access.cPath + "?idCertificado=" + idVehiculo;
    try {
      const httpResponse = await new InspeccionDT(
        NewUrl,
        Access.cMethod
      ).PutEstadoVehiculo({
        idEstado: "6",
        cDescripcion: "",
      });
      console.log(httpResponse);
      if (httpResponse.header.errors.length > 0) {
        console.log(httpResponse.header.errors[0].message);
        const alertas = httpResponse.header.errors;
        alertas.map((e) => Alertas("warning", e.message));
      } else {
        Alertas("success", "Se actualizo correctamente");
        setVisible(false);
        ActualizarCard();
      }
    } catch (error) {
      Alertas("error", "Huboe un error de servidor");
    }
  };
  return (
    <div className="card">
      <Dialog
        header="¿Quiere Aprobar el Vehículo?"
        visible={visible}
        position={"right"}
        modal
        style={{ width: "50vw" }}
        onHide={() => onHide()}
        draggable={false}
        resizable={false}
      >
        <div className="col">
          <Button
            label="No"
            icon="pi pi-times"
            onClick={() => onHide()}
            className="p-button-text"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            onClick={() => vincular()}
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
};

export default CambiarEstado;
