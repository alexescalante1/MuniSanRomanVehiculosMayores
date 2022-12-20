import { IAutorizacionDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function GetAllAutorizacionFn(
  url: string,
  method: string,
  params: IAutorizacionDT.GetAllAutorizacionRequest
): Promise<IAutorizacionDT.GetAllAutorizacionResponse> {
  let dataDB: IAutorizacionDT.DataDTAuthorization[] = [];

  const httpResponse = await new AxiosHttpClient().Request({
    url: url + params.cParams,
    method: method,
    headers: GetToken(),
  });

  let ObjData = httpResponse?.body?.data;
  new AlertServerError().AlertStatusCode(httpResponse.statusCode);

  if (httpResponse?.body?.success === 1) {
    for (let i = 0; i < ObjData.length; i++) {
      dataDB.push({
        cFlota: ObjData[i].cFlota,
        cNombre: ObjData[i].cNombre,
        cRazonSocial: ObjData[i].cRazonSocial,
        cResolucion: ObjData[i].cResolucion,
        cRucEmpresa: ObjData[i].cRucEmpresa,
        dFinalVigencia: ObjData[i].dFinalVigencia,
        idAutorizacion: ObjData[i].idAutorizacion,
        idEmpresa: ObjData[i].idEmpresa,
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
    data: dataDB,
  };
}
