import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { IGetAddressesDTO } from "@modules/addresses/dtos/IGetAddressesDTO";
import { IUpdateAddressDTO } from "@modules/addresses/dtos/IUpdateAddressDTO";
import { Address } from "@modules/addresses/infra/typeorm/entities/Address";

import { IAddressesRepository } from "../IAddressesRepository";

class AddressesRepositoryInMemory implements IAddressesRepository {
  addresses: Address[] = [];

  async create(data: ICreateAddressDTO): Promise<void> {
    const address = new Address();
    Object.assign(address, data);
    this.addresses.push(address);
  }

  async getAddresses({
    user_id,
    country,
  }: IGetAddressesDTO): Promise<Address[]> {
    if (country) {
      return [
        this.addresses.find(
          (address) =>
            address.country === country && address.user_id === user_id
        ),
      ];
    }
    return [this.addresses.find((address) => address.user_id === user_id)];
  }

  async getAddressById(id: string): Promise<Address> {
    return this.addresses.find((address) => address.id === id);
  }

  async delete(id: string): Promise<void> {
    let addressIndex: number;
    this.addresses.map((address, index) => {
      if (address.id === id) {
        addressIndex = index;
      }
      return address;
    });
    this.addresses.splice(addressIndex, 1);
  }

  async update({
    id,
    address,
    zipcode,
    state,
    country,
  }: IUpdateAddressDTO): Promise<void> {
    const updateAddress = this.addresses.find((address) => address.id === id);

    updateAddress.address = address || updateAddress.address;
    updateAddress.zipcode = zipcode || updateAddress.zipcode;
    updateAddress.state = state || updateAddress.state;
    updateAddress.country = country || updateAddress.country;
  }
}

export { AddressesRepositoryInMemory };
