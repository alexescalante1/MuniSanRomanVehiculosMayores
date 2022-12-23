import { BaseResponse } from "../../../Base";

export type VehiculoRequest = {
  idEmpresa: string;
  idConductor: string;
  idPropietario: string;
  idClasificacionAutorizacion: string;
  cCodigo: string;
  cMarca: string;
  cModelo: string;
  cPlacaAnterior: string;
  cPlacaActual: string;
  nNumeroMotor: string;
  cColor: string;
  nAsientos: string;
  nAnioFabricacion: string;
  nPeso: string;
  cClase: string;
  idModalidaIngreso: string;
};
export type VehiculoGetRequest = {
  idVehiculo: string;
  idEmpresa: string;
  idConductor: string;
  idPropietario: string;
  idClasificacionAutorizacion: string;
  cCodigo: string;
  cMarca: string;
  cModelo: string;
  cPlacaAnterior: string;
  cPlacaActual: string;
  nNumeroMotor: string;
  cColor: string;
  nAsientos: string;
  nAnioFabricacion: string;
  nPeso: string;
  cClase: string;
  idModalidaIngreso: string;
};
export type VehiculoResponseData = {
  cPlaca: string;
  idVehiculo: string;
};
export type VehiculoResponse = {
  header: BaseResponse;
  data: VehiculoResponseData;
};
export type VehiculoResponseGetId = {
  header: BaseResponse;
  data: VehiculoGetRequest;
};
//-------------------------
//  ACTUALIAR VEHICULO
//--------------------------
export type VehiculoUpodateRequest = {
  idVehiculo: string;
  idEmpresa: string;
  idConductor: string;
  idPropietario: string;
  idClasificacionAutorizacion: string;
  cCodigo: string;
  cMarca: string;
  cModelo: string;
  cPlacaAnterior: string;
  cPlacaActual: string;
  nNumeroMotor: string;
  cColor: string;
  nAsientos: string;
  nAnioFabricacion: string;
  nPeso: string;
  cClase: string;
  lEstado: boolean;
};
export type VehiculoUpdateResponse = {
  header: BaseResponse;
};

//-------------------------
//  OBTENER SUNARP DATOS
//--------------------------
export type SunarpDataResponse = {
  cClase: string;
  cColor: string;
  cMarca: string;
  cModelo: string;
  cMotor: string;
  cPlaca: string;
  cSerie: string;
  nAnio: string;
  nAsiento: string;
  nPeso: string;
  cPlacaAnt: string;
};

export type SunarpResponse = {
  header: BaseResponse;
  data: SunarpDataResponse;
};

//-------------------------
//  OBTENER VEHICULO ID
//--------------------------
export type GetVehiculoIdResponse = {
  header: BaseResponse;
  data: VehiculoRequest;
};
