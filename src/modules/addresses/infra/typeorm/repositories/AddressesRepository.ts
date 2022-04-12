import { Repository } from "typeorm";

import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { IUpdateAddressDTO } from "@modules/addresses/dtos/IUpdateAddressDTO";
import { IAddressesRepository } from "@modules/addresses/repositories/IAddressesRepository";
import { dataSource } from "@shared/typeorm/database";

import { Address } from "../entities/Address";

class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = dataSource.getRepository(Address);
  }

  async create({
    address,
    zipcode,
    state,
    country,
    user_id,
  }: ICreateAddressDTO): Promise<void> {
    const addressInstance = this.repository.create({
      address,
      zipcode,
      state,
      country,
      user_id,
    });

    await this.repository.save(addressInstance);
  }

  async getAddresses(id: string): Promise<Address[]> {
    const addresses = await this.repository.findBy({
      user: { id },
    });

    return addresses;
  }

  async getAddressById(id: string): Promise<Address> {
    const address = await this.repository.findOneBy({ id });

    return address;
  }

  async update({
    id,
    address,
    zipcode,
    state,
    country,
  }: IUpdateAddressDTO): Promise<void> {
    await this.repository.update({ id }, { address, zipcode, state, country });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { AddressesRepository };
