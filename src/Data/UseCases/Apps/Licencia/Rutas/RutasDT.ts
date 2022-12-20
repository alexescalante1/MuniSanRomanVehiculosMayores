import { IRutasDT } from "../../../../../Domain/Interfaces/Aplication/Apps";
import { GetAllRutasFn } from "./RutasDT/GetAllRutasFn";
import { GetRutaFn } from "./RutasDT/GetRutaFn";
import { SetRutaRegistrarFn } from "./RutasDT/SetRutaRegistrarFn";
import { SetRutaEditarFn } from "./RutasDT/SetRutaEditarFn";
import { ObtRutasRegistroFn } from "./RutasDT/ObtRutasRegistroFn";

export class RutasDT implements IRutasDT {
  constructor(private readonly url: string, private readonly method: string) {}

  async GetAllRutas(): Promise<IRutasDT.GetAllRutasResponse> {
    return await GetAllRutasFn(this.url, this.method);
  }

  async GetRuta(
    params: IRutasDT.GetRutaRequest
  ): Promise<IRutasDT.GetRutaResponse> {
    return await GetRutaFn(this.url + params.cParams, this.method);
  }

  async SetRutaRegistrar(
    body: IRutasDT.SetRutaRegistrarRequest
  ): Promise<boolean> {
    return await SetRutaRegistrarFn(this.url, this.method, body);
  }

  async SetRutaEditar(
    body: IRutasDT.SetRutaEditarRequest
  ): Promise<boolean> {
    return await SetRutaEditarFn(this.url, this.method, body);
  }

  async ObtRutasRegistro(
    Nombr: string,
    Color: string,
    Coordenadas: IRutasDT.E_POINTS_XY[]
  ): Promise<IRutasDT.E_ROUTER_STRUCT> {
    return await ObtRutasRegistroFn(Nombr, Color, Coordenadas);
  }
}
