import bcrypt from 'bcrypt'

const passwordHashProvider = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12)

  const passwordHash = await bcrypt.hash(password, salt)

  return passwordHash
}

export default passwordHashProvider
