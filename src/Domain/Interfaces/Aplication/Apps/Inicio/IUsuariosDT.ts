import {
  GetOnlyUsuario,
  DataDTUsuarioRegResponse,
  GetAllUsuariosRegResponse,
  GetOnlyUsuariosResponse,
  SetUserEdit,
  UserRegister,
} from "../../../../Models/Apps/Configuraciones/Usuarios/UsuarioModels";

export interface IUsuariosDT {
  GetAllUsuarios: () => Promise<IUsuariosDT.GetAllUsuariosResponse>;
  GetUsuario: () => Promise<IUsuariosDT.GetUsuarioResponse>;
  EditUsuario: (body: IUsuariosDT.SetUsuarioEditRequest) => Promise<any>;
  RegUsuario: (body: IUsuariosDT.SetRegUsuarioRequest) => Promise<any>;
}

export namespace IUsuariosDT {
  export type GetAllUsuariosResponse = GetAllUsuariosRegResponse;
  export type GetOnlyUsuarioIUser = GetOnlyUsuario;

  export type GetUsuarioResponse = GetOnlyUsuariosResponse;

  export type SetUsuarioEditRequest = SetUserEdit;
  export type SetRegUsuarioRequest = UserRegister;

  export type GetAllUsuarioRegistradosResponse = GetAllUsuariosRegResponse;
  export type GetAllUserResponse = DataDTUsuarioRegResponse;
}
