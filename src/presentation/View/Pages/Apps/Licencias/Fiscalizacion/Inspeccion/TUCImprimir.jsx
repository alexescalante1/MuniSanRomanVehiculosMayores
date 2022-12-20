import React from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import TUCPlantilla from "../../../../../Print/TUCPlantilla";

export const TUCImprimir = ({
  setLgShowPrint,
  lgShowPrint,
  dataInspeccion,
}) => {
  let componentRef = useRef();
  console.log("DATA INSPECCION IMPRIMIR");
  console.log(dataInspeccion);
  const cerrarModalPrint = () => {
    setLgShowPrint(false);
  };
  return (
    <>
      <Modal
        size="xl"
        show={lgShowPrint}
        fullscreen={lgShowPrint}
        onHide={() => cerrarModalPrint()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ReactToPrint
          trigger={() => {
            return (
              <Button className="m-3" variant="contained">
                IMPRIMIR
              </Button>
            );
          }}
          content={() => componentRef}
          pageStyle="print"
        />
        <div ref={(el) => (componentRef = el)}>
          <Modal.Body>
            <TUCPlantilla dataInspeccion={dataInspeccion} />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};
