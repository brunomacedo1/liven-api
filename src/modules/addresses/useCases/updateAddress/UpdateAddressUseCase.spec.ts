import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { IUpdateAddressDTO } from "@modules/addresses/dtos/IUpdateAddressDTO";
import { AddressesRepositoryInMemory } from "@modules/addresses/repositories/in-memory/AddressesRepositoryInMemory";
import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { CreateAddressUseCase } from "../createAddress/CreateAddressUseCase";
import { UpdateAddressUseCase } from "./UpdateAddressUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let createAddressUseCase: CreateAddressUseCase;
let updateAddressUseCase: UpdateAddressUseCase;

describe("Update address", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      addressesRepositoryInMemory
    );
    updateAddressUseCase = new UpdateAddressUseCase(
      addressesRepositoryInMemory
    );
  });

  it("should update an address", async () => {
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

    await createAddressUseCase.execute(addressData);
    const address = await addressesRepositoryInMemory.getAddresses({
      user_id: user.id,
    });

    const updateAddressData: IUpdateAddressDTO = {
      id: address[0].id,
      address: "address update example",
      country: "BR",
      state: "Alagoas",
      zipcode: "123456",
    };

    await updateAddressUseCase.execute(updateAddressData);

    const updatedAddress = await addressesRepositoryInMemory.getAddressById(
      address[0].id
    );

    expect(updatedAddress).toEqual(
      expect.objectContaining({
        address: updateAddressData.address,
      })
    );
  });

  it("should not update an address, if address does not exists on 'db' ", () => {
    expect(async () => {
      const updateAddressData: IUpdateAddressDTO = {
        id: "ef58b17f-32ec-4949-8c8c-6606b567ca2e",
        address: "address update example",
        country: "BR",
        state: "Alagoas",
        zipcode: "123456",
      };

      await updateAddressUseCase.execute(updateAddressData);
    }).rejects.toBeInstanceOf(AppError);
  });
});
