import { IInspeccionDT } from "../../../../../Domain/Interfaces/Aplication/Apps/Licencias/Inspeccion/IInspeccionDT";
import {
  GetAllInspeccionResponse,
  GetInspeccionYearResponse,
  PrintAllInspectionRequest,
  PrintAllInspectionResponse,
  PrintInspeccionRequest,
  PrintInspeccionResponse,
  UpdateEstadoRequest,
  UpdateEstadoResponse,
} from "../../../../../Domain/Models/Apps/Licencias/Inspeccion/InspeccionModel";
import { BaseResponse } from "../../../../../Domain/Models/Base";
import { getAllInspeccionFn } from "./InspeccionDT/GetAllInspeccionfn";
import { getInspeccionYearFn } from "./InspeccionDT/GetInspeccionYearFn";
import { printAllInspectionFn } from "./InspeccionDT/PrintAllInspectionFn";
import { printCertificadoFn } from "./InspeccionDT/PrintCertificadoFn";
import { putEstadoVehiculoFn } from "./InspeccionDT/PutEstadoVehiculoFn";

export class InspeccionDT implements IInspeccionDT {
  constructor(private url: string, private method: string) {}
  async GetAllInspeccion(): Promise<GetAllInspeccionResponse> {
    return await getAllInspeccionFn(this.url, this.method);
  }
  async PrintCertificado(
    params: PrintInspeccionRequest
  ): Promise<PrintInspeccionResponse> {
    return await printCertificadoFn(this.url, this.method, params);
  }

  async GetInspeccionYear(): Promise<GetInspeccionYearResponse> {
    return await getInspeccionYearFn(this.url, this.method);
  }

  async PrintAllCertificado(
    params: PrintAllInspectionRequest
  ): Promise<PrintAllInspectionResponse> {
    return await printAllInspectionFn(this.url, this.method, params);
  }

  async PutEstadoVehiculo(
    params: UpdateEstadoRequest
  ): Promise<UpdateEstadoResponse> {
    return await putEstadoVehiculoFn(this.url, this.method, params);
  }
}
