export default class BaseError extends Error {
  constructor (message: string, public status: number) {
    super(message)
  }
}
