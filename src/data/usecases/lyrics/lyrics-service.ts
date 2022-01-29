import { HttpGetClient } from 'data/protocols/http/http-get-client'
import { LyricsParams } from 'domain/models'

export class LyricsService {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async search(params: LyricsParams): Promise<void> {
    const url = `${this.url}/${params?.artist}/${params?.title}`
    await this.httpGetClient.get({ url })
    return Promise.resolve()
  }
}
