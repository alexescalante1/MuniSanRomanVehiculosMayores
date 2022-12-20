import { GetConductorIdResponse } from "../../../../../Models/Apps/Licencias";

export interface IResponsabilidadesDT{
    GetConductorId: ()=> Promise<GetConductorIdResponse>;
}