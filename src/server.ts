import bcrypt from "bcrypt";
import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import errorHandler from "./middlewares/errorHandler";
import LoginUserUseCase from "./modules/auth/domain/usecases/LoginUserUseCase";
import { UserModel } from "./modules/auth/models/User";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Hello World!" });

  res.end();
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iveaj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectou no banco");
  });

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "O password é obrigatório" });
  }

  if (confirm_password !== password)
    return res.status(422).json({ msg: "Os passwords não são iguais" });

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
  }
  const salt = await bcrypt.genSalt(12);

  const passwordHash = await bcrypt.hash(password, salt);

  const user = new UserModel({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro" });
  }

  res.end();
});

//Private route
app.get(
  "/user/:id",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await UserModel.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    return res.status(200).json({ user });
  }
);

app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loginUserUseCase = new LoginUserUseCase();

  const token = await loginUserUseCase.execute({ email, password });

  return res.status(200).json(token);
});

const port = 3000;

app.use(errorHandler);

app.listen(port);
