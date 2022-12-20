import React, { useState, useEffect } from "react";
import { GenDataTable } from "../../../../../Components";
import { UsuariosDT } from "../../../../../../Data/UseCases/Apps";
import { ApiContextRequest } from "../../../../../../Main/Context";
import { Alertas } from "../../../../../Components";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ViewUsuario } from "./ViewUsuario";
import { FormRegistrarUsuario } from "./FormRegistrarUsuario";
import { FormEditarUsuario } from "./FormEditarUsuario";

export function DataTableUsuarios({ actualizar, ActualizarCard, Tipo }) {
  const columns = [
    {
      name: "OP",
      idName: "Actions",
      selector: (row) => row?.Actions,
      width: "70px",
      center: true,
    },
    {
      name: "DOCUMENTO",
      idName: "cDocumento",
      selector: (row) => row?.cDocumento,
      center: true,
      //sortable: true,
    },
    {
      name: "NOMBRE",
      idName: "cNombreCompleto",
      selector: (row) => row?.cNombreCompleto,
      cell: (row) => <div>{row?.cNombreCompleto}</div>,
      //maxWidth: '600px',
      //compact: true
      //sortable: true,
      grow: 3,
    },
    {
      name: "E-MAIL",
      idName: "cEmail",
      selector: (row) => row?.cEmail,
    },
    {
      name: "CEL.",
      idName: "cCelular",
      selector: (row) => row?.cCelular,
      width: "70px",
      center: true,
    },
    {
      name: "ESTADO",
      idName: "lEstado",
      selector: (row) => row?.lEstado,
      width: "70px",
      center: true,
    },
  ];

  const [idUsuario, setIdUsuario] = useState("0");
  const [dataRows, setdataRows] = useState([]);
  const [openFullModalView, setopenFullModalView] = useState(false);
  const [openFullModalEdit, setopenFullModalEdit] = useState(false);

  const handleClickOpenViewer = () => {
    setopenFullModalView(true);
  };
  
  const handleCloseViewer = () => {
    setopenFullModalView(false);
  };

  const handleClickOpenEdit = () => {
    setopenFullModalEdit(true);
  };

  const handleCloseEdit = () => {
    setopenFullModalEdit(false);
    ActualizarCard();
  };

  //============================
  //CARGAR DATA TABLE INICIAL
  //============================

  const ObternerData = async (e) => {
    console.log("DDD");
    const Access = ApiContextRequest("48");
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new UsuariosDT(
          Access.cPath,
          Access.cMethod
        ).GetAllUsuarios();
        if (data?.header?.success) {
          const rows = [];
          data?.data.forEach((items) => {
            let ItemActions = <></>;
            if (Tipo === "Editar") {
              ItemActions = (
                <>
                  <span style={{ width: "10px" }}>
                    <button
                      className="btn btn-info"
                      onClick={async () => EditUsuario(items?.idUsuario)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </span>
                </>
              );
            } else {
              ItemActions = (
                <>
                  <span style={{ width: "10px" }}>
                    <button
                      className="btn btn-success"
                      onClick={async () => VerUsuario(items?.idUsuario)}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                  </span>
                </>
              );
            }
            rows.push({
              Actions: ItemActions,
              cCelular: items?.cCelular,
              cDocumento: items?.cDocumento,
              cEmail: items?.cEmail,
              cNombreCompleto: items?.cNombreCompleto,
              idUsuario: items?.idUsuario,
              lEstado: items?.lEstado == true ? "Activo" : "Baja",
            });
          });
          setdataRows(rows);
        } else {
          Alertas("error", data?.header?.message);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    ObternerData();
  }, [actualizar]);

  const VerUsuario = async (e) => {
    setIdUsuario(e);
    handleClickOpenViewer(true);
  };

  const EditUsuario = async (e) => {
    setIdUsuario(e);
    handleClickOpenEdit(true);
  };

  return (
    <>
      <GenDataTable columns={columns} data={dataRows} VerUsuario={VerUsuario} />

      <Dialog fullScreen open={openFullModalView} onClose={handleCloseViewer}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseViewer}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ViewUsuario idUsuario={idUsuario} />
        </List>
      </Dialog>

      <Dialog fullScreen open={openFullModalEdit} onClose={handleCloseEdit}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <span style={{ marginLeft: "10px" }}>REGISTRO DE USUARIO</span>
          </Toolbar>
        </AppBar>
        <List>
          <FormEditarUsuario idUsuario={idUsuario} handleClose={handleCloseEdit}/>
        </List>
      </Dialog>

    </>
  );
}
