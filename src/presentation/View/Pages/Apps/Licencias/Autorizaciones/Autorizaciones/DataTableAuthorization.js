import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AutorizacionDT } from "../../../../../../../Data/UseCases/Apps";
import { ApiContextRequest } from "../../../../../../../Main/Context";
import { Alertas } from "../../../../../../Components";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ModalContentRegistro } from "./ModalContentRegistro";

const columns = [
  { id: "opciones", label: "Opciones", minWidth: 150 },
  { id: "cRucEmpresa", label: "RUC", minWidth: 100 },
  { id: "cResolucion", label: "Resolucion", minWidth: 100 },
  { id: "cClaseAutorizacion", label: "Clase Autorización", minWidth: 170 },
  //{ id: "chorario", label: "Horario", minWidth: 100 },
  //{ id: "cPlacas", label: "Placas", minWidth: 100 },
  //{ id: "cRecorridoIda", label: "Ruta Inicial", minWidth: 100 },
  //{ id: "cRecorridoRetorno", label: "Ruta Retorno", minWidth: 100 },
  { id: "cServicio", label: "Servicio", minWidth: 100 },
  //{ id: "dFechaModificacion", label: "Fecha Modificacion", minWidth: 100 },
  { id: "dInicioVigecia", label: "Inicio Vigencia", minWidth: 100 },
  { id: "dFinalVigencia", label: "Fin Vigencia", minWidth: 100 },
  { id: "nVehiculos", label: "N Vehiculos", minWidth: 100 },
];

export function DataTableAuthorization() {
  //============================
  //============================
  //VARIABLES
  //============================
  //============================

  const [lgShow, setLgShow] = useState(false);
  const [dataRows, setdataRows] = useState([]);
  const [actualizar, setActualizar] = useState("");

  //============================
  //============================
  //FUNCIONES
  //============================
  //============================

  function createData(
    cClaseAutorizacion,
    cHorario,
    cPlacas,
    cRecorridoIda,
    cRecorridoRetorno,
    cResolucion,
    cRucEmpresa,
    cServicio,
    dFechaModificacion,
    dInicioVigecia,
    dFinalVigencia,
    nVehiculos,
    opciones
  ) {
    return {
      cClaseAutorizacion,
      cHorario,
      cPlacas,
      cRecorridoIda,
      cRecorridoRetorno,
      cResolucion,
      cRucEmpresa,
      cServicio,
      dFechaModificacion,
      dInicioVigecia,
      dFinalVigencia,
      nVehiculos,
      opciones,
    };
  }

  //============================
  //CARGAR DATA TABLE INICIAL
  //============================

  const ObternerData = async (e) => {
    const Access = ApiContextRequest("14");
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
            rows.push(
              createData(
                items.cClaseAutorizacion,
                items.cHorario,
                items.cPlacas,
                items.cRecorridoIda,
                items.cRecorridoRetorno,
                items.cResolucion,
                items.cRucEmpresa,
                items.cServicio,
                items.dFechaModificacion,
                items.dInicioVigecia,
                items.dFinalVigencia,
                items.nVehiculos,
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => Actualizar(items.idAutorizacion)}
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
    const Access = ApiContextRequest("15");
    try {
      const data = await new AutorizacionDT(
        Access.cPath + "?idAutorizacion=" + empresa,
        Access.cMethod
      ).GetAutorizacionFn();
      console.log(data.data);
      setActualizar(data.data);
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
        <TableContainer sx={{ maxHeight: 800 }}>
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
                        //console.log(value);
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
            ACTUALIZAR AUTORIZACION
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContentRegistro
            dato={actualizar}
            lgShow={lgShow}
            setLgShow={setLgShow}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
