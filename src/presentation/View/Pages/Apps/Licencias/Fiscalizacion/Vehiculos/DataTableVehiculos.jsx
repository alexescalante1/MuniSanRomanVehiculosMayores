import React from "react";
import { DataTable } from "primereact/datatable";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Column } from "primereact/column";
const DataTableVehiculos = ({ datoEmpresa }) => {
  const { idEmpresa, lstVehiculos } = datoEmpresa;
  const [age, setAge] = React.useState("");

  console.log("DESDE TABLA VEHICULOS");
  console.log(datoEmpresa);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const ObtenerIdUsuario = (idValor) => {
    const mostrarValor = () => {
      return console.log(idValor);
    };

    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">ESTADO</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>ACTIVO</MenuItem>
            <MenuItem value={20}>APROBADO</MenuItem>
            <MenuItem value={30}>INSPECCIÓN</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  return (
    <div className="mt-4">
      <div className="card mt-3 w-11/12  m-auto ">
        <DataTable value={lstVehiculos} responsiveLayout="scroll" size="large">
          <Column field="cPlaca" header="PLACA"></Column>
          <Column
            field="cPropietario"
            style={{ width: "15%" }}
            header="CONDUCTOR"
          ></Column>
          <Column field="cDescripcion" header="DESCRIPCION"></Column>
          
          <Column field="cMarca" header="MARCA"></Column>
          <Column field="cModelo" header="MODELO"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableVehiculos;
