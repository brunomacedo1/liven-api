import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetUserUseCase } from "./GetUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let getUserUseCase: GetUserUseCase;

describe("Get user by id", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    getUserUseCase = new GetUserUseCase(usersRepositoryInMemory);
  });

  it("should return a specific user", async () => {
    const data: ICreateUsersDTO = {
      cpf: "11111111111",
      email: "user@example.com",
      password: "password",
      name: "user example",
      birth_date: new Date("1994/27/02"),
    };

    await createUserUseCase.execute(data);
    const user = await usersRepositoryInMemory.findUserByEmail(data.email);
    const returnedUser = await getUserUseCase.execute(user.id);
    expect(returnedUser).toHaveProperty("id");
  });
});
