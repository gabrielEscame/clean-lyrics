export type HttpGetParams = {
  url: string
}

export interface HttpGetClint {
  get(params: HttpGetParams): Promise<void>
}
