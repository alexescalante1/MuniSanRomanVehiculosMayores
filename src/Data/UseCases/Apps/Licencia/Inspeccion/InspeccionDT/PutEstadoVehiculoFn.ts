import {
  UpdateEstadoData,
  UpdateEstadoRequest,
  UpdateEstadoResponse,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function putEstadoVehiculoFn(
  url: string,
  method: string,
  params: UpdateEstadoRequest
): Promise<UpdateEstadoResponse> {
  let dataResponse: UpdateEstadoData = {
    cJson: "",
    idCertificado: "",
    idEstado: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
    body:params
  });
  console.log(httpResponse);
  let data = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    dataResponse = {
      cJson: data.cJson,
      idCertificado: data.idCertificado,
      idEstado: data.idEstado,
    };
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
