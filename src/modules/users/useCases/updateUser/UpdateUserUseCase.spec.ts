import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { IUpdateUsersDTO } from "@modules/users/dtos/IUpdateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;
describe("Update user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to update user", async () => {
    const userData: ICreateUsersDTO = {
      cpf: "11111111111",
      email: "user@example.com",
      password: "password",
      name: "user example",
      birth_date: new Date(),
    };

    await createUserUseCase.execute(userData);
    let user = await usersRepositoryInMemory.findUserByEmail(userData.email);

    const updateUserData: IUpdateUsersDTO = {
      id: user.id,
      birth_date: new Date(),
      email: "updateUser@example.com",
      name: "update user example",
    };

    await updateUserUseCase.execute(updateUserData);
    user = await usersRepositoryInMemory.findUserByEmail(updateUserData.email);

    expect(user).toEqual(
      expect.objectContaining({
        email: updateUserData.email,
      })
    );
  });

  it("should not update user, if user does not exist on 'db' ", () => {
    expect(async () => {
      const updateUserData: IUpdateUsersDTO = {
        id: "ef58b17f-32ec-4949-8c8c-6606b567ca2e",
        birth_date: new Date(),
        email: "updateUser@example.com",
        name: "update user example",
      };

      await updateUserUseCase.execute(updateUserData);
    }).rejects.toBeInstanceOf(AppError);
  });
});
