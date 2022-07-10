import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import {
  RegisterUserController,
  LoginUserController,
  GetUserController,
} from "./modules/auth/client/controllers";

const router = Router();

const registerUserController = new RegisterUserController();
const loginUserController = new LoginUserController();
const getUserController = new GetUserController();

router.post("/auth/register", registerUserController.handler);
router.post("/auth/login", loginUserController.handler);

router.use(ensureAuthenticated);
router.get("/user/:id", getUserController.handler);

export { router };
