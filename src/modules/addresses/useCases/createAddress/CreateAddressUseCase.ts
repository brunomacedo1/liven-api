import { inject, injectable } from "tsyringe";

import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    address,
    country,
    state,
    user_id,
    zipcode,
  }: ICreateAddressDTO): Promise<void> {
    await this.addressesRepository.create({
      address,
      country,
      state,
      user_id,
      zipcode,
    });
  }
}

export { CreateAddressUseCase };
