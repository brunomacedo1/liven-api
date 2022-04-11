import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const ifUserExists = await this.usersRepository.getUser(id);

    if (!ifUserExists) {
      throw new AppError("User does not exists");
    }

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
