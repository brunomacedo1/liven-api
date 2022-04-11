import { inject, injectable } from "tsyringe";

import { IUpdateUsersDTO } from "@modules/users/dtos/IUpdateUsersDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    email,
    birth_date,
  }: IUpdateUsersDTO): Promise<void> {
    const userExists = await this.usersRepository.getUser(id);

    if (!userExists) {
      throw new AppError("User does not exist");
    }

    await this.usersRepository.update({
      id,
      name: name || userExists.name,
      email: email || userExists.email,
      birth_date: birth_date || userExists.birth_date,
    });
  }
}

export { UpdateUserUseCase };
