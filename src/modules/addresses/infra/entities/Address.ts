import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/users/infra/typeorm/entities/User";

@Entity("addresses")
class Address {
  @PrimaryColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  zipcode: number;

  @Column()
  state: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.address)
  user_id: User;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
