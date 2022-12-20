import {
  ConductorGetAllResponse,
  ConductorGetIdResponse,
  ConductorRequest,
  ConductorResponse,
  GetVehiculoIdResponse,
  PropietarioGetIdResponse,
  SunarpResponse,
  VehiculoRequest,
  VehiculoResponse,
  VehiculoUpdateResponse,
  VehiculoUpodateRequest,
} from "../../../../../Models/Apps/Licencias";
import {
  PropietarioRequest,
  PropietarioResponse,
} from "../../../../../Models/Apps/Licencias/Vehiculos/PropietarioModel";

export interface IConductorDT {
  SetConductor: (
    params: IConductorDT.RequestEmpresa
  ) => Promise<IConductorDT.ResponseConductor>;

  //GetConductor: () => Promise<IConductorDT.ResponseGetAllConductor>;

  GetPropietarioId: () => Promise<IConductorDT.ResponsePropietarioId>;

  GetConductorId: () => Promise<IConductorDT.ResponseConductorId>;

  SetVehiculo: (
    params: IConductorDT.RequestVehiculo
  ) => Promise<IConductorDT.ResponseVehiculo>;

  SetPropietario: (
    params: IConductorDT.RequestPropietario
  ) => Promise<IConductorDT.ResponsePropietario>;

  GetSunarpGet: () => Promise<SunarpResponse>;
  GetVehiculoId: () => Promise<GetVehiculoIdResponse>;
  UpdateVehiculo: (
    params: VehiculoUpodateRequest
  ) => Promise<VehiculoUpdateResponse>;
}

export namespace IConductorDT {
  export type RequestEmpresa = ConductorRequest;
  export type ResponseConductor = ConductorResponse;

  export type ResponseGetAllConductor = ConductorGetAllResponse;

  export type ResponsePropietarioId = PropietarioGetIdResponse;
  export type ResponseConductorId = ConductorGetIdResponse;

  export type RequestVehiculo = VehiculoRequest;
  export type ResponseVehiculo = VehiculoResponse;

  export type RequestPropietario = PropietarioRequest;
  export type ResponsePropietario = PropietarioResponse;
}
