import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { IUpdateUsersDTO } from "../dtos/IUpdateUsersDTO";
import { User } from "../infra/typeorm/entities/User";

// Interface para ser implementada pela classe responsável pelas operações dos cruds.
interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  getUser(id: string): Promise<User>;
  update(data: IUpdateUsersDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
