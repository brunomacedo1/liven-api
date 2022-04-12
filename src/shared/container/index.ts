import { container } from "tsyringe";

import { AddressesRepository } from "@modules/addresses/infra/typeorm/repositories/AddressesRepository";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAddressesRepository>(
  "AddressesRepository",
  AddressesRepository
);
