declare global {
  namespace Express {
    interface Locals {
      /** it`s only works with ensureAuthenticated middleware */
      userId?: string
    }
  }
}

export {}
