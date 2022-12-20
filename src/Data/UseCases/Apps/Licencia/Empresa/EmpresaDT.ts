import { IEmpresaDT } from "../../../../../Domain/Interfaces/Aplication/Apps";
import { GetAllEmpresasFn } from "./EmpresaDT/GetAllEmpresasFn";
import { GetEmpresaFn } from "./EmpresaDT/GetEmpresaFn";
import { SetEmpresaRegistrarFn } from "./EmpresaDT/SetEmpresaRegistrarFn";
import { SetEmpresaEditarFn } from "./EmpresaDT/SetEmpresaEditarFn";
import {
  EmpresaAutoResponse,
  EmpresaResponseId,
} from "../../../../../Domain/Models/Apps/Licencias";
import { GetEmpresaAFn } from "./EmpresaDT/GetEmpresaAFn";
import { getEmpresaAutoFn } from "./EmpresaDT/GetEmpresaAutoIdFn";

export class EmpresaDT implements IEmpresaDT {
  constructor(private readonly url: string, private readonly method: string) {}

  async GetAllEmpresas(
    body: IEmpresaDT.GetAllEmpresasRequest
  ): Promise<IEmpresaDT.GetAllEmpresasResponse> {
    return await GetAllEmpresasFn(this.url, this.method, body);
  }

  async GetEmpresa(): Promise<IEmpresaDT.GetEmpresaResponse> {
    return await GetEmpresaFn(this.url, this.method);
  }

  async GetEmpresAutorizacion(): Promise<EmpresaAutoResponse> {
    return await GetEmpresaAFn(this.url, this.method);
  }

  async SetEmpresaRegistrar(
    params: IEmpresaDT.GetEmpresaResponse
  ): Promise<IEmpresaDT.SetEmpresaResponse> {
    return await SetEmpresaRegistrarFn(this.url, this.method, params);
  }

  async GetEmpresaAutorizacionId(): Promise<EmpresaResponseId> {
    return await getEmpresaAutoFn(this.url, this.method);
  }

  //   async SetEmpresaEditar(
  //     params: IAutorizacionDT.SetAutorizacionEditarFnRequest
  //   ): Promise<boolean> {
  //     return await SetEmpresaEditarFn(this.url, this.method, params);
  //   }
}
