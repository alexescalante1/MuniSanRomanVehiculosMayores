import { AutorizacionDT } from "../../../../Data/UseCases/Apps";
import { ApiContextRequest } from "../../../../Main/Context";
import { Alertas } from "../Alertas/Alertas";

export async function ObtenerDatosEmpresa() {
  const Access = ApiContextRequest("14");
  if (Access.cPath !== "ErrorDeAcceso") {
    try {
      const data = await new AutorizacionDT(
        Access.cPath,
        Access.cMethod
      ).GetAllAutorizacion({
        cParams: "",
      });
      if (data?.header?.success) {
        //console.log(data);
        return data?.data;
      } else {
        Alertas("error", data?.header?.message);
      }
    } catch (e) {
      Alertas("error", "Error ");
      return false;
    }
  }
}
