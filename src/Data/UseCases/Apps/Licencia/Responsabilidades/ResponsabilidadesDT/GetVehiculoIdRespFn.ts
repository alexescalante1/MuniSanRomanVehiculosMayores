import {
  GetConductorId,
  GetConductorIdResponse,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getConductorIdResponsabilidadesFn(
  url: string,
  method: string
): Promise<GetConductorIdResponse> {
  let datosGetResponse: GetConductorId = {
    cApellidoMaterno: "",
    cApellidoPaterno: "",
    cCelular: "",
    cDireccion: "",
    cDocumento: "",
    cEmail: "",
    cLicencia: "",
    cNombres: "",
    dFechaModificacion: "",
    dFinActividad: "",
    dIniActividad: "",
    idCategoria: "",
    idConductor: "",
    lEstado: "",
    lTipo: "",
    nGenero: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  let httpResponseData = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    datosGetResponse = {
      cApellidoMaterno: httpResponseData.cApellidoMaterno,
      cApellidoPaterno: httpResponseData.cApellidoPaterno,
      cCelular: httpResponseData.cCelular,
      cDireccion: httpResponseData.cDireccion,
      cDocumento: httpResponseData.cDocumento,
      cEmail: httpResponseData.cEmail,
      cLicencia: httpResponseData.cLicencia,
      cNombres: httpResponseData.cNombres,
      dFechaModificacion: httpResponseData.dFechaModificacion,
      dFinActividad: httpResponseData.dFinActividad,
      dIniActividad: httpResponseData.dIniActividad,
      idCategoria: httpResponseData.idCategoria,
      idConductor: httpResponseData.idConductor,
      lEstado: httpResponseData.lEstado,
      lTipo: httpResponseData.lTipo,
      nGenero: httpResponseData.nGenero,
    };
  }
  console.log(httpResponse);
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: datosGetResponse,
  };
}
