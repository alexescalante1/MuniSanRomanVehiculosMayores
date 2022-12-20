import { BaseResponse } from "../../../Base";

export type DTAuthorizationRequest = {
  cParams: string;
};

export type DTAuthorizationResponse = {
  header: BaseResponse;
  data: DataDTAuthorizationResponse[];
};

export type DataDTAuthorizationResponse = {
  cFlota: string;
  cNombre: string;
  cRazonSocial: string;
  cResolucion: string;
  cRucEmpresa: string;
  dFinalVigencia: Date;
  idAutorizacion: string;
  idEmpresa: string;
};

export type AutorizationRequest = {
  cRucEmpresa: string;
  idRepresentante: string;
  cRazonSocial: string;
  cNombreComercial: string;
  cDireccion: string;
  cCelular: string;
  cResolucion: string;
  idServicio: string;
  idClaseResolucion: string;
  cHorario: string;
  cPlacas: string;
  nFlota: string;
  dInicioVigecia: string;
  dFinalVigencia: string;
  cRecorridoIda: string;
  cRecorridoRetorno: string;
};
export type AutorizationRequestPut = {
  cClaseAutorizacion: string;
  cHorario: string;
  cPlacas: string;
  cRecorridoIda: string;
  cRecorridoRetorno: string;
  cResolucion: string;
  cRucEmpresa: string;
  nVehiculos: string;
  dInicioVigecia: string;
  dFinalVigencia: string;
  lEstado: string;
  idServicio: string;
  idAutorizacion: string;
};
export type AutorizacionResponsePut = {
  header: BaseResponse;
  data: AutorizationRequestPut;
};

export type AutorizacionResponse = {
  header: BaseResponse;
};

//GERENTE
export type GerenteResponseData = {
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  cNombres: string;
  cDocumento: string;
  idRepresentante: string;
};
export type GerenteResponseGet = {
  header: BaseResponse;
  data: GerenteResponseData;
};

export type GerenteRequestData = {
  cDocumento: string;
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  nGenero: string;
  cDireccion: string;
  cEmail: string;
  cCelular: string;
};
export type GerenteResponseSet = {
  idRepresentante: string;
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  cDocumento: string;
};

export type GerenteResponsePost = {
  header: BaseResponse;
  data: GerenteResponseSet;
};

export type ConsultarReniecResponseData = {
  cDocumento: string;
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
};
export type ConsultarReniecResponse = {
  header: BaseResponse;
  data: ConsultarReniecResponseData;
};
//----------------------
//  RENOVACION AUTORIZACION
//----------------------
export type AutoriUpdateRequest = {
  idEmpresa: string;
  cResolucion: string;
  idServicio: string;
  idClaseResolucion: string;
  cHorario: string;
  cPlacas: string;
  nFlota: string;
  dInicioVigecia: string;
  dFinalVigencia: string;
  cRecorridoIda: string;
  cRecorridoRetorno: string;
};
export type AutoriUpdateDataResponse = {
  idEmpresa: string;
  cResolucion: string;
  idServicio: string;
  idClaseResolucion: string;
  cHorario: string;
  cPlacas: string;
  nFlota: string;
  dInicioVigecia: string;
  dFinalVigencia: string;
  cRecorridoIda: string;
  cRecorridoRetorno: string;
};
export type AutoriUpdateResponse = {
  header: BaseResponse;
  //data: AutoriUpdateDataResponse;
};

//----------------------
//  CONSULTAR SUNAT
//----------------------

export type SunatResponseData = {
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  direccion: string;
  estado: string;
};
export type SunatResponse = {
  header: BaseResponse;
  data: SunatResponseData;
};

//-------------------------
//  CONSULTAR RENIEC(SERVIDOR)
//-------------------------
export type ReniecUsResponseData = {
  cApellidoMaterno: string;
  cApellidoPaterno: string;
  cDireccion: string;
  cDni: string;
  cEmail: string;
  cNombres: string;
  cTelefono: string;
  nGenero: string;
};
export type ReniecUsResponse = {
  header: BaseResponse;
  data: ReniecUsResponseData;
};
