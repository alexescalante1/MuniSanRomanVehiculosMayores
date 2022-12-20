import React from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import TUCPlantilla from "../../../../../Print/TUCPlantilla";

export const TUCImprimir = () => {
  let componentRef = useRef();
  const [lgShow, setLgShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  function fullScream() {
    setLgShow(true);
    setFullscreen(true);
  }

  return (
    <>
      <div className="text-center">
        <Button onClick={() => fullScream()} variant="contained">
          Imprimir TUC
        </Button>
      </div>
      <Modal
        size="xl"
        show={lgShow}
        fullscreen={fullscreen}
        onHide={() => setLgShow(false)}
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
            <TUCPlantilla />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};
