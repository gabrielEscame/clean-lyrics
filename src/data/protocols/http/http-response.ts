export enum httpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internal = 500
}

export type HttpResponse<T> = {
  statusCode: number
  body?: T
}
