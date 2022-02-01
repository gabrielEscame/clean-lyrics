import {
  HttpGetClient,
  HttpGetParams
} from '@/data/protocols/http/http-get-client'
import {
  HttpResponse,
  httpStatusCode
} from '@/data/protocols/http/http-response'

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
