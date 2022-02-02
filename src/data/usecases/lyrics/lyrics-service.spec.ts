import { HttpGetClientSpy } from '@/data/mocks/mock-http-client'
import { httpStatusCode } from '@/data/protocols/http'
import { LyricsService } from '@/data/usecases/lyrics/lyrics-service'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { mockLyricModel, mockSearchParams } from '@/data/mocks/mock-lyrics'
import * as faker from 'faker'
import { LyricsModel } from '@/domain/models'

type SutTypes = {
  sut: LyricsService
  httpGetClientSpy: HttpGetClientSpy<LyricsModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<LyricsModel>()
  const sut = new LyricsService(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('LyricsService', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { artist, title } = mockSearchParams()
    const finalUrl = `${url}/${artist}/${title}`
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.search({ artist, title })
    expect(httpGetClientSpy.url).toEqual(finalUrl)
  })

  test('Should return a lyric if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockLyricModel()
    httpGetClientSpy.response = {
      statusCode: httpStatusCode.ok,
      body: httpResult
    }
    const lyric = await sut.search(mockSearchParams())
    await expect(lyric).toEqual(httpResult)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 400', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: httpStatusCode.badRequest
    }
    const promise = sut.search(mockSearchParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw notFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: httpStatusCode.notFound
    }
    const promise = sut.search(mockSearchParams())
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: httpStatusCode.internal
    }
    const promise = sut.search(mockSearchParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
