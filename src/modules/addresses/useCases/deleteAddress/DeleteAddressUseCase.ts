import { inject, injectable } from "tsyringe";

import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const ifAddressExists = await this.addressesRepository.getAddressById(id);

    if (!ifAddressExists) {
      throw new AppError("Address does not exists.");
    }

    this.addressesRepository.delete(id);
  }
}

export { DeleteAddressUseCase };
