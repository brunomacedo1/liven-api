import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

/** Middleware de autenticação de usuário
 * Utiliza a biblioteca jsonwebtoken
 */
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  /** Rota  de criação e autenticação de usuários não precisam estar autenticadas */
  if (
    (request.path === "/users" && request.method === "POST") ||
    request.path === "/sessions"
  ) {
    console.log("aqui");
    return next();
  }

  if (!authHeader) {
    throw new AppError("Token is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.getUser(userId);

    if (!user) {
      throw new AppError("User does not exists.", 401);
    }

    request.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError("Token is invalid.", 401);
  }
}
