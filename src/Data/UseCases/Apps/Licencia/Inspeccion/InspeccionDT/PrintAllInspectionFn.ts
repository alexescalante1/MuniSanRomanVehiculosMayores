import { Url } from "url";
import {
  PrintAllInspectionRequest,
  PrintAllInspectionResponse,
  PrintInspeccionResponseData,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function printAllInspectionFn(
  url: string,
  method: string,
  params: PrintAllInspectionRequest
): Promise<PrintAllInspectionResponse> {
  let dataResponse: PrintInspeccionResponseData[] = [];
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
    body: params,
  });
  console.log(httpResponse);
  let data = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    data.forEach((element: PrintInspeccionResponseData) => {
      dataResponse.push(element);
    });
  }
  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: dataResponse,
  };
}
