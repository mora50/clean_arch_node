import UserRepository from '@/domain/repositories/UserRepository'
import RegisterUserUseCase from '@/domain/usecases/RegisterUserUseCase'

const mockUserRepository: jest.Mocked<UserRepository> = {
  save: jest.fn(),
  findUserByEmail: jest.fn()
}

describe('Register Use Case', () => {
  const userMock = {
    id: '1',
    name: 'teste',
    email: 'teste@teste.com.br',
    password: '123456'
  }

  beforeEach(() => {
    mockUserRepository.save.mockResolvedValueOnce(userMock)
  })

  it('should save the user', async () => {
    const sut = new RegisterUserUseCase(mockUserRepository)

    const response = await sut.execute(userMock, '123456')

    expect(response).toEqual(expect.objectContaining(userMock))
  })

  it('should throw if user already exists', async () => {
    mockUserRepository.findUserByEmail.mockResolvedValueOnce(userMock)

    const sut = new RegisterUserUseCase(mockUserRepository)

    const response = sut.execute(userMock, '123456')

    await expect(response).rejects.toThrow('Please use another e-mail')
  })
})
