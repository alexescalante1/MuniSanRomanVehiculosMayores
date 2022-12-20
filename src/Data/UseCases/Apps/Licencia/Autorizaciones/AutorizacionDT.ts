import { IAutorizacionDT } from "../../../../../Domain/Interfaces/Aplication/Apps";
import { GetAllAutorizacionFn } from "./AutorizacionDT/GetAllAutorizacionFn";
import { SetAutorizacionRegistrarFn } from "./AutorizacionDT/SetAutorizacionRegistrarFn";
import { SetAutorizacionEditarFn } from "./AutorizacionDT/SetAutorizacionEditarFn";
import { getAutorizacionFn } from "./AutorizacionDT/GetAutorizacionFn";
import {
  AutoriUpdateDataResponse,
  AutoriUpdateResponse,
  AutorizacionResponse,
  ConsultarReniecResponse,
  GerenteRequestData,
  GerenteResponseGet,
  GerenteResponsePost,
  ReniecUsResponse,
  SunatResponse,
} from "../../../../../Domain/Models/Apps/Licencias";
import { getGerenteFn } from "./AutorizacionDT/GetGerenteFn";
import { getReniecFn } from "./AutorizacionDT/GetReniecFn";
import { setGerenteFn } from "./AutorizacionDT/SetGerenteFn";
import { updateAutorizacionFn } from "./AutorizacionDT/UpdateAutorizacionFn";
import { getSunatFn } from "./AutorizacionDT/GetSunatFn";
import { GetReniecUsFn } from "./AutorizacionDT/GetReniecUsFn";

export class AutorizacionDT implements IAutorizacionDT {
  constructor(private readonly url: string, private readonly method: string) {}

  async GetReniecUs(): Promise<ReniecUsResponse> {
    return await GetReniecUsFn(this.url, this.method);
  }

  async GetAllAutorizacion(
    body: IAutorizacionDT.GetAllAutorizacionRequest
  ): Promise<IAutorizacionDT.GetAllAutorizacionResponse> {
    return await GetAllAutorizacionFn(this.url, this.method, body);
  }

  async SetAutorizacionRegistrar(
    params: IAutorizacionDT.SetAutorizacionRegistrarRequest
  ): Promise<AutorizacionResponse> {
    return await SetAutorizacionRegistrarFn(this.url, this.method, params);
  }

  async SetAutorizacionEditar(
    params: IAutorizacionDT.SetAutorizacionEditarFnRequest
  ): Promise<AutorizacionResponse> {
    return await SetAutorizacionEditarFn(this.url, this.method, params);
  }

  async GetAutorizacionFn(): Promise<AutorizacionResponse> {
    return await getAutorizacionFn(this.url, this.method);
  }

  async GetGerente(): Promise<GerenteResponseGet> {
    return await getGerenteFn(this.url, this.method);
  }

  async GetReniec(): Promise<ConsultarReniecResponse> {
    return await getReniecFn(this.url);
  }

  async setRepresentante(
    body: GerenteRequestData
  ): Promise<GerenteResponsePost> {
    return await setGerenteFn(this.url, this.method, body);
  }

  async UpdateRenovacion(
    param: AutoriUpdateDataResponse
  ): Promise<AutoriUpdateResponse> {
    return await updateAutorizacionFn(this.url, this.method, param);
  }

  async GetSunat(): Promise<SunatResponse> {
    return await getSunatFn(this.url, this.method);
  }
}
