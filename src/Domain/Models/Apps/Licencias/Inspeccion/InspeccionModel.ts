import { BaseResponse } from "../../../Base";

export type GetAllInspeccion = {
  cConductor: string;
  cDescripcion: string;
  cPlaca: string;
  dVigencia: string;
  idCertificado: string;
  idEstado: string;
  nCertificado: string;
};
export type GetAllInspeccionResponse = {
  header: BaseResponse;
  data: GetAllInspeccion[];
};
export type PrintInspeccionRequest = {
  idCertificado: string;
  cLugarInspeccion: string;
};

export type PrintInspeccionResponseData = {
  cCodigoVehiculo: string;
  cDepartamento: string;
  cDetalleVehiculo: string;
  cDireccionPropietario: string;
  cDistrito: string;
  cEmpresa: string;
  cLicenciaCategoriaConductor: string;
  cLugar: string;
  cNomCompletoConductor: string;
  cNomCompletoPropietario: string;
  cNomCompletoRepresentante: string;
  cPlacaVehiculo: string;
  cProvincia: string;
  cServicioVehiculo: string;
  dFecha: string;
  nCertificado: string;
  nDniConductor: string;
  nDniPropietario: string;
  nDniRepresentante: string;
  nNumCelularPropietario: string;
  nNumLicenciaConductor: string;
  nRuc: string;
};
export type PrintInspeccionResponse = {
  header: BaseResponse;
  data: PrintInspeccionResponseData[];
};

//-------------------------
// GET- INSPECCION YEAR
//-------------------------
export type GetInspeccionYearData = {
  cDescripcion: string;
  id: string;
};
export type GetInspeccionYearResponse = {
  header: BaseResponse;
  data: GetInspeccionYearData[];
};
//-------------------------
// PRINT ALL INSPECTION
//------------------------
export type PrintAllInspectionRequest = {
  nTipo: string;
  cBusqueda: string;
  cLugarInspeccion: string;
};

export type PrintAllInspectionResponse = {
  header: BaseResponse;
  data: PrintInspeccionResponseData[];
};

//-------------------------
// CAMBIAR ESTADO
//------------------------
export type UpdateEstadoRequest = {
  idEstado: string;
  cDescripcion: string;
};
export type UpdateEstadoData = {
  cJson: string;
  idCertificado: string;
  idEstado: string;
};

export type UpdateEstadoResponse = {
  header: BaseResponse;
  data: UpdateEstadoData;
};
