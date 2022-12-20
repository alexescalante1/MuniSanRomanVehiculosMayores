import { BaseResponse } from "../../../Base";

export type DTEmpresasRequest = {
  cParams: string;
};

export type DTEmpresasResponse = {
  header: BaseResponse;
  data: DataDTEmpresasResponse[];
};

export type DataDTEmpresasResponse = {
  cCelular: String;
  cDireccion: String;
  cDocumento: String;
  cEmail: String;
  cNombreComercial: String;
  cRazonSocial: String;
  dFechaModificacion: Date;
  idAutorizacion: Number;
  idEmpresa: Number;
  lEstado: Boolean;
  nResolucion: Number;
};

export type EmpresaRequest = {
  idAutorizacion: string;
  cDocumento: string;
  cNombreComercial: string;
  cRazonSocial: string;
  cDireccion: string;
  cCelular: string;
  cEmail: string;
};

export type EmpresaResponseAutor = {
  cResolucion: string;
  cServicio: string;
  idAutorizacion: string;
};

export type EmpresaAutoResponse = {
  header: BaseResponse;
  data: EmpresaResponseAutor;
};

export type lsVehiculos = {
  cAnio: string;
  cDescripcion: string;
  cMarca: string;
  cModelo: string;
  cPlaca: string;
  cPropietario: string;
};
///RENOVAR AUTORIZACION
export type DTEmpresaResponseId = {
  cRecorridoIda: string;
  cRecorridoRetorno: string;

  cHorario: string;
  cPlacas: string;
  cDireccion: string;
  idServicio: string;
  cNombreComercial: string;
  cNumVehiculos: string;
  cRUC: string;
  idClaseResolucion: string;
  cRazonSocial: string;
  cRepresentante: string;
  cServicio: string;
  cTipoResolucion: string;
  dFechaRegistro: string;
  dFinalVigencia: string;
  idEmpresa: string;
  lstVehiculos: lsVehiculos[]; //FALTA COORDINAR
  nResolucion: string;
};
export type EmpresaResponseId = {
  header: BaseResponse;
  data: DTEmpresaResponseId;
};
