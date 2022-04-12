import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/users/infra/typeorm/entities/User";

@Entity("addresses")
class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  address: string;

  @Column()
  zipcode: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.id) // Faz com que o campo user_id referencie(foreing key) o id do usuário, da tabela users.
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
