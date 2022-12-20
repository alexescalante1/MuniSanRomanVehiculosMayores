import {
  AutoriUpdateDataResponse,
  AutoriUpdateResponse,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function updateAutorizacionFn(
  url: string,
  method: string,
  param: AutoriUpdateDataResponse
): Promise<AutoriUpdateResponse> {
  let datoResponse: AutoriUpdateDataResponse = {
    idEmpresa: "",
    cResolucion: "",
    idServicio: "",
    idClaseResolucion: "",
    cHorario: "",
    cPlacas: "",
    nFlota: "",
    dInicioVigecia: "",
    dFinalVigencia: "",
    cRecorridoIda: "",
    cRecorridoRetorno: "",
  };
  console.log("DESDE EL BACKEND ACTUALIZAR RENOVACION")
  console.log(param)
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: param,
    headers: GetToken(),
  });
  console.log(httpResponse);
  const dataAutorizacion = httpResponse?.body?.data;
  if (httpResponse.body.success === 1) {
    // datoResponse = {
    //   cNombre: dataAutorizacion.cNombre,
    //   cRazonSocial: dataAutorizacion.cRazonSocial,
    //   cResolucion: dataAutorizacion.cResolucion,
    //   cRucEmpresa: dataAutorizacion.cRucEmpresa,
    //   dFechaModificacion: dataAutorizacion.dFechaModificacion,
    //   idAutorizacion: dataAutorizacion.idAutorizacion,
    //   idEmpresa: dataAutorizacion.idEmpresa,
    //   vCaducidad: dataAutorizacion.vCaducidad,
    // };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    //data: datoResponse,
  };
}
