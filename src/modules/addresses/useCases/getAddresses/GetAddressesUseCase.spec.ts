import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { AddressesRepositoryInMemory } from "@modules/addresses/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";

import { CreateAddressUseCase } from "../createAddress/CreateAddressUseCase";
import { GetAddressesUseCase } from "./GetAddressesUseCase";

let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let createAddressUseCase: CreateAddressUseCase;
let getAddressesUseCase: GetAddressesUseCase;

describe("Get user addresses", () => {
  beforeEach(() => {
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      addressesRepositoryInMemory
    );
    getAddressesUseCase = new GetAddressesUseCase(addressesRepositoryInMemory);
  });

  it("should return an specific address", async () => {
    const addressData: ICreateAddressDTO = {
      address: "address example",
      country: "BR",
      state: "Alagoas",
      user_id: "d8fa66cc-14f7-41a0-8c5d-6b2f7292da9c",
      zipcode: "123456",
    };

    await createAddressUseCase.execute(addressData);

    const addresses = await getAddressesUseCase.execute({
      user_id: "d8fa66cc-14f7-41a0-8c5d-6b2f7292da9c",
    });

    expect(addresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: "d8fa66cc-14f7-41a0-8c5d-6b2f7292da9c",
          address: "address example",
          country: "BR",
          state: "Alagoas",
          zipcode: "123456",
        }),
      ])
    );
  });
});
