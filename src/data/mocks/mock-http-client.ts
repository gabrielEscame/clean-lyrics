import { HttpGetClint, HttpGetParams } from '../protocols/http/http-get-client'

export class HttpGetClientSpy implements HttpGetClint {
  url?: string
  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
