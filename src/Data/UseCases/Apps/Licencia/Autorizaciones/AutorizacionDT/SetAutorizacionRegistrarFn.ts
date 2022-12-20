import { IAutorizacionDT } from "../../../../../../Domain/Interfaces/Aplication/Apps";
import { AutorizacionResponse } from "../../../../../../Domain/Models/Apps/Licencias";
import {
  AxiosHttpClient,
} from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function SetAutorizacionRegistrarFn(
  url: string,
  method: string,
  params: IAutorizacionDT.SetAutorizacionRegistrarRequest
): Promise<AutorizacionResponse> {
  console.log("DESDE BACKEND")
  console.log(url)
  console.log(params)
  let httResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: params,
    headers: GetToken(),
  });

  console.log(httResponse);
  let Resultado = httResponse.body.data;
  console.log("desdeReponse");
  return {
    header: {
      code: httResponse.statusCode,
      success: httResponse?.body?.success,
      message: httResponse?.body?.message,
      errors: httResponse?.body?.errors,
    },
  };
}
