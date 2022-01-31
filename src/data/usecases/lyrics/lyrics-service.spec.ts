import { HttpGetClientSpy } from '@/data/mocks/mock-http-client'
import { httpStatusCode } from '@/data/protocols/http/http-response'
import { LyricsService } from '@/data/usecases/lyrics/lyrics-service'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { mockSearchParams } from '@/domain/test/mock-search-params'
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
    const { artist, title } = mockSearchParams()
    const finalUrl = `${url}/${artist}/${title}`
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.search({ artist, title })
    expect(httpGetClientSpy.url).toEqual(finalUrl)
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
