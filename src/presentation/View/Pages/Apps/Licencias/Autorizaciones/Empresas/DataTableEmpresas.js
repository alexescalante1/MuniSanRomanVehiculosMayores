import React, { Component, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "react-bootstrap/Modal";
import Fade from "@mui/material/Fade";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Alertas } from "../../../../../../Components";
import { ModalContentRegistro } from "./ModalContentRegistro";
import { EmpresaDT } from "../../../../../../../Data/UseCases/Apps";
import { ApiContextRequest } from "../../../../../../../Main/Context";

const columns = [
  { id: "opciones", label: "Opciones", minWidth: 100 },
  { id: "cDocumento", label: "Documento", minWidth: 100 },
  { id: "cNombreComercial", label: "Nombre Comercial", minWidth: 100 },
  { id: "cRazonSocial", label: "Razon Social", minWidth: 100 },
  { id: "cCelular", label: "Celular", minWidth: 170 },
  { id: "cDireccion", label: "Direccion", minWidth: 100 },
  { id: "cEmail", label: "Email", minWidth: 100 },
  // { id: "dFechaModificacion", label: "Fecha Modificacion", minWidth: 100 },
  //{ id: "nResolucion", label: "Resolucion", minWidth: 100 },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  boxShadow: 2,
  p: 4,
};

export function DataTableEmpresas() {
  //============================
  //============================
  //VARIABLES
  //============================
  //============================
  const [lgShow, setLgShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dataRows, setdataRows] = useState([]);
  const handleClose = () => setOpen(false);
  const [actualizar, setActualizar] = useState("");

  //============================
  //============================
  //FUNCIONES
  //============================
  //============================

  function createData(
    cCelular,
    cDireccion,
    cDocumento,
    cEmail,
    cNombreComercial,
    cRazonSocial,
    dFechaModificacion,
    nResolucion,
    opciones
  ) {
    return {
      cCelular,
      cDireccion,
      cDocumento,
      cEmail,
      cNombreComercial,
      cRazonSocial,
      dFechaModificacion,
      nResolucion,
      opciones,
    };
  }

  //============================
  //CARGAR DATA TABLE INICIAL
  //============================

  const ObternerData = async (e) => {
    const Access = ApiContextRequest("20");
    if (Access.cPath != "ErrorDeAcceso") {
      try {
        const data = await new EmpresaDT(
          Access.cPath,
          Access.cMethod
        ).GetAllEmpresas({
          cParams: "",
        });
        if (data?.header?.success) {
          const rows = [];
          data?.data.forEach((items) => {
            rows.push(
              createData(
                items.cCelular,
                items.cDireccion,
                items.cDocumento,
                items.cEmail,
                items.cNombreComercial,
                items.cRazonSocial,
                items.dFechaModificacion,
                items.nResolucion,
                <>
                  <button
                    className="btn btn-warning"
                    //IMPLEMENTAR BOTON DE OBTENER DATOS
                    onClick={() => Actualizar(items.idEmpresa)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="btn btn-success">
                    <i className="fa fa-eye"></i>
                  </button>
                </>
              )
            );
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
  }, [setdataRows]);

  //============================
  //EDITAR ITEM
  //============================

  const Actualizar = async (empresa) => {
    setLgShow(true);
    const Access = ApiContextRequest("19");
    console.log(Access)
    try {
      const data = await new EmpresaDT(
        Access.cPath + "?idEmpresa=" + empresa,
        Access.cMethod
      ).GetEmpresa();
      setActualizar(data);
      console.log(data)
    } catch {
      console.log("Error");
    }
  };

  //============================
  //PAGINA
  //============================

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //============================
  //RENDER
  //============================

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
        <br></br> */}
      </Paper>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg mb-5">
            REGISTRAR EMPRESA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContentRegistro dato={actualizar} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
