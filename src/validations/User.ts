import User from '@/domain/entities/User'
import { object, ref, string } from 'yup'

const userValidationObject = object({
  name: string().required().min(3),
  email: string().nullable().email().required(),
  password: string().min(8).required(),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords must match'
  ),
})

const validateUserFields = async (
  user: UserValidation
): Promise<{ message: string } | null> => {
  try {
    await userValidationObject.validate(user)
  } catch (error) {
    return { message: error.message }
  }
}

type UserValidation = User & { confirmPassword: string }

export default validateUserFields
