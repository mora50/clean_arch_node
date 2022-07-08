import BaseError from "./baseError";

export default class Unauthorized extends BaseError {
  constructor() {
    super("Unauthorized", 401);
  }
}
