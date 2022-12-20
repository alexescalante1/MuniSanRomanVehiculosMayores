import { type } from "os";
import {
  DTRutasResponse,
  DTRutasOneRequest,
  DTRutasAllResponse,
  DTRutasInsertRequest,
  DTRutasEditRequest,
  AuthLineRouters,
  LIST_ROUTERS_STRUCT,
  ROUTER_STRUCT,
  PARTIAL_POINTS_STRUCT,
  POINTS_XY,
  ROUTER_PROPERTIES_STRUCT,
} from "../../../../../Models/Apps/Licencias";

export interface IRutasDT {
  GetAllRutas: () => Promise<IRutasDT.GetAllRutasResponse>;

  GetRuta: (
    params: IRutasDT.GetRutaRequest
  ) => Promise<IRutasDT.GetRutaResponse>;

  SetRutaRegistrar: (
    body: IRutasDT.SetRutaRegistrarRequest
  ) => Promise<boolean>;

  SetRutaEditar: (
    body: IRutasDT.SetRutaEditarRequest
  ) => Promise<boolean>;

  ObtRutasRegistro: (
    Nombr: string,
    Color: string,
    Coordenadas: IRutasDT.E_POINTS_XY[]
  ) => Promise<IRutasDT.E_ROUTER_STRUCT>;
}

export namespace IRutasDT {
  export type DTAuthLineRouters = AuthLineRouters;

  export type GetAllRutasResponse = DTRutasAllResponse;

  export type GetRutaRequest = DTRutasOneRequest;
  export type GetRutaResponse = DTRutasResponse;

  export type SetRutaRegistrarRequest = DTRutasInsertRequest;
  export type SetRutaEditarRequest = DTRutasEditRequest;

  //====================================
  // ESTRUCT
  //====================================

  export type E_LIST_ROUTERS_STRUCT = LIST_ROUTERS_STRUCT;
  export type E_ROUTER_STRUCT = ROUTER_STRUCT;
  export type E_PARTIAL_POINTS_STRUCT = PARTIAL_POINTS_STRUCT;
  export type E_POINTS_XY = POINTS_XY;
  export type E_ROUTER_PROPERTIES_STRUCT = ROUTER_PROPERTIES_STRUCT;
}
