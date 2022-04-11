import { Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { IUpdateUsersDTO } from "@modules/users/dtos/IUpdateUsersDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { dataSource } from "@shared/typeorm/database";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  /** @data objeto contendo as informações do usuário, seu tipo vem da interface ICreateUsersDTO
    Método para criar um usuário. 
   */
  async create({
    name,
    cpf,
    email,
    password,
    birth_date,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      cpf,
      email,
      password,
      birth_date,
    });

    await this.repository.save(user);
  }

  /** Busca um usuário a partir do seu id no banco de dados. */
  async getUser(id: string): Promise<User> {
    const user = this.repository.findOne({
      where: { id },
      relations: {
        addresses: true,
      },
    });

    return user;
  }

  /** Faz a atualização parcial de dados do usuário */
  async update(data: IUpdateUsersDTO): Promise<void> {
    await this.repository.update({ id: data.id }, data);
  }

  /** Remove um usuário */
  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UsersRepository };
