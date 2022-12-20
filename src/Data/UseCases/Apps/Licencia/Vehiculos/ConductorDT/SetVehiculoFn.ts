import { IConductorDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { VehiculoResponseData } from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function setVehiculoFn(
  url: string,
  method: string,
  params: IConductorDT.RequestVehiculo
): Promise<IConductorDT.ResponseVehiculo> {
  let ResponseVeh: VehiculoResponseData = {
    cPlaca:"",
    idVehiculo:""
  };
  console.log("PARAMETROS VEHICULOS")
  console.log(params)
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
    body: params,
  });
  console.log("desde el backend VEHICULO")
  console.log(httpResponse)
  const datosRespuesta = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    ResponseVeh = {
      cPlaca: datosRespuesta.cPlaca,
      idVehiculo: datosRespuesta.idVehiculo,
    };
  }

  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: ResponseVeh,
  };
}
