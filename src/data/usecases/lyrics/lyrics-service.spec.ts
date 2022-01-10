import { HttpGetClientSpy } from '../../mocks/mock-http-client'
import { LyricsService } from './lyrics-service'

describe('LyricsService', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = 'any_url'
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new LyricsService(url, httpGetClientSpy)
    await sut.search()
    expect(httpGetClientSpy.url).toEqual(url)
  })
})
