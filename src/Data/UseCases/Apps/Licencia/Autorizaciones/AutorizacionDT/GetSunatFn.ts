import {
  SunatResponse,
  SunatResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import {
  AxiosHttpClient,
  AxiosHttpClientReniec,
} from "../../../../../../Infra/Http";
import { GetToken, GetUrlRuc } from "../../../../../Utitilies";

export async function getSunatFn(
  url: string,
  method: string
): Promise<SunatResponse> {
  let dataSunat: SunatResponseData = {
    ruc: "",
    razonSocial: "",
    nombreComercial: "",
    direccion: "",
    estado: "",
  };
  const urlSunat = GetUrlRuc(url);
  method = "GET";
  console.log(urlSunat);
  const httpResponse = await new AxiosHttpClientReniec().Request({
    url: urlSunat,
    method: method,
  });
  console.log(httpResponse)
  const dataEmpresa = httpResponse?.body;
  if (httpResponse?.statusCode === 200) {
    dataSunat = {
      ruc: dataEmpresa.ruc,
      razonSocial: dataEmpresa.razonSocial,
      nombreComercial: dataEmpresa.nombreComercial,
      direccion: dataEmpresa.direccion,
      estado: dataEmpresa.estado,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataSunat,
  };
}
