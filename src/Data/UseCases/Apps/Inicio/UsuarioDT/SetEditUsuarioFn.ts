import { IUsuariosDT } from "../../../../../Domain/Interfaces/Aplication/Apps/Inicio";
import { AxiosHttpClient } from "../../../../../Infra/Http";
import { GetToken } from "../../../../Utitilies";

export async function SetEditUsuarioFn(
  url: string,
  method: string,
  body: IUsuariosDT.SetUsuarioEditRequest
): Promise<any> {
  console.log("BODY OWO", body);
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: body,
    headers: GetToken(),
  });
  return httpResponse;
}
