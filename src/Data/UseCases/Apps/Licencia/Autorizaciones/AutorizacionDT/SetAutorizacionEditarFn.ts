import { IAutorizacionDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { AutorizacionResponse } from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient, AlertServerError } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetAutorizacionEditarFn(
  url: string,
  method: string,
  params: IAutorizacionDT.SetAutorizacionEditarFnRequest
): Promise<AutorizacionResponse> {
  console.log(params)
  const httResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
    body:params
  });

  console.log(httResponse);
  return {
    header: {
      success: httResponse.body?.success,
      errors: httResponse.body?.errors,
      message:httResponse.body?.message,
      code: httResponse.statusCode
    }
  };
}
