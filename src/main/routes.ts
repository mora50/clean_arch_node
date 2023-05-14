import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import {
  GetUserController,
  LoginUserController,
  RefreshTokenControler,
  RegisterUserController,
  CreateUsersGroupController,
  FindUsersInGroupController,
} from '../presentation/controllers'
const router = Router()
const registerUserController = new RegisterUserController()
const loginUserController = new LoginUserController()
const getUserController = new GetUserController()
const refreshTokenController = new RefreshTokenControler()
const createUsersGroupController = new CreateUsersGroupController()
const findUsersGroupController = new FindUsersInGroupController()
router.post('/auth/register', registerUserController.handle)
router.post('/auth/login', loginUserController.handle)

router.post('/auth/refresh-token', refreshTokenController.handle)

router.use(ensureAuthenticated)

router.post('/create-group', createUsersGroupController.handle)
router.get('/user', getUserController.handle)
router.get('/finds-users-group/:groupId', findUsersGroupController.handle)
export { router }
