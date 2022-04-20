import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Delete user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should delete a user", async () => {
    const data: ICreateUsersDTO = {
      cpf: "11111111111",
      email: "user@example.com",
      password: "password",
      name: "user example",
      birth_date: new Date(),
    };

    await createUserUseCase.execute(data);

    const user = await usersRepositoryInMemory.findUserByEmail(data.email);

    await deleteUserUseCase.execute(user.id);

    expect(usersRepositoryInMemory.users.length).toBeLessThan(1);
  });
});
