import { IEmpresaDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { EmpresaResponseAutor } from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function GetEmpresaAFn(
  url: string,
  method: string
): Promise<IEmpresaDT.GetEmpresaResponseAuto> {
  let responseData: EmpresaResponseAutor = {
    cResolucion: "",
    cServicio: "",
    idAutorizacion: "",
  };
  console.log(url)
  console.log(method)

  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log(httpResponse);
  const datosRespuesta = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    responseData = {
      cResolucion: datosRespuesta.cResolucion,
      cServicio: datosRespuesta.cServicio,
      idAutorizacion: datosRespuesta.idAutorizacion,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: responseData,
  };
}
