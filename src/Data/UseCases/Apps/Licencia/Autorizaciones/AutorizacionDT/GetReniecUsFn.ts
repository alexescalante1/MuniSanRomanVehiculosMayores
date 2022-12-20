import {
  ReniecUsResponse,
  ReniecUsResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import {
  AxiosHttpClient,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function GetReniecUsFn(
  url: string,
  method: string
): Promise<ReniecUsResponse> {
  let ReniecDato: ReniecUsResponseData = {
    cApellidoMaterno: "",
    cApellidoPaterno: "",
    cDireccion: "",
    cDni: "",
    cEmail: "",
    cNombres: "",
    cTelefono: "",
    nGenero: "",
  };
  const newUlr = "/api/externos/reniec?cDni=" + url;
  console.log(newUlr);
  const httpResponse = await new AxiosHttpClient().Request({
    url: newUlr,
    method: method,
    headers: GetToken(),
  });
  console.log(httpResponse);
  let datoResponse = httpResponse?.body?.data;
  if (httpResponse.body.success === 1) {
    ReniecDato = {
      cApellidoMaterno: datoResponse.cApellidoMaterno,
      cApellidoPaterno: datoResponse.cApellidoPaterno,
      cDireccion: datoResponse.cDireccion,
      cDni: datoResponse.cDni,
      cEmail: datoResponse.cEmail,
      cNombres: datoResponse.cNombre,
      cTelefono: datoResponse.cTelefono,
      nGenero: datoResponse.nGenero,
    };
  }else{
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: ReniecDato,
  };
}
