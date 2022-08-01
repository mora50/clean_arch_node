import User from '@/domain/entities/User'
import { object, ref, string } from 'yup'

const loginValidationShape = object({
  email: string().nullable().email().required(),
  password: string().min(8).required(),
})

const userValidationShape = loginValidationShape.shape({
  name: string().nullable().required().min(2).max(50),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords must match'
  ),
})

const validateUserFields = async (
  user: UserValidation
): Promise<{ message: string } | null> => {
  try {
    await userValidationShape.validate(user)
  } catch (error) {
    return { message: error.message }
  }
}

const validateLoginFields = async (email: string, password: string) => {
  try {
    await loginValidationShape.validate({ email, password })
  } catch (error) {
    return { message: error.message }
  }
}

type UserValidation = User & { confirmPassword: string }

export { validateLoginFields, validateUserFields }
