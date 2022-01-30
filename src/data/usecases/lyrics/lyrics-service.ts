import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { httpStatusCode } from '@/data/protocols/http/http-response'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { LyricsParams } from '@/domain/models'

export class LyricsService {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async search(params: LyricsParams): Promise<void> {
    const url = `${this.url}/${params?.artist}/${params?.title}`
    const httpResponse = await this.httpGetClient.get({ url })
    switch (httpResponse.statusCode) {
      case httpStatusCode.notFound:
        throw new NotFoundError()
      default:
        return Promise.resolve()
    }
  }
}
