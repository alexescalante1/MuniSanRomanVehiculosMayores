import { IResponsabilidadesDT } from "../../../../../Domain/Interfaces/Aplication/Apps";
import { GetConductorIdResponse } from "../../../../../Domain/Models/Apps/Licencias";
import { getConductorIdResponsabilidadesFn } from "./ResponsabilidadesDT/GetVehiculoIdRespFn";

export class ResponsabilidadesDT implements IResponsabilidadesDT {
  constructor(private readonly url: string, private readonly method: string) {}
  async GetConductorId(): Promise<GetConductorIdResponse> {
    return await getConductorIdResponsabilidadesFn(this.url, this.method);
  }
}
