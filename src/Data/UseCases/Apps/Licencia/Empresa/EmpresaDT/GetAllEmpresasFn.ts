import { IEmpresaDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function GetAllEmpresasFn(
  url: string,
  method: string,
  params: IEmpresaDT.GetAllEmpresasRequest
): Promise<IEmpresaDT.GetAllEmpresasResponse> {
  let dataDB: IEmpresaDT.GetDTDataEmpresas[] = [];

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
        cCelular: ObjData[i].cCelular,
        cDireccion: ObjData[i].cDireccion,
        cDocumento: ObjData[i].cDocumento,
        cEmail: ObjData[i].cEmail,
        cNombreComercial: ObjData[i].cNombreComercial,
        cRazonSocial: ObjData[i].cRazonSocial,
        dFechaModificacion: ObjData[i].dFechaModificacion,
        idAutorizacion: ObjData[i].idAutorizacion,
        idEmpresa: ObjData[i].idEmpresa,
        lEstado: ObjData[i].lEstado,
        nResolucion: ObjData[i].nResolucion,
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
