import { IUsuariosDT } from "../../../../Domain/Interfaces/Aplication/Apps/Inicio";
import { GetUsuarioFn } from "./UsuarioDT/GetUsuarioFn";
import { SetEditUsuarioFn } from "./UsuarioDT/SetEditUsuarioFn";
import { PostUsuario } from "./UsuarioDT/PostUsuario";
import { GetAllUsuariosRegistradosFn } from "./UsuarioDT/GetAllUsuariosRegistradosFn";

export class UsuariosDT implements IUsuariosDT {
  constructor(private readonly url: string, private readonly method: string) {}

  async GetAllUsuarios(): Promise<IUsuariosDT.GetAllUsuariosResponse> {
    return await GetAllUsuariosRegistradosFn(this.url, this.method);
  }

  async GetUsuario(): Promise<IUsuariosDT.GetUsuarioResponse> {
    return await GetUsuarioFn(this.url, this.method);
  }

  async EditUsuario(body: IUsuariosDT.SetUsuarioEditRequest): Promise<any> {
    console.log("BODY OWO", body);
    return await SetEditUsuarioFn(this.url, this.method, body);
  }

  async RegUsuario(body: IUsuariosDT.SetRegUsuarioRequest): Promise<any> {
    return PostUsuario(this.url, this.method, body);
  }
}
