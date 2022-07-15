import User from '@/domain/entities/User'
import { object, string, ref } from 'yup'

const userValidationObject = object({
  name: string().required().min(3),
  email: string().nullable().email().required(),
  password: string().min(8).required(),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
})

const validateUserFields = async (user: User, confirmPassword: string): Promise<{message: string} | null> => {
  try {
    await userValidationObject.validate({ ...user, confirmPassword })
  } catch (error) {
    return { message: error.message }
  }
}

export default validateUserFields
