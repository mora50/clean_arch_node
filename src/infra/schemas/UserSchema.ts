import { model, Schema } from 'mongoose'
import User from '@/domain/entities/User'

const schema = new Schema({
  name: { type: String, required: true, maxLength: 30, minlength: 3 },
  email: { type: String, required: true, maxLength: 255, minlength: 6 },
  password: { type: String, required: true, maxLength: 100, minlength: 8 }
})

const UserSchema = model<User>('User', schema)

export { UserSchema }
