import { HttpResponse } from '@/data/protocols/http'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<T> {
  get(params: HttpGetParams): Promise<HttpResponse<T>>
}
