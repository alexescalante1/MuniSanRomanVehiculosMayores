import { AuthResponse, AuthRequest } from "../../../Models/Base/LoginAuth";

export interface IInicializacionDT {
  GetLoginAuth : (body: IInicializacionDT.GetLoginAuthRequest) => Promise<IInicializacionDT.GetLoginAuthResponse>;
  GetInitConfig : (url2: string, method2: string) => Promise<boolean>;
}

export namespace IInicializacionDT {
  export type GetLoginAuthRequest = AuthRequest;
  export type GetLoginAuthResponse = AuthResponse;

  export type GetInitConfigResponse = boolean;
}