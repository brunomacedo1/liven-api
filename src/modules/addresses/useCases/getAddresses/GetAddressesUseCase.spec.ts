import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { Address } from "@modules/addresses/infra/typeorm/entities/Address";
import { AddressesRepositoryInMemory } from "@modules/addresses/repositories/in-memory/AddressesRepositoryInMemory";
import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";

import { CreateAddressUseCase } from "../createAddress/CreateAddressUseCase";
import { GetAddressesUseCase } from "./GetAddressesUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let createAddresUseCase: CreateAddressUseCase;
let getAddressesUseCase: GetAddressesUseCase;
describe("Delete address", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddresUseCase = new CreateAddressUseCase(addressesRepositoryInMemory);
    getAddressesUseCase = new GetAddressesUseCase(addressesRepositoryInMemory);
  });

  it("should return an specific address", async () => {
    const userData: ICreateUsersDTO = {
      cpf: "11111111111",
      email: "user@example.com",
      password: "password",
      name: "user example",
      birth_date: new Date("1994/27/02"),
    };

    await createUserUseCase.execute(userData);
    const user = await usersRepositoryInMemory.findUserByEmail(userData.email);

    const addressData: ICreateAddressDTO = {
      address: "address example",
      country: "BR",
      state: "Alagoas",
      user_id: user.id,
      zipcode: "123456",
    };

    await createAddresUseCase.execute(addressData);
    const addresses = await getAddressesUseCase.execute({ user_id: user.id });

    expect(addresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: user.id,
        }),
      ])
    );
  });
});
