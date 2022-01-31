export enum httpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unathorized = 401,
  notFound = 404,
  internal = 500
}

export type HttpResponse = {
  statusCode: number
  body?: any
}
