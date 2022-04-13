import { inject, injectable } from "tsyringe";

import { Address } from "@modules/addresses/infra/typeorm/entities/Address";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class GetAddressByIdUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(id: string): Promise<Address> {
    const address = await this.addressesRepository.getAddressById(id);

    if (!address) {
      throw new AppError("Address not found.");
    }

    return address;
  }
}

export { GetAddressByIdUseCase };
