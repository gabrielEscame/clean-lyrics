import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
  httpStatusCode
} from '@/data/protocols/http'

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url?: string
  response: HttpResponse<T> = {
    statusCode: httpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse<T>> {
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
