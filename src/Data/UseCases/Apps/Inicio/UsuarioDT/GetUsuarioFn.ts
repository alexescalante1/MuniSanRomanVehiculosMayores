import { object } from "prop-types";
import { IUsuariosDT } from "../../../../../Domain/Interfaces/Aplication/Apps/Inicio";
import { AxiosHttpClient } from "../../../../../Infra/Http";
import { GetToken } from "../../../../Utitilies";

export async function GetUsuarioFn(
  url: string,
  method: string
): Promise<IUsuariosDT.GetUsuarioResponse> {

  console.log(url)
  console.log(method)
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });

  console.log(httpResponse);

  let datoResponse: IUsuariosDT.GetOnlyUsuarioIUser = {
    cApellidos: "",
    cCelular: "",
    cDireccion: "",
    cDocumento: "",
    cEmail: "",
    cNombres: "",
    idRole: "",
    idUsuario: "",
    nGenero: ""
  };

  let data = httpResponse.body?.data;
  if (httpResponse?.body?.success === 1) {
    datoResponse = {
      cApellidos: data.cApellidos,
      cCelular: data.cCelular,
      cDireccion: data.cDireccion,
      cDocumento: data.cDocumento,
      cEmail: data.cEmail,
      cNombres: data.cNombres,
      idRole: data.idRole,
      idUsuario: data.idUsuario,
      nGenero:data.nGenero
    };
  }

  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: datoResponse,
  };
}
