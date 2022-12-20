import { BaseResponse } from "../../../Base";

export type GetConductorId = {
  cApellidoMaterno: string;
  cApellidoPaterno: string;
  cCelular: string;
  cDireccion: string;
  cDocumento: string;
  cEmail: string;
  cLicencia: string;
  cNombres: string;
  dFechaModificacion: string;
  dFinActividad: string;
  dIniActividad: string;
  idCategoria: string;
  idConductor: string;
  lEstado: string;
  lTipo: string;
  nGenero: string;
};
export type GetConductorIdResponse = {
  header: BaseResponse;
  data: GetConductorId;
};
