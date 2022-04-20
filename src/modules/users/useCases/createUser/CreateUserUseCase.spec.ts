import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create user", async () => {
    const data: ICreateUsersDTO = {
      cpf: "11111111111",
      email: "user@example.com",
      password: "password",
      name: "user example",
      birth_date: new Date("1994/27/02"),
    };

    await createUserUseCase.execute(data);
    const user = await usersRepositoryInMemory.findUserByEmail(data.email);

    expect(user).toHaveProperty("id");
  });

  it("should not create user with duplicated email", () => {
    expect(async () => {
      const data: ICreateUsersDTO = {
        cpf: "11111111111",
        email: "user@example.com",
        password: "password",
        name: "user example",
        birth_date: new Date("1994/27/02"),
      };

      await createUserUseCase.execute(data);
      await createUserUseCase.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  });
});
