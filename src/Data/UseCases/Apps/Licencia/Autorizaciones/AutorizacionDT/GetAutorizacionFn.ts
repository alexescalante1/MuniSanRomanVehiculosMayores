import {
  AutorizacionResponsePut,
  AutorizationRequestPut,
} from "../../../../../../Domain/Models/Apps/Licencias";
import {
  AxiosHttpClient,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getAutorizacionFn(
  url: string,
  method: string
): Promise<AutorizacionResponsePut> {
  let dataAutorizacion: AutorizationRequestPut = {
    cClaseAutorizacion: "",
    cHorario: "",
    cPlacas: "",
    cRecorridoIda: "",
    cRecorridoRetorno: "",
    cResolucion: "",
    cRucEmpresa: "",
    idServicio: "",
    dFinalVigencia: "",
    dInicioVigecia: "",
    lEstado: "",
    nVehiculos: "",
    idAutorizacion:""
  };
  let httResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log(httResponse)
  console.log("desde obtener Response")
  let Resultado = httResponse?.body?.data;
  if (httResponse.body?.success === 1) {
    dataAutorizacion = {
      cClaseAutorizacion: Resultado.cClaseAutorizacion,
      cHorario: Resultado.cHorario,
      cPlacas: Resultado.cPlacas,
      cRecorridoIda: Resultado.cRecorridoIda,
      cRecorridoRetorno: Resultado.cRecorridoRetorno,
      cResolucion: Resultado.cResolucion,
      cRucEmpresa: Resultado.cRucEmpresa,
      idServicio: Resultado.idServicio,
      dFinalVigencia: Resultado.dFinalVigencia,
      dInicioVigecia: Resultado.dInicioVigecia,
      lEstado: Resultado.lEstado,
      nVehiculos: Resultado.nVehiculos,
      idAutorizacion:Resultado.idAutorizacion
    };
  }
  console.log(dataAutorizacion)
  return {
    header: {
      code: httResponse.statusCode,
      success: httResponse?.body?.success,
      message: httResponse?.body?.message,
      errors: httResponse?.body?.errors,
    },
    data: dataAutorizacion,
  };
}
