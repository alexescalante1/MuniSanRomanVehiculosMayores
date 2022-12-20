import {
  DTEmpresasResponse,
  DTEmpresasRequest,
  EmpresaRequest,
  DataDTEmpresasResponse,
  EmpresaAutoResponse,
  DTEmpresaResponseId,
  EmpresaResponseId,
} from "../../../../../Models/Apps/Licencias";
import { BaseResponse } from "../../../../../Models/Base";

export interface IEmpresaDT {
  GetAllEmpresas: (
    params: IEmpresaDT.GetAllEmpresasRequest
  ) => Promise<IEmpresaDT.GetAllEmpresasResponse>;

  GetEmpresa: () => Promise<IEmpresaDT.GetEmpresaResponse>;

  GetEmpresAutorizacion: () => Promise<IEmpresaDT.GetEmpresaResponseAuto>;
  //SetEmpresaEditar: () => Promise<IEmpresaDT.GetEmpresaResponse>;

  SetEmpresaRegistrar: (
    params: IEmpresaDT.GetEmpresaResponse
  ) => Promise<IEmpresaDT.SetEmpresaResponse>;

  GetEmpresaAutorizacionId: () => Promise<IEmpresaDT.GetEmpresaIdResponse>;
}

export namespace IEmpresaDT {
  export type GetDTDataEmpresas = DataDTEmpresasResponse;

  export type GetAllEmpresasRequest = DTEmpresasRequest;
  export type GetAllEmpresasResponse = DTEmpresasResponse;

  export type GetEmpresaResponse = EmpresaRequest;

  export type GetEmpresaResponseAuto = EmpresaAutoResponse;
  export type SetEmpresaResponse = BaseResponse;

  export type GetEmpresaIdResponse = EmpresaResponseId;
}
