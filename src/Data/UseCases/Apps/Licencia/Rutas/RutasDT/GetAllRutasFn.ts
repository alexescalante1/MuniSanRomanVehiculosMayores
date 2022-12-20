import { IRutasDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function GetAllRutasFn(
  url: string,
  method: string
): Promise<IRutasDT.GetAllRutasResponse> {
  let dataDB: IRutasDT.DTAuthLineRouters[] = [];

  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });

  let ObjData = httpResponse?.body?.data;
  new AlertServerError().AlertStatusCode(httpResponse.statusCode);

  if (httpResponse?.body?.success === 1) {
    for (let i = 0; i < ObjData.length; i++) {
      dataDB.push({
        cRucEmpresa: ObjData[i]?.cRucEmpresa,
        idAutorizacion: ObjData[i]?.idAutorizacion,
        idEmpresa: ObjData[i]?.idEmpresa,
        arrCoordenada: ObjData[i]?.arrCoordenada,
        cNombreComercial: ObjData[i]?.cNombreComercial,
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
