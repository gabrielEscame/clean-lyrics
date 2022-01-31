import {
  HttpGetClient,
  HttpGetParams
} from '@/data/protocols/http/http-get-client'
import {
  HttpResponse,
  httpStatusCode
} from '@/data/protocols/http/http-response'

export class HttpGetClientSpy implements HttpGetClient {
  url?: string
  response: HttpResponse = {
    statusCode: httpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
