import { StreamVideoController } from './../presentation/controllers/streamVideoController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import {
  GetUserController,
  LoginUserController,
  RefreshTokenControler,
  RegisterUserController,
  CreateUsersGroupController,
} from '../presentation/controllers'
const router = Router()
const registerUserController = new RegisterUserController()
const loginUserController = new LoginUserController()
const getUserController = new GetUserController()
const refreshTokenController = new RefreshTokenControler()
const streamVideoController = new StreamVideoController()
const createUsersGroupController = new CreateUsersGroupController()
router.post('/auth/register', registerUserController.handle)
router.post('/auth/login', loginUserController.handle)

router.post('/auth/refresh-token', refreshTokenController.handle)

router.get('/video', streamVideoController.handle)
router.use(ensureAuthenticated)
router.get('/create-group', createUsersGroupController.handle)
router.get('/user', getUserController.handle)
export { router }
