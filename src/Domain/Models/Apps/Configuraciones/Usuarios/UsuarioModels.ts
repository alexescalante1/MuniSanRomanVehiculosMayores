import { BaseResponse } from "../../../Base";

export type GetAllUsuariosRegResponse = {
  header: BaseResponse;
  data: DataDTUsuarioRegResponse[];
};

export type GetOnlyUsuariosResponse = {
  header: BaseResponse;
  data: GetOnlyUsuario;
};

export type DataDTUsuarioRegResponse = {
  cCelular: string;
  cDocumento: string;
  cEmail: string;
  cNombreCompleto: string;
  idUsuario: string;
  lEstado: boolean;
};

export type UserRegister = {
  cDocumento:string,
  cNombres:string,
  cApellidos:string,
  cDireccion:string,
  cCelular:string,
  cEmail:string,
  nGenero:string,
  idRol:string,
  idCompany:string,
  cUser:string,
  cPassword:string,
  lstIdApp:string
}

export type GetOnlyUsuario = {
  cApellidos:string,
  cCelular: string,
  cDireccion:string,
  cDocumento:string,
  cEmail:string,
  cNombres:string,
  idRole:string,
  idUsuario:string,
  nGenero:string
}

export type SetUserEdit = {
  cApellidos: string,
  cCelular: string,
  cDireccion: string,
  cDocumento: string,
  cEmail: string,
  cNombres: string,
  lRecuperarUltimoPassword: boolean,
  cPasswordAnterior: string,
  cPasswordNuevo: string,
  idRol: string,
  estado: boolean
}