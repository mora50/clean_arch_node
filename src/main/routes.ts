import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import {
  GetUserController,
  LoginUserController,
  RefreshTokenControler,
  RegisterUserController,
} from '../presentation/controllers'

const router = Router()

const registerUserController = new RegisterUserController()
const loginUserController = new LoginUserController()
const getUserController = new GetUserController()
const refreshTokenController = new RefreshTokenControler()

router.post('/auth/register', registerUserController.handle)
router.post('/auth/login', loginUserController.handle)

router.post('/auth/refresh-token', refreshTokenController.handle)

router.use(ensureAuthenticated)
router.get('/user/:id', getUserController.handle)

export { router }
