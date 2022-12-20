import React from "react";
import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ModalRegistrarAutorizacion from "./ModalRegistrarAutorizacion";

export const BotonRegistro = (ActualizarCard) => {
  const [openMAutorizacion, setOpenMAutorizacion] = React.useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [actualizar, setActualizar] = useState("");

  const handleClickOpen = () => {
    setOpenMAutorizacion(true);
  };

  const handleClose = () => {
    setOpenMAutorizacion(false);
  };

  return (
    <>
      {/* <Button onClick={() => setLgShow(true)} type="submit" variant="contained">
        REGISTRAR NUEVA AUTORIZACIÓN
      </Button> */}

      {/* <Button
        variant="contained"
        type="submit"
        data-toggle="modal"
        data-target=".bd-example-modal-xl"
      >
        REGISTRAR NUEVA AUTORIZACION
      </Button>

      <div
        className="modal fade bd-example-modal-xl"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 class="modal-title">REGISTRAR RESOLUCIÓN</h2>
              <Button
                className="close bg-blue-700"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="text-xl">
                  ×
                </span>
              </Button>
            </div>
            <ModalRegistrarAutorizacion
              dato={actualizar}
              lgShow={lgShow}
              setLgShow={setLgShow}
            />
          </div>
        </div>
      </div> */}

      <Button variant="contained" onClick={handleClickOpen}>
        REGISTRAR NUEVA AUTORIZACION
      </Button>
      <Dialog fullScreen open={openMAutorizacion} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ModalRegistrarAutorizacion
            ActualizarCard={ActualizarCard}
            // dato={actualizar}
            // lgShow={lgShow}
            // setOpenMAutorizacion={setOpenMAutorizacion}
          />
        </List>
      </Dialog>
      {/* <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg mb-5">
            REGISTRAR AUTORIZACION
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalRegistrarAutorizacion
            dato={actualizar}
            lgShow={lgShow}
            setLgShow={setLgShow}
          />
        </Modal.Body>
      </Modal> */}
    </>
  );
};
