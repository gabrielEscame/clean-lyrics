import { HttpGetClint } from 'data/protocols/http/http-get-client'
import { LyricsService } from './lyrics-service'

describe('LyricsService', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    class HttpGetClientSpy implements HttpGetClint {
      url?: string
      async get(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new LyricsService(url, httpGetClientSpy)
    await sut.search()
    expect(httpGetClientSpy.url).toEqual(url)
  })
})
