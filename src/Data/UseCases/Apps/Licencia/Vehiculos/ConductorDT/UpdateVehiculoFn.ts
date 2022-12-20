import {
  VehiculoUpdateResponse,
  VehiculoUpodateRequest,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { BaseResponse } from "../../../../../../Domain/Models/Base";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function updateVehiculoFn(
  url: string,
  method: string,
  params: VehiculoUpodateRequest
): Promise<VehiculoUpdateResponse> {
  console.log("DESDE EL BACKENDK UPDATE");
  console.log(params);
  let header: BaseResponse;
  const httResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    body: params,
    headers: GetToken(),
  });
  console.log(httResponse);
  header = {
    code: httResponse?.statusCode,
    success: httResponse?.body?.success,
    message: httResponse.body?.message,
    errors: httResponse.body?.errors,
  };

  return { header };
}
