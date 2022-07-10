import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

export default function connectionMongoDbAdapter() {
  mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iveaj.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("conectou no banco");
    });
}
