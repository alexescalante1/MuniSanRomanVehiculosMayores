import { IConductorDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { ConductoGetId } from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getConductorIdFn(
  url: string,
  method: string
): Promise<IConductorDT.ResponseConductorId> {
  let conductorData: ConductoGetId = {
    cNombres: "",
    cNombreCompleto: "",
    cApellidoPaterno: "",
    cApellidoMaterno: "",
    cDocumento: "",
    idConductor: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log("DESDE EL BACKEND CONDUCTOR")
  console.log(httpResponse)
  const dataResponse = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    conductorData = {
      cApellidoMaterno: dataResponse.cApellidoMaterno,
      cApellidoPaterno: dataResponse.cApellidoPaterno,
      cNombres: dataResponse.cNombres,
      cDocumento: dataResponse.cDocumento,
      idConductor: dataResponse.idConductor,
      cNombreCompleto:
        dataResponse.cNombres +
        " " +
        dataResponse.cApellidoPaterno +
        " " +
        dataResponse.cApellidoMaterno,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: conductorData,
  };
}
