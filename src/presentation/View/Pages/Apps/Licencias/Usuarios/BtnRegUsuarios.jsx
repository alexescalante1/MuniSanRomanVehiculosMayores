import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { FormRegistrarUsuario } from "./FormRegistrarUsuario";

export function BtnRegUsuarios({ ActualizarCard }) {
  const [openFullModalReg, setopenFullModalReg] = useState(false);

  const handleClickOpenReg = () => {
    setopenFullModalReg(true);
  };

  const handleCloseReg = () => {
    setopenFullModalReg(false);
    ActualizarCard();
  };

  return (
    <>
      <Button onClick={handleClickOpenReg} type="submit" variant="contained">
        REGISTRAR USUARIO
      </Button>

      <Dialog fullScreen open={openFullModalReg} onClose={handleCloseReg}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseReg}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <span style={{ marginLeft: "10px" }}>REGISTRO DE USUARIO</span>
          </Toolbar>
        </AppBar>
        <List>
          <FormRegistrarUsuario handleClose={handleCloseReg} />
        </List>
      </Dialog>
    </>
  );
}
