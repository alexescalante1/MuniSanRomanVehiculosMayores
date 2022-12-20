import { IUsuariosDT } from "../../../../../Domain/Interfaces/Aplication/Apps/Inicio";
import { AxiosHttpClient } from "../../../../../Infra/Http";
import { GetToken } from "../../../../Utitilies";

export async function PostUsuario(
  url: string,
  method: string,
  body: IUsuariosDT.SetRegUsuarioRequest
): Promise<any> {
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: body,
    headers: GetToken(),
  });
  return httpResponse;
}
