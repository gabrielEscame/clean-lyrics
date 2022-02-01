import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { httpStatusCode } from '@/data/protocols/http/http-response'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { LyricsModel, LyricsParams } from '@/domain/models'
import { Lyrics } from '@/domain/usecases/lyrics'

export class LyricsService implements Lyrics {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LyricsModel>
  ) {}

  async search(params: LyricsParams): Promise<LyricsModel> {
    const url = `${this.url}/${params?.artist}/${params?.title}`
    const httpResponse = await this.httpGetClient.get({ url })

    switch (httpResponse.statusCode) {
      case httpStatusCode.ok:
        return httpResponse.body
      case httpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
