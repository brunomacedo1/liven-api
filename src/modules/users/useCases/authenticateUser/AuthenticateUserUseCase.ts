import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAuthenticateUsersDTO } from "@modules/users/dtos/IAuthenticateUsersDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IToken {
  user: { name: string; email: string };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthenticateUsersDTO): Promise<IToken> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const ifPasswordMatch = await compare(password, user.password);

    if (!ifPasswordMatch) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenData = {
      token,
      user: { name: user.name, email: user.email },
    };
    return tokenData;
  }
}

export { AuthenticateUserUseCase };
