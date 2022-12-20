import { BaseResponse } from "./BaseResponse";

export type AuthRequest = {
  cUser: string;
  cPassword: string;
};

export type AuthResponse = {
  header: BaseResponse;
  data: DataAuthResponse;
};

export type DataAuthResponse = {
  cPrimerNombre: string;
  cSegundoNombre: string;
  lEstado: boolean;
};