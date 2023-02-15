import { ReadStream } from 'fs'

type VideoStream = {
  headers: {
    'Content-Range': string
    'Accept-Ranges': string
    'Content-Length': number
    'Content-Type': string
  }

  videoStream: ReadStream
}
export default VideoStream
