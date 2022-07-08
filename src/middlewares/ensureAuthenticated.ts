import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Não autorizado" });
  }

  try {
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret!);

    return next();
  } catch (error) {
    return res.status(400).json({ msg: "Token inválido" });
  }
};

export { ensureAuthenticated };
