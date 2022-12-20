import { IConductorDT } from "../../../../../Domain/Interfaces/Aplication/Apps";
import {
  ConductorRequest,
  GetVehiculoIdResponse,
  SunarpResponse,
  VehiculoResponse,
  VehiculoUpdateResponse,
  VehiculoUpodateRequest,
} from "../../../../../Domain/Models/Apps/Licencias";
import { getConductorIdFn } from "./ConductorDT/GetConductorIdFn";
import { getPropietarioId } from "./ConductorDT/GetPropietarioIdFn";
import { getSunarpFn } from "./ConductorDT/GetSunarpFn";
import { getVehiculoIdFn } from "./ConductorDT/GetVehiculoIdFn";
import { setConductorFn } from "./ConductorDT/SetConductorFn";
import { setPropietarioFn } from "./ConductorDT/SetPropietarioFn";
import { setVehiculoFn } from "./ConductorDT/SetVehiculoFn";
import { updateVehiculoFn } from "./ConductorDT/UpdateVehiculoFn";

export class ConductorDT implements IConductorDT {
  constructor(private readonly url: string, private readonly method: string) {}

  async SetConductor(
    body: ConductorRequest
  ): Promise<IConductorDT.ResponseConductor> {
    return await setConductorFn(this.url, this.method, body);
  }

  // async GetConductor(): Promise<IConductorDT.ResponseGetAllConductor> {
  //   return await getConductorFn(this.url, this.method);
  // }

  async GetPropietarioId(): Promise<IConductorDT.ResponsePropietarioId> {
    return await getPropietarioId(this.url, this.method);
  }

  async GetConductorId(): Promise<IConductorDT.ResponseConductorId> {
    return await getConductorIdFn(this.url, this.method);
  }
  async SetVehiculo(
    params: IConductorDT.RequestVehiculo
  ): Promise<VehiculoResponse> {
    return await setVehiculoFn(this.url, this.method, params);
  }

  async SetPropietario(
    params: IConductorDT.RequestPropietario
  ): Promise<IConductorDT.ResponsePropietario> {
    return await setPropietarioFn(this.url, this.method, params);
  }

  async GetSunarpGet(): Promise<SunarpResponse> {
    return await getSunarpFn(this.url, this.method);
  }

  async GetVehiculoId(): Promise<GetVehiculoIdResponse> {
    return await getVehiculoIdFn(this.url, this.method);
  }

  async UpdateVehiculo(
    params: VehiculoUpodateRequest
  ): Promise<VehiculoUpdateResponse> {
    return await updateVehiculoFn(this.url, this.method, params);
  }
}
