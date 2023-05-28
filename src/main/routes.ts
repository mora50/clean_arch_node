import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import swaggerUI from 'swagger-ui-express'
import {
  GetUserController,
  LoginUserController,
  RefreshTokenControler,
  RegisterUserController,
  CreateUsersGroupController,
  FindUsersInGroupController,
} from '../presentation/controllers'
import swaggerOptions from '@/config/swagger'
const router = Router()
const registerUserController = new RegisterUserController()

const loginUserController = new LoginUserController()
const getUserController = new GetUserController()
const refreshTokenController = new RefreshTokenControler()
const createUsersGroupController = new CreateUsersGroupController()
const findUsersGroupController = new FindUsersInGroupController()

/**
 * @openapi
 * tags:
 *   name: User
 *   description: User operations
 */

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags: [User]
 *     summary: User Registration
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 */
router.post('/auth/register', registerUserController.handle)

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User Login
 *     tags: [User]
 *     description: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     expires_in:
 *                       type: number
 */
router.post('/auth/login', loginUserController.handle)

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Token
 *     tags: [User]
 *     description: Refreshes the access token using a refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     expires_in:
 *                       type: number
 */
router.post('/auth/refresh-token', refreshTokenController.handle)

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions))

/**
 * @openapi
 * tags:
 *   name: Group
 *   description: Users group operations
 */

/**
 * @openapi
 * /group:
 *   post:
 *     tags: [Group]
 *     summary: Create Group
 *     description: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *     responses:
 *       201:
 *         description: Group created successfully
 */
router.post('/group', ensureAuthenticated, createUsersGroupController.handle)

/**
 * @swagger
 * /group/{groupId}:
 *   get:
 *     tags: [Group]
 *     summary: Get Group Users
 *     description: Get the users belonging to a specific group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *     responses:
 *       200:
 *         description: Successful retrieval of group users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role_name:
 *                     type: string
 */

router.get(
  '/group/:groupId',
  ensureAuthenticated,
  findUsersGroupController.handle
)

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get User
 *     description: Retrieve user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 */

router.get('/user', ensureAuthenticated, getUserController.handle)

export { router }
