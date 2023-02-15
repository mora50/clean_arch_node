import { StreamVideoController } from './../presentation/controllers/streamVideoController'
import { Request, Response, Router } from 'express'
import fs from 'fs'
import { join } from 'path'
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
const streamVideoController = new StreamVideoController()

router.post('/auth/register', registerUserController.handle)
router.post('/auth/login', loginUserController.handle)

router.post('/auth/refresh-token', refreshTokenController.handle)

router.get(
  '/video',
  streamVideoController.handle

  // async (req: Request, res: Response) => {
  //   const range = req.headers.range

  //   if (!range) {
  //     return res.status(400).send('Requires Range header')
  //   }

  //   const CHUNK_SIZE = 10 ** 6

  //   const start = Number(range.replace(/\D/g, ''))

  //   const videoPath = join(__dirname, '../videos/video.mp4')

  //   const videoSize = fs.statSync(videoPath).size

  //   const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  //   const videoStream = fs.createReadStream(videoPath, { start, end })
  //   const contentLength = end - start + 1

  //   const headers = {
  //     'Content-Range': `bytes ${start}-${end}/${videoSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': contentLength,
  //     'Content-Type': 'video/mp4',
  //   }

  //   res.writeHead(206, headers)

  //   videoStream.pipe(res)
  // }
)

router.use(ensureAuthenticated)
router.get('/user/:id', getUserController.handle)

export { router }
