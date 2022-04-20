import { inject, injectable } from "tsyringe";

import { IGetAddressesDTO } from "@modules/addresses/dtos/IGetAddressesDTO";
import { Address } from "@modules/addresses/infra/typeorm/entities/Address";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";

@injectable()
class GetAddressesUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({ user_id, country }: IGetAddressesDTO): Promise<Address[]> {
    const addresses = await this.addressesRepository.getAddresses({
      user_id,
      // Se não for passado o valor de country ele retorna undefined para que a query seja executada apenas com o user_id
      country: country ? country.toLocaleUpperCase() : undefined,
    });

    return addresses;
  }
}

export { GetAddressesUseCase };
