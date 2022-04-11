import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    cpf,
    email,
    password,
    birth_date,
  }: ICreateUsersDTO): Promise<void> {
    const checkIfUsersAlreadyExists =
      await this.usersRepository.findUserByEmail(email);

    if (checkIfUsersAlreadyExists) {
      throw new AppError(`User with email ${email} already exists`);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      cpf,
      email,
      password: passwordHash,
      birth_date,
    });
  }
}

export { CreateUserUseCase };
