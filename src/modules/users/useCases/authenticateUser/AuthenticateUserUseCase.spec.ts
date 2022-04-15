import { container } from "tsyringe";

import { IAuthenticateUsersDTO } from "@modules/users/dtos/IAuthenticateUsersDTO";
import { AppError } from "@shared/errors/AppError";
import { dataSource } from "@shared/typeorm/database";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
const testDataSource = dataSource;

describe("Authenticate user", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
    authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it("should be able to authenticate an user", async () => {
    const data: IAuthenticateUsersDTO = {
      email: "macedbruno31@gmail.com",
      password: "123456",
    };

    const result = await authenticateUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not authenticate a non existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fakeuser@example.com",
        password: "password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate when user enters incorrect password", () => {
    expect(async () => {
      const data: IAuthenticateUsersDTO = {
        email: "macedbruno31@gmail.com",
        password: "123456",
      };

      await authenticateUserUseCase.execute({
        email: data.email,
        password: `1231313${data.password}`,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
