import {
  GetVehiculoIdResponse,
  VehiculoGetRequest,
  VehiculoResponseGetId,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getVehiculoIdFn(
  url: string,
  method: string
): Promise<VehiculoResponseGetId> {
  console.log("BACKEND GET VEHICULO");
  console.log(url);
  console.log(method);
  let responseVehiculo: VehiculoGetRequest = {
    idEmpresa: "",
    idConductor: "",
    idPropietario: "",
    idClasificacionAutorizacion: "",
    cCodigo: "",
    cMarca: "",
    cModelo: "",
    cPlacaAnterior: "",
    cPlacaActual: "",
    nNumeroMotor: "",
    cColor: "",
    nAsientos: "",
    nAnioFabricacion: "",
    nPeso: "",
    cClase: "",
    idVehiculo: "",
  };
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log(httpResponse);
  const datosRespuesta = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    responseVehiculo = {
      idEmpresa: datosRespuesta.idEmpresa,
      idConductor: datosRespuesta.idConductor,
      idPropietario: datosRespuesta.idPropietario,
      idClasificacionAutorizacion: datosRespuesta.idAuthorizacionClasificcion,
      cCodigo: datosRespuesta.cCodigo,
      cMarca: datosRespuesta.cMarca,
      cModelo: datosRespuesta.cModelo,
      cPlacaAnterior: datosRespuesta.cPlacaAnterior,
      cPlacaActual: datosRespuesta.cPlacaActual,
      nNumeroMotor: datosRespuesta.nNumeroMotor,
      cColor: datosRespuesta.cColor,
      nAsientos: datosRespuesta.nAsientos,
      nAnioFabricacion: datosRespuesta.nAnioFabricacion,
      nPeso: datosRespuesta.nPeso,
      cClase: datosRespuesta.cClase,
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
    data: responseVehiculo,
  };
}
