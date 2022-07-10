import { model, Schema } from "mongoose";
import User from "../../domain/entities/User";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<User>("User", userSchema);

export { UserModel };
