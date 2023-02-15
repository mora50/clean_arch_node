import { createReadStream, createWriteStream, statSync } from 'fs'
import { join } from 'path'
import VideoStream from '../entities/VideoStream'
import BaseError from '../errors/baseError'

export default class StreamVideoUseCase {
  execute(range: string): VideoStream {
    if (!range) {
      throw new BaseError('Without a range', 400)
    }

    const CHUNK_SIZE = 10 ** 6

    const start = Number(range.replace(/\D/g, ''))

    const videoPath = join(__dirname, '../../videos/video.mp4')

    const videoSize = statSync(videoPath).size

    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const videoStream = createReadStream(videoPath, { start, end })

    const contentLength = end - start + 1

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }

    return { headers, videoStream }
  }
}
