import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { AddressesRepositoryInMemory } from "@modules/addresses/repositories/in-memory/AddressesRepositoryInMemory";
import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";

import { CreateAddressUseCase } from "../createAddress/CreateAddressUseCase";
import { DeleteAddressUseCase } from "./DeleteAddressUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let createAddresUseCase: CreateAddressUseCase;
let deleteAddressUseCase: DeleteAddressUseCase;
describe("Delete addresses", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddresUseCase = new CreateAddressUseCase(addressesRepositoryInMemory);
    deleteAddressUseCase = new DeleteAddressUseCase(
      addressesRepositoryInMemory
    );
  });

  it("should delete an address", async () => {
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
    const address = await addressesRepositoryInMemory.getAddresses({
      user_id: user.id,
    });

    await deleteAddressUseCase.execute(address[0].id);

    expect(addressesRepositoryInMemory.addresses.length).toBeLessThan(1);
  });
});
