import { IRutasDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";

export async function ObtRutasRegistroFn(
  Nombr: string,
  Color: string,
  Coordenadas: IRutasDT.E_POINTS_XY[]
): Promise<IRutasDT.E_ROUTER_STRUCT> {
  let Response: IRutasDT.E_ROUTER_STRUCT;
  Response = {
    Nombre: Nombr,
    Properties: {
      color: Color,
      opacity: 0.3,
      weight: 10,
      stroke: true,
      fillRule: "evenodd",
      bubblingMouseEvents: true,
    },
    GenPoints: Coordenadas,
    PartialPoints: [],
  };

  return await Response;
}
