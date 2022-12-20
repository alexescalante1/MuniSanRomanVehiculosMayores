import { HttpStatusCode } from "../../Domain/Interfaces/Protocols/Http";
import { Alertas } from "../../presentation/Components";

export class AlertServerError {
  AlertStatusCode(statusCode: HttpStatusCode): void {
    switch (statusCode) {
      case HttpStatusCode.ok:
        //Alertas("success", "Code " + HttpStatusCode.ok + ": Success.");
        break;
      case HttpStatusCode.noContent:
        Alertas(
          "error",
          "Error " + HttpStatusCode.noContent + ": Sin Contenido."
        );
        break;
      case HttpStatusCode.badRequest:
        Alertas(
          "error",
          "Error " + HttpStatusCode.badRequest + ": Solicitud Incorrecta."
        );
        break;
      case HttpStatusCode.unauthorized:
        Alertas(
          "error",
          "Error " + HttpStatusCode.unauthorized + ": No autorizado."
        );
        break;
      case HttpStatusCode.forbidden:
        Alertas("error", "Error " + HttpStatusCode.forbidden + ": Prohibido.");
        break;
      case HttpStatusCode.notFound:
        Alertas(
          "error",
          "Error " + HttpStatusCode.notFound + ": No Encontrado."
        );
        break;
      case HttpStatusCode.serverError:
        Alertas(
          "error",
          "Error " + HttpStatusCode.serverError + ": Error de servidor."
        );
        break;
      default:
        Alertas("error", "Error de Servidor: Inesperado.");
    }
  }
}
