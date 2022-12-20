import { IEmpresaDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import {
  AxiosHttpClient,
  AlertServerError,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetEmpresaRegistrarFn(
  url: string,
  method: string,
  params: IEmpresaDT.GetEmpresaResponse
): Promise<IEmpresaDT.SetEmpresaResponse> {
  const httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: params,
    headers: GetToken(),
  });
  return {
    code: httpResponse.statusCode,
    success: httpResponse?.body?.success,
    message: httpResponse?.body?.message,
    errors: httpResponse?.body?.errors,
  };
}
