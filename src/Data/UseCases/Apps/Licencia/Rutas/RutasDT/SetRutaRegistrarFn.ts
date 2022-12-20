import { IRutasDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetRutaRegistrarFn(
  url: string,
  method: string,
  body: IRutasDT.SetRutaRegistrarRequest
): Promise<boolean> {
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: body,
    headers: GetToken(),
  });

  if (httpResponse) {
    return true;
  }

  return false;
}
