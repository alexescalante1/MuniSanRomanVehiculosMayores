import {
  GetInspeccionYearData,
  GetInspeccionYearResponse,
} from "../../../../../../Domain/Models/Apps/Licencias";
import { AxiosHttpClient } from "../../../../../../Infra/Http";
import { GetToken } from "../../../../../Utitilies";

export async function getInspeccionYearFn(
  url: string,
  method: string
): Promise<GetInspeccionYearResponse> {
  let dataResponse: GetInspeccionYearData[] = [];
  let httpResponse = await new AxiosHttpClient().Request({
    url: url,
    method: method,
    headers: GetToken(),
  });
  console.log(httpResponse);
  let data = httpResponse.body?.data;
  if (httpResponse.body?.success === 1) {
    data.forEach((element: GetInspeccionYearData) => {
      dataResponse.push({
        cDescripcion: element.cDescripcion,
        id: element.id,
      });
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
