import { IConductorDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { PropietarioGetId } from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getPropietarioId(
  url: string,
  method: string
): Promise<IConductorDT.ResponsePropietarioId> {
  let dataPropietario: PropietarioGetId = {
    cApellidoPaterno: "",
    cApellidoMaterno: "",
    cCelular: "",
    cDocumento: "",
    idPropietario: "",
    cNombres: "",
    cNombreCompleto: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  const datosRespuesta = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    dataPropietario = {
      cNombreCompleto:
        datosRespuesta.cNombres +
        " " +
        datosRespuesta.cApellidoPaterno +
        " " +
        datosRespuesta.cApellidoMaterno,
      cNombres: datosRespuesta.cNombres,
      cApellidoMaterno: datosRespuesta.cApellidoMaterno,
      cApellidoPaterno: datosRespuesta.cApellidoPaterno,
      cCelular: datosRespuesta.cCelular,
      cDocumento: datosRespuesta.cDocumento,
      idPropietario: datosRespuesta.idPropietario,
    };
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataPropietario,
  };
}
