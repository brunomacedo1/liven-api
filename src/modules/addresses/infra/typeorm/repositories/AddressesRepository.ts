import { Repository } from "typeorm";
import { Query } from "typeorm/driver/Query";

import { ICreateAddressDTO } from "@modules/addresses/dtos/ICreateAddressDTO";
import { IGetAddressesDTO } from "@modules/addresses/dtos/IGetAddressesDTO";
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

  async getAddresses({
    user_id,
    queryStrings,
  }: IGetAddressesDTO): Promise<Address[]> {
    const addressesQuery = this.repository
      .createQueryBuilder("a")
      .where("user_id = :user_id", { user_id });

    Object.entries(queryStrings).forEach((queryString) => {
      const [fieldName, value] = queryString;
      console.log(fieldName, value);
      if (value) {
        addressesQuery.andWhere(
          `LOWER(a.${fieldName}) = LOWER(:${fieldName})`,
          {
            [fieldName]: value,
          }
        );
      }
    });

    const addresses = await addressesQuery.getMany();
    console.log(addresses);
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
