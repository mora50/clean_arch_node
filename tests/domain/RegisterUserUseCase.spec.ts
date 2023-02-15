import RegisterUserUseCase from '@/domain/usecases/RegisterUserUseCase'
import { mockUserRepository } from '../helpers/user_helpers'

describe('Register Use Case', () => {
  const userMock = {
    id: '1',
    name: 'teste',
    email: 'teste@teste.com.br',
    password: '12345678',
  }

  beforeEach(() => {
    mockUserRepository.save.mockResolvedValueOnce(userMock)
  })

  it('should save the user', async () => {
    const sut = new RegisterUserUseCase(mockUserRepository)

    const response = await sut.execute(userMock, '12345678')

    expect(response).toEqual(expect.objectContaining(userMock))
  })

  it('should throw if user already exists', async () => {
    mockUserRepository.findUserByEmail.mockResolvedValueOnce(userMock)

    const sut = new RegisterUserUseCase(mockUserRepository)

    const response = sut.execute(userMock, '12345678')

    await expect(response).rejects.toThrow('Email already in use')
  })
})
