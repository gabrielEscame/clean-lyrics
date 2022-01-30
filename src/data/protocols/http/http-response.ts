export enum httpStatusCode {
  unathorized = 401,
  notFound = 404,
  noContent = 204
}

export type HttpResponse = {
  statusCode: number
  body?: any
}
