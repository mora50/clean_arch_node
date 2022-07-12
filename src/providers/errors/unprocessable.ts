import BaseError from './baseError'

export default class UnprocessableEntityError extends BaseError {
  constructor (message: string) {
    super(message, 422)
  }
}
