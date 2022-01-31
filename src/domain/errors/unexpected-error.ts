export class UnexpectedError extends Error {
  constructor() {
    super('Something went wrong, try singing again soon...')
    this.name = 'UnexpectedError'
  }
}
