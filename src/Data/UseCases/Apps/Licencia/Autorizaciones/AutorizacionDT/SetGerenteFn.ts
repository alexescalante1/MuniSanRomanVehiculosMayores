import { IAutorizacionDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  GerenteRequestData,
  GerenteResponseSet,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function setGerenteFn(
  url: string,
  method: string,
  body: GerenteRequestData
): Promise<IAutorizacionDT.GetGerenteResponse> {
  let dataGerenteResponse: GerenteResponseSet = {
    idRepresentante: "",
    cNombres: "",
    cApellidoMaterno: "",
    cApellidoPaterno: "",
    cDocumento: "",
  };
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: body,
    headers: GetToken(),
  });

  console.log("httpResponse BACKEND");
  console.log(httpResponse);
  let datoResponse = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    dataGerenteResponse = {
      idRepresentante: datoResponse.idRepresentante,
      cNombres: datoResponse.cNombres,
      cApellidoPaterno: datoResponse.cApellidoPaterno,
      cApellidoMaterno: datoResponse.cApellidoMaterno,
      cDocumento: datoResponse.cDocumento,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataGerenteResponse,
  };
}
