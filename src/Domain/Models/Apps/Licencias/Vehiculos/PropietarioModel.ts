import { BaseResponse } from "../../../Base";

export type PropietarioRequest = {
  cDocumento: string;
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  cCelular: string;
};
export type PropietarioResponseData = {
  cNombres: string;
  idPropietario:string;
  cNombreCompleto:string;
};
export type PropietarioResponse = {
  header: BaseResponse;
  data: PropietarioResponseData;
};
