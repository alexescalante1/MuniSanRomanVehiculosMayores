import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { TUCModelPrintFrontal, TUCModelPrintAtras } from "../../../../../Print/TUCModelPrint";
import * as XLSX from "xlsx";
import ReactToPrint from "react-to-print";

export const TUCGenerador = () => {
  const [TucGenerator, setTucGenerator] = useState([]);
  let PrintFrontRef = useRef();
  let PrintTrasRef = useRef();
  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === "file") {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let HOJAS = [];
        workbook.SheetNames.forEach(function (sheetName) {
          let DATA_TUC = [];
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );

          XL_row_object.forEach((ItemHoja) => {
            DATA_TUC.push({
              ID: ItemHoja["ID"],
              RESOLUCION: ItemHoja["RESOLUCION"],
              RAZON_SOCIAL: ItemHoja["RAZON_SOCIAL"],
              PLACA: ItemHoja["PLACA"],
              PLACA_ANT: ItemHoja["PLACA_ANT"],
              CATEGORIA: ItemHoja["CLASE"],
              ANIO_DE_FAB: ItemHoja["ANIO_DE_FAB"],
              MARCA: ItemHoja["MARCA"],
              MODELO: ItemHoja["MODELO"],
              ASIENTOS: ItemHoja["ASIENTOS"],
              P_NETO: ItemHoja["P_NETO"],
              COLOR: ItemHoja["COLOR"],
              PARTIDA_REG: ItemHoja["PARTIDA_REG"],
              MOTOR: ItemHoja["MOTOR"],
              EXPEDIDO: ItemHoja["EXPEDIDO"],
              HASTA: ItemHoja["HASTA"],
              PUNTO_PARTIDA: ItemHoja["PUNTO_PARTIDA"],
              RETORNO: ItemHoja["RETORNO"],
            });
          });

          HOJAS.push({
            name: sheetName,
            data: DATA_TUC,
          });
        });
        setTucGenerator(HOJAS);
      };
    }
  }

  return (
    <>
      <div className="container" style={{width: "1000px"}}>
        <input
          className="m-3"
          required
          type="file"
          name="file"
          id="file"
          onChange={handleInputChange}
          style={{ color: "blue" }}
        />
        <br />
        <ReactToPrint
          trigger={() => {
            return (
              <Button className="m-3" variant="contained">
                IMPRIMIR CARAS FRONTALES
              </Button>
            );
          }}
          content={() => PrintFrontRef}
          pageStyle="print"
        />
        <ReactToPrint
          trigger={() => {
            return (
              <Button className="m-3" variant="contained">
                IMPRIMIR CARAS TRASERAS
              </Button>
            );
          }}
          content={() => PrintTrasRef}
          pageStyle="print"
        />

        <div ref={(el) => (PrintFrontRef = el)}>
          {/* <Modal.Body> */}
          <TUCModelPrintFrontal data={TucGenerator} />
          {/* </Modal.Body> */}
        </div>

        <div ref={(el) => (PrintTrasRef = el)}>
          {/* <Modal.Body> */}
          <TUCModelPrintAtras data={TucGenerator} />
          {/* </Modal.Body> */}
        </div>

      </div>
    </>
  );
};
