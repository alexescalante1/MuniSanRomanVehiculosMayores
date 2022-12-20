import {
  GetAllInspeccion,
  GetAllInspeccionResponse,
} from "../../../../../../Domain/Models/Apps/Licencias/Inspeccion/InspeccionModel";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getAllInspeccionFn(
  url: string,
  method: string
): Promise<GetAllInspeccionResponse> {
  let dataGI: GetAllInspeccion[] = [];

  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log(httpResponse);
  let data = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    data.map((e: GetAllInspeccion) => {
      dataGI.push(e);
    });
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataGI,
  };
}
