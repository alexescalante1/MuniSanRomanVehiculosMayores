import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalContentRegistro } from "./ModalContentRegistro";
import Button from "@mui/material/Button";

export const BotonRegistro = () => {
  const [lgShow, setLgShow] = useState(false);
  const [actualizar, setActualizar] = useState("");
  function cerrar() {
    setLgShow(false);
  }
  return (
    <>
      <Button onClick={() => setLgShow(true)} type="submit" variant="contained">
        REGISTRAR EMPRESA
      </Button>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      ></div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={cerrar}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              <>REGISTRAR EMPRESA</>
            <div >
              {/* <i
                className="fa fa-times-circle text-center ml-32"
                onClick={() => cerrar()}
                aria-hidden="true"
              ></i> */}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContentRegistro setLgShow={setLgShow} dato={actualizar} />
        </Modal.Body>
      </Modal>
    </>
  );
};
