import {
  DTAuthorizationResponse,
  DTAuthorizationRequest,
  DataDTAuthorizationResponse,
  AutorizacionResponse,
  GerenteResponseGet,
  ConsultarReniecResponse,
  GerenteRequestData,
  GerenteResponsePost,
  AutoriUpdateDataResponse,
  AutoriUpdateResponse,
  SunatResponse,
  ReniecUsResponse,
} from "../../../../../Models/Apps/Licencias";
import { AutorizationRequest } from "../../../../../Models/Apps/Licencias";
import { AutorizationRequestPut } from "../../../../../Models/Apps/Licencias";

export interface IAutorizacionDT {
  GetAllAutorizacion: (
    body: IAutorizacionDT.GetAllAutorizacionRequest
  ) => Promise<IAutorizacionDT.GetAllAutorizacionResponse>;

  SetAutorizacionRegistrar: (
    body: IAutorizacionDT.SetAutorizacionRegistrarRequest
  ) => Promise<AutorizacionResponse>;

  SetAutorizacionEditar: (
    body: IAutorizacionDT.SetAutorizacionEditarFnRequest
  ) => Promise<AutorizacionResponse>;

  GetAutorizacionFn: () => Promise<AutorizacionResponse>;

  GetGerente: () => Promise<IAutorizacionDT.GetGerenteResponse>;

  GetReniec: () => Promise<ConsultarReniecResponse>;

  setRepresentante: (
    body: IAutorizacionDT.SetGerenteRequest
  ) => Promise<GerenteResponsePost>;

  UpdateRenovacion: (
    param: AutoriUpdateDataResponse
  ) => Promise<AutoriUpdateResponse>;

  GetSunat: () => Promise<SunatResponse>;

  GetReniecUs: () => Promise<ReniecUsResponse>;
}

export namespace IAutorizacionDT {
  export type DataDTAuthorization = DataDTAuthorizationResponse;
  export type GetAllAutorizacionRequest = DTAuthorizationRequest;
  export type GetAllAutorizacionResponse = DTAuthorizationResponse;

  export type SetAutorizacionRegistrarRequest = AutorizationRequest;

  export type SetAutorizacionEditarFnRequest = AutorizationRequestPut;

  export type GetGerenteResponse = GerenteResponseGet;
  export type SetGerenteRequest = GerenteRequestData;
}
