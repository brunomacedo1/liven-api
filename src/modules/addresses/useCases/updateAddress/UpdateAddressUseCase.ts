import { inject, injectable } from "tsyringe";

import { IUpdateAddressDTO } from "@modules/addresses/dtos/IUpdateAddressDTO";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    id,
    address,
    zipcode,
    state,
    country,
  }: IUpdateAddressDTO): Promise<void> {
    const ifAddressExists = await this.addressesRepository.getAddressById(id);

    if (!ifAddressExists) {
      throw new AppError("Address with this id does not exists.");
    }

    await this.addressesRepository.update({
      id,
      address: address || ifAddressExists.address,
      zipcode: zipcode || ifAddressExists.zipcode,
      state: state || ifAddressExists.state,
      country: country || ifAddressExists.country,
    });
  }
}

export { UpdateAddressUseCase };
