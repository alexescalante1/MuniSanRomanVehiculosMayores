import { BaseResponse } from "../../../../Base";

export type ConductorRequest = {
  cDocumento: string;
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  idCategoria: string;
  cLicencia: string;
  dIniActividad: string;
  dFinActividad: string;
};
export type lsVehiculosAutorizacion = {
  cConductor: string;
  cDescripcion: string;
  cMarca: string;
  cModelo: string;
  cPlaca: string;
  idVehiculo: string;
};

export type objEmpresa = {
  cCelular:string,
  cDireccion:string,
  cEmail:string,
  cNombreComercial:string,
  cNumVehiculos:string,
  cRUC:string,
  cRazonSocial:string,
  cTipoModalidad:string,
  dFinalVigencia:string,
  idEmpresa:string,
  nResolucion:string

}
export type ConductorGet = {
  objEmpresa: objEmpresa;
  lsVehiculos: lsVehiculosAutorizacion[];
};

export type ConductorResponse = {
  header: BaseResponse;
  data: ConductoGetId;
};

export type ConductorGetAllResponse = {
  heaher: BaseResponse;
  data: ConductorGet;
};
//PROPIETARIO ID
export type PropietarioGetIdResponse = {
  header: BaseResponse;
  data: PropietarioGetId;
};

export type PropietarioGetId = {
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  cCelular: string;
  cDocumento: string;
  idPropietario: string;
  cNombreCompleto: string;
};

//CONDUCTOR ID
export type ConductorGetIdResponse = {
  header: BaseResponse;
  data: ConductoGetId;
};
export type ConductoGetId = {
  cNombres: string;
  cApellidoPaterno: string;
  cApellidoMaterno: string;
  cDocumento: string;
  idConductor: string;
  cNombreCompleto: string;
};
