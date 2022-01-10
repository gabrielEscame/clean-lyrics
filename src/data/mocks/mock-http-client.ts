import { HttpGetClint } from '../protocols/http/http-get-client'

export class HttpGetClientSpy implements HttpGetClint {
  url?: string
  async get(url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}
