import {
  GetAllInspeccionResponse,
  GetInspeccionYearResponse,
  PrintAllInspectionRequest,
  PrintAllInspectionResponse,
  PrintInspeccionRequest,
  PrintInspeccionResponse,
  UpdateEstadoData,
  UpdateEstadoRequest,
  UpdateEstadoResponse,
} from "../../../../../Models/Apps/Licencias/Inspeccion/InspeccionModel";

export interface IInspeccionDT {
  GetAllInspeccion: () => Promise<GetAllInspeccionResponse>;
  PrintCertificado: (
    params: PrintInspeccionRequest
  ) => Promise<PrintInspeccionResponse>;
  GetInspeccionYear: () => Promise<GetInspeccionYearResponse>;

  PrintAllCertificado: (
    params: PrintAllInspectionRequest
  ) => Promise<PrintAllInspectionResponse>;

  PutEstadoVehiculo: (
    params: UpdateEstadoRequest
  ) => Promise<UpdateEstadoResponse>;
}
