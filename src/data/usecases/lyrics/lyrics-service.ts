import { HttpGetClient, httpStatusCode } from '@/data/protocols/http'
import { NotFoundError, UnexpectedError } from '@/domain/errors'
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
