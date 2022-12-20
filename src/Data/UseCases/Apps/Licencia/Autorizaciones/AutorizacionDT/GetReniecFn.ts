import {
  ConsultarReniecResponse,
  ConsultarReniecResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import {
  AxiosHttpClient,
  AxiosHttpClientReniec,
} from "../../../../../../Infra/Http";
import { GetUrlDni } from "../../../../../Utitilies";

export async function getReniecFn(
  url: string
): Promise<ConsultarReniecResponse> {
  let datosReniec: ConsultarReniecResponseData = {
    cDocumento: "",
    cNombres: "",
    cApellidoMaterno: "",
    cApellidoPaterno: "",
  };
  const newUlr = GetUrlDni(url);
  console.log(newUlr);
  const method = "GET";
  const httResponse = await new AxiosHttpClientReniec().Request({
    url: newUlr,
    method: method,
  });
  console.log(httResponse);
  if (httResponse?.statusCode === 200) {
    datosReniec = {
      cDocumento: httResponse.body?.dni,
      cNombres: httResponse.body?.nombres,
      cApellidoPaterno: httResponse.body?.apellidoPaterno,
      cApellidoMaterno: httResponse.body?.apellidoMaterno,
    };
  }
  return {
    header: {
      code: httResponse?.statusCode,
      success: httResponse?.body?.success,
      message: httResponse.body?.message,
      errors: httResponse.body?.errors,
    },
    data: datosReniec,
  };
}
