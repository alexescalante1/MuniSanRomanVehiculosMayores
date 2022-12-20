import { IRutasDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetRutaEditarFn(
  url: string,
  method: string,
  body: IRutasDT.SetRutaEditarRequest
): Promise<boolean> {
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: body,
    headers: GetToken(),
  });

  console.log(httpResponse);
  let Response = httpResponse.body?.data;

  return Response;
}
