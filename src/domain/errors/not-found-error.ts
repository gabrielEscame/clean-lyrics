export class NotFoundError extends Error {
  constructor() {
    super("We don't know this song...")
    this.name = 'NotFoundError'
  }
}
