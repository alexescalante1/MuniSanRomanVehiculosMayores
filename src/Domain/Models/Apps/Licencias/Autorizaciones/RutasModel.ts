import { BaseResponse } from "../../../Base";

export type DTRutasOneRequest = {
  cParams: string;
};

export type DTRutasInsertRequest = {
  idEmpresa: string;
  arrCoordenada: string;
};

export type DTRutasEditRequest = {
  arrCoordenada: string;
};

export type DTRutasResponse = {
  header: BaseResponse;
  data: AuthLineRouters;
};

export type DTRutasAllResponse = {
  header: BaseResponse;
  data: AuthLineRouters[];
};

export type AuthLineRouters = {
  arrCoordenada: string;
  cNombreComercial: string;
  cRucEmpresa: string;
  idAutorizacion: string;
  idEmpresa: string;
};

//=====================================
// ESTRUCTURA DE RUTAS
//=====================================

export type LIST_ROUTERS_STRUCT = {
  IdAutorizacion: string;
  Nombre: string;
  RazonSocial: string;
  ListRutas: ROUTER_STRUCT[];
};

export type ROUTER_STRUCT = {
  Nombre: string;
  Properties: ROUTER_PROPERTIES_STRUCT;
  GenPoints: POINTS_XY[];
  PartialPoints: PARTIAL_POINTS_STRUCT[];
};

export type PARTIAL_POINTS_STRUCT = {
  IdAutorizacion: string;
  Nombre: string;
  Properties: ROUTER_PROPERTIES_STRUCT;
  Points: POINTS_XY[];
};

export type ROUTER_PROPERTIES_STRUCT = {
  color: string;
  opacity: number;
  weight: number;
  stroke: boolean;
  fillRule: string;
  bubblingMouseEvents: boolean;
};


export type POINTS_XY = [POS_X: number, POS_Y: number];
