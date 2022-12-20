import {
  SunarpDataResponse,
  SunarpResponse,
  SunatResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getSunarpFn(
  url: string,
  method: string
): Promise<SunarpResponse> {
  let sunarpData: SunarpDataResponse = {
    cClase: "",
    cColor: "",
    cMarca: "",
    cMotor: "",
    cPlaca: "",
    cSerie: "",
    nAnio: "",
    nAsiento: "",
    nPeso: "",
    cModelo: "",
    cPlacaAnt: "",
  };
  const NewUrl = "/api/externos/sunarp?cPlaca=" + url;
  const httpResponse = await new AxiosHttpClient().Request({
    url: NewUrl,
    method: method,
    headers: GetToken(),
  });
  let dataRes = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    sunarpData = {
      cClase: dataRes.cClase,
      cPlacaAnt: dataRes.cPlacaAnt,
      cColor: dataRes.cColor,
      cMarca: dataRes.cMarca,
      cMotor: dataRes.cMotor,
      cPlaca: dataRes.cPlaca,
      cSerie: dataRes.cSerie,
      nAnio: dataRes.nAnio,
      nAsiento: dataRes.nAsiento,
      nPeso: dataRes.nPeso,
      cModelo: dataRes.cModelo,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: sunarpData,
  };
}
