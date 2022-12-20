import { IConductorDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { PropietarioResponseData } from "../../../../../../Domain/Models/Apps/Licencias/Vehiculos/PropietarioModel";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function setPropietarioFn(
  url: string,
  method: string,
  params: IConductorDT.RequestPropietario
): Promise<IConductorDT.ResponsePropietario> {
  let dataPropietario: PropietarioResponseData = {
    cNombres: "",
    idPropietario: "",
    cNombreCompleto: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: params,
    headers: GetToken(),
  });
  console.log("DESDE REGISTRAR PROPIETARIO BACKEND");
  console.log(httpResponse);
  const datosRespuesta = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    dataPropietario = {
      cNombres: datosRespuesta.cNombres,
      cNombreCompleto:
        datosRespuesta.cApellidoPaterno + " " + datosRespuesta.cApellidoMaterno,
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
