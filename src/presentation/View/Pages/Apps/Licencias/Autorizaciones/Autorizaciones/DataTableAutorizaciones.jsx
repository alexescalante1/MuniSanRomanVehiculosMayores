import React, { useEffect, useState } from "react";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { Alertas } from "../../../../../../Components";
import Button from "react-bootstrap/esm/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ViewAutorizaciones from "./ViewAutorizaciones";
import VisualizarAutorizacion from "./VisualizarAutorizacion";
import { GenDataTable } from "../../../../../../Components";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";

const DataTableAutorizaciones = ({
  actualizar,
  ActualizarCard,
  lRenovacion,
}) => {
  const [idEmpresa, setIdEmpresa] = useState("0");
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

  const columns = [
    {
      name: "OP",
      idName: "Actions",
      selector: (row) => row?.Actions,
      width: "110px",
      center: true,
    },
    {
      name: "RUC",
      idName: "cRucEmpresa",
      selector: (row) => row?.cRucEmpresa,
      center: true,
      //sortable: true,
    },
    {
      name: "RESOLUCION",
      idName: "cResolucion",
      selector: (row) => row?.cResolucion,
      cell: (row) => <div>{row?.cResolucion}</div>,
    },
    {
      name: "NOMBRE COMERCIAL",
      idName: "cNombre",
      selector: (row) => row?.cNombre,
    },
    {
      name: "RAZON SOCIAL",
      idName: "cRazonSocial",
      selector: (row) => row?.cRazonSocial,
      cell: (row) => <div>{row?.cRazonSocial}</div>,
      grow: 2,
    },
  ];

  //============================
  //CARGAR DATA TABLE INICIAL
  //============================

  const ObternerData = async (e) => {
    let Access = {};
    if (lRenovacion === true) {
      Access = ApiContextRequest("52");
    } else {
      Access = ApiContextRequest("14");
    }
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new AutorizacionDT(
          Access.cPath,
          Access.cMethod
        ).GetAllAutorizacion({
          cParams: "",
        });
        if (data?.header?.success) {
          const rows = [];
          data?.data.forEach((items) => {
            rows.push({
              Actions: (
                <>
                  <div>
                    <>
                      <Button
                        type=""
                        onClick={async () => EditEmpresa(items?.idEmpresa)}
                      >
                        <i className="fa fa-edit"></i>
                      </Button>
                      <Button
                        type=""
                        className="ml-1 bg-green-500"
                        onClick={async () => VerEmpresa(items?.idEmpresa)}
                      >
                        <i className="fa fa-eye"></i>
                      </Button>
                    </>
                  </div>
                </>
              ),
              cFlota: items?.cFlota,
              cNombre: items?.cNombre,
              cRazonSocial: items?.cRazonSocial,
              cResolucion: items?.cResolucion,
              cRucEmpresa: items?.cRucEmpresa,
              dFinalVigencia: items?.dFinalVigencia,
              idAutorizacion: items?.idAutorizacion,
              idEmpresa: items?.idEmpresa,
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

  const VerEmpresa = async (e) => {
    setIdEmpresa(e);
    handleClickOpenViewer(true);
  };

  const EditEmpresa = async (e) => {
    setIdEmpresa(e);
    handleClickOpenEdit(true);
  };

  return (
    <div className="card mt-3">
      <GenDataTable columns={columns} data={dataRows} />

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
          <VisualizarAutorizacion idEmpresa={idEmpresa} />
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
          <ViewAutorizaciones idEmpresa={idEmpresa} lRenovacion={lRenovacion} />
        </List>
      </Dialog>
    </div>
  );
};

export default DataTableAutorizaciones;
