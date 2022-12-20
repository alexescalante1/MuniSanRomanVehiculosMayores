import {
  GerenteResponseData,
  GerenteResponseGet,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getGerenteFn(
  url: string,
  method: string
): Promise<GerenteResponseGet> {
  let gerenteResponse: GerenteResponseData = {
    cDocumento: "",
    cApellidoMaterno: "",
    cApellidoPaterno: "",
    idRepresentante: "",
    cNombres: "",
  };
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers:GetToken()
  });
  const dataGerente = httpResponse?.body?.data;
  if (httpResponse.body.success === 1) {
    gerenteResponse = {
      cApellidoMaterno: dataGerente.cApellidoMaterno,
      cApellidoPaterno: dataGerente.cApellidoPaterno,
      idRepresentante: dataGerente.idRepresentante,
      cDocumento: dataGerente.cDocumento,
      cNombres: dataGerente.cNombres,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: gerenteResponse,
  };
}
