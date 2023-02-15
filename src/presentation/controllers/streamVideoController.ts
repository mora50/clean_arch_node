import StreamVideoUseCase from '@/domain/usecases/StreamVideoUseCase'
import { Request, Response } from 'express'
import { pipeline } from 'stream/promises'

export class StreamVideoController {
  async handle(req: Request, res: Response): Promise<void> {
    const range = req.headers.range

    const videoStreamUseCase = new StreamVideoUseCase()

    const { headers, videoStream } = videoStreamUseCase.execute(range)

    res.writeHead(206, headers)

    await pipeline(videoStream, res)
  }
}
