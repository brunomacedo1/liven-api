// DTO = Data transfer object;
// Servem para fazer uma tipagem dos dados necessários das operações de um repositório.

export interface IUpdateUsersDTO {
  id: string;
  name?: string;
  email?: string;
  birth_date?: Date;
}
