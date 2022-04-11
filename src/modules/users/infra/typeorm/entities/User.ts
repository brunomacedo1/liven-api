import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Address } from "@modules/addresses/infra/typeorm/entities/Address";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "date",
  })
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Address, (address) => address.user_id) // Cria a relação inversa da foreingkey(user_id) na  tabela de endereços, para que seja possível retornar os endereços do usuário
  addresses: Address[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
