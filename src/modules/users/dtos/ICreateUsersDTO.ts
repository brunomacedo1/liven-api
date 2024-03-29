// DTO = Data transfer object;
// Servem para fazer uma tipagem dos dados necessários das operações de um repositório.

export interface ICreateUsersDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  birth_date: Date;
}
