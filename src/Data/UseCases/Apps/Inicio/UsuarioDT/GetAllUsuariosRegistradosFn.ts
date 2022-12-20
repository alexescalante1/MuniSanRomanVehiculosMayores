import { IUsuariosDT } from "../../../../../Domain/Interfaces/Aplication/Apps/Inicio";
import { AxiosHttpClient } from "../../../../../Infra/Http";
import { GetToken } from "../../../../Utitilies";

export async function GetAllUsuariosRegistradosFn(
  url: string,
  method: string
): Promise<IUsuariosDT.GetAllUsuarioRegistradosResponse> {
  //console.log(url);
  //console.log(method);
  let dataResponse: IUsuariosDT.GetAllUserResponse[] = [];
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  //console.log(dataResponse)
  let objData = httpResponse?.body?.data;
  if (httpResponse?.body?.success === 1) {
    for (let i = 0; i < objData.length; i++) {
      dataResponse.push({
        cCelular: objData[i].cCelular,
        cDocumento: objData[i].cDocumento,
        cEmail:objData[i].cEmail,
        cNombreCompleto:objData[i].cNombreCompleto,
        idUsuario:objData[i].idUsuario,
        lEstado:objData[i].lEstado
      });
    }
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataResponse
  }
}
