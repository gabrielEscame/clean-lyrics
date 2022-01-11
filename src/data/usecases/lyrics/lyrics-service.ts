import { HttpGetClint } from 'data/protocols/http/http-get-client'

export class LyricsService {
  constructor(
    private readonly url: string,
    private readonly httpGetCleint: HttpGetClint
  ) {}

  async search(): Promise<void> {
    await this.httpGetCleint.get({ url: this.url })
    return Promise.resolve()
  }
}
