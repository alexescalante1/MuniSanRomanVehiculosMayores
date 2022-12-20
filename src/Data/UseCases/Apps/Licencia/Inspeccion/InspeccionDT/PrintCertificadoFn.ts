import {
  PrintInspeccionRequest,
  PrintInspeccionResponse,
  PrintInspeccionResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function printCertificadoFn(
  url: string,
  method: string,
  params: PrintInspeccionRequest
): Promise<PrintInspeccionResponse> {
  let dataResponse: PrintInspeccionResponseData[] = [];
  let dataResponseOne: PrintInspeccionResponseData = {
    cCodigoVehiculo: "",
    cDepartamento: "",
    cDetalleVehiculo: "",
    cDireccionPropietario: "",
    cDistrito: "",
    cEmpresa: "",
    cLicenciaCategoriaConductor: "",
    cLugar: "",
    cNomCompletoConductor: "",
    cNomCompletoPropietario: "",
    cNomCompletoRepresentante: "",
    cPlacaVehiculo: "",
    cProvincia: "",
    cServicioVehiculo: "",
    dFecha: "",
    nCertificado: "",
    nDniConductor: "",
    nDniPropietario: "",
    nDniRepresentante: "",
    nNumCelularPropietario: "",
    nNumLicenciaConductor: "",
    nRuc: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
    body: params,
  });
  console.log(httpResponse);
  let data = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    dataResponseOne = {
      cCodigoVehiculo: data.cCodigoVehiculo,
      cDepartamento: data.cDepartamento,
      cDetalleVehiculo: data.cDetalleVehiculo,
      cDireccionPropietario: data.cDireccionPropietario,
      cDistrito: data.cDistrito,
      cEmpresa: data.cEmpresa,
      cLicenciaCategoriaConductor: data.cLicenciaCategoriaConductor,
      cLugar: data.cLugar,
      cNomCompletoConductor: data.cNomCompletoConductor,
      cNomCompletoPropietario: data.cNomCompletoPropietario,
      cNomCompletoRepresentante: data.cNomCompletoRepresentante,
      cPlacaVehiculo: data.cPlacaVehiculo,
      cProvincia: data.cProvincia,
      cServicioVehiculo: data.cServicioVehiculo,
      dFecha: data.dFecha,
      nCertificado: data.nCertificado,
      nDniConductor: data.nDniConductor,
      nDniPropietario: data.nDniPropietario,
      nDniRepresentante: data.nDniRepresentante,
      nNumCelularPropietario: data.nNumCelularPropietario,
      nNumLicenciaConductor: data.nNumLicenciaConductor,
      nRuc: data.nRuc,
    };
    dataResponse.push(dataResponseOne);
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataResponse,
  };
}
