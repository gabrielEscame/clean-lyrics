import { HttpGetClientSpy } from '../../mocks/mock-http-client'
import { LyricsService } from './lyrics-service'
import * as faker from 'faker'

type SutTypes = {
  sut: LyricsService
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new LyricsService(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('LyricsService', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.search()
    expect(httpGetClientSpy.url).toEqual(url)
  })
})
