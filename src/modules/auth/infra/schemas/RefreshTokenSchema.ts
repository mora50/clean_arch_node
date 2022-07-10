import { model, Schema } from "mongoose";
import RefreshToken from "../../domain/entities/RefreshToken";

const schema = new Schema<RefreshToken>(
  {
    expiresIn: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { versionKey: false }
);

const RefreshTokenSchema = model<RefreshToken>("RefreshToken", schema);

export { RefreshTokenSchema };
