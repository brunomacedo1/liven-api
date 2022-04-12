import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { IUpdateAddressDTO } from "../dtos/IUpdateAddressDTO";
import { Address } from "../infra/typeorm/entities/Address";

export interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<void>;
  getAddresses(id: string): Promise<Address[]>;
  getAddressById(id: string): Promise<Address>;
  update(data: IUpdateAddressDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
