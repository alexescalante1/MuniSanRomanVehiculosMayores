import { IConductorDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { ConductoGetId } from "../../../../../../Domain/Models/Apps/Licencias";
import { BaseResponse } from "../../../../../../Domain/Models/Base";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function setConductorFn(
  url: string,
  method: string,
  params: IConductorDT.RequestEmpresa
): Promise<IConductorDT.ResponseConductor> {
  let dataResponse: ConductoGetId = {
    cNombres: "",
    cNombreCompleto: "",
    cApellidoPaterno: "",
    cApellidoMaterno: "",
    cDocumento: "",
    idConductor: "",
  };
  let header: BaseResponse;
  console.log(url);
  console.log(method);
  const httResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: params,
    headers: GetToken(),
  });
  console.log("desde el backend CONDUCTOR");
  let dataRes = httResponse.body?.data;
  console.log(dataRes)
  if (httResponse.body?.success === 1) {
    dataResponse = {
      cApellidoPaterno: dataRes.cApellidoPaterno,
      cApellidoMaterno: dataRes.cApellidoMaterno,
      cNombres: dataRes.cNombres,
      cDocumento: dataRes.cDocumento,
      idConductor: dataRes.idConductor,
      cNombreCompleto:
        dataRes.cNombres +
        " " +
        dataRes.cApellidoPaterno +
        " " +
        dataRes.cApellidoMaterno,
    };
  }
  console.log(dataResponse);
  header = {
    code: httResponse?.statusCode,
    success: httResponse?.body?.success,
    message: httResponse.body?.message,
    errors: httResponse.body?.errors,
  };
  return {
    header,
    data: dataResponse,
  };
}
