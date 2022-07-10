import { model, Schema } from "mongoose";
import User from "../../domain/entities/User";

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserSchema = model<User>("User", schema);

export { UserSchema };
