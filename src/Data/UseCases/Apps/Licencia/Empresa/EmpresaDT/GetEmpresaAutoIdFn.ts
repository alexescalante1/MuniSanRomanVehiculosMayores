import {
  DTEmpresaResponseId,
  EmpresaResponseId,
  lsVehiculos,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getEmpresaAutoFn(
  url: string,
  method: string
): Promise<EmpresaResponseId> {
  let vehiculoLista: lsVehiculos[] = [];
  let empresaAuto: DTEmpresaResponseId = {
    cRecorridoIda: "",
    cRecorridoRetorno: "",
    cHorario: "",
    cPlacas: "",
    cDireccion: "",
    idServicio: "",
    cNombreComercial: "",
    cNumVehiculos: "",
    cRUC: "",
    idClaseResolucion: "",
    cRazonSocial: "",
    cRepresentante: "",
    cServicio: "",
    cTipoResolucion: "",
    dFechaRegistro: "",
    dFinalVigencia: "",
    idEmpresa: "",
    lstVehiculos: vehiculoLista,
    nResolucion: "",
  };

  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  const dataGerente = httpResponse?.body?.data;
  console.log("DATOS VEHICULOS");
  console.log(httpResponse);
  if (httpResponse.body.success === 1) {
    const lsVehiculos = httpResponse?.body.data.lstVehiculos;
    lsVehiculos.forEach((e: lsVehiculos) => {
      vehiculoLista.push(e);
    });
    empresaAuto = {
      cRecorridoIda: dataGerente.cRecorridoIda,
      cRecorridoRetorno: dataGerente.cRecorridoRetorno,
      cHorario: dataGerente.cHorario,
      cPlacas: dataGerente.cPlacas,
      idServicio: dataGerente.idServicio,
      idClaseResolucion: dataGerente.idClaseResolucion,
      cDireccion: dataGerente.cDireccion,
      cNombreComercial: dataGerente.cNombreComercial,
      cNumVehiculos: dataGerente.nFlota,
      cRUC: dataGerente.cRUC,
      cRazonSocial: dataGerente.cRazonSocial,
      cRepresentante: dataGerente.cRepresentante,
      cServicio: dataGerente.cServicio,
      cTipoResolucion: dataGerente.cTipoResolucion,
      dFechaRegistro: dataGerente.dFechaRegistro,
      dFinalVigencia: dataGerente.dFinalVigencia,
      idEmpresa: dataGerente.idEmpresa,
      lstVehiculos: vehiculoLista,
      nResolucion: dataGerente.nResolucion,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: empresaAuto,
  };
}
