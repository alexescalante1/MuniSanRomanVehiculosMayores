import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from "../../Domain/Interfaces/Protocols/Http";
import axios, { AxiosResponse } from "axios";
import {RutaServer} from "../../Main/Config/Variables"

export class AxiosHttpClient implements HttpClient {
  async Request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: (RutaServer + data.url),
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

export class AxiosHttpClientReniec implements HttpClient {
  async Request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
