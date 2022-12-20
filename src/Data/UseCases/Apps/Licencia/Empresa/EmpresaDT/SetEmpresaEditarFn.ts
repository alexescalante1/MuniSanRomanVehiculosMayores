import { IEmpresaDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetEmpresaEditarFn(
  url: string,
  method: string
): Promise<IEmpresaDT.GetEmpresaResponse> {
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });

  console.log(httpResponse);
  let Response = httpResponse.body?.data;

  return Response;
}
