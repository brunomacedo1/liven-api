import { ICreateUsersDTO } from "@modules/users/dtos/ICreateUsersDTO";
import { IUpdateUsersDTO } from "@modules/users/dtos/IUpdateUsersDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUsersDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);
    this.users.push(user);
  }

  async getUser(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async update({
    id,
    name,
    email,
    birth_date,
  }: IUpdateUsersDTO): Promise<void> {
    const user = this.users.find((user) => user.id === id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.birth_date = birth_date || user.birth_date;
  }

  async delete(id: string): Promise<void> {
    let userIndex: number;
    this.users.map((user, index) => {
      if (user.id === id) {
        userIndex = index;
      }
      return user;
    });
    this.users.splice(userIndex, 1);
  }
}

export { UsersRepositoryInMemory };
