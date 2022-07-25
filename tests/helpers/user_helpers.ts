import UserRepository from '@/domain/repositories/UserRepository'

const mockUserRepository: jest.Mocked<UserRepository> = {
  save: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn()
}

export { mockUserRepository }
