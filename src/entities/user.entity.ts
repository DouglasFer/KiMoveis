import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./schedule.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: "45" })
  name: string;

  @Column({ length: "45", unique: true })
  email: string;

  @Column({ default: false, nullable: true })
  admin: boolean;

  @Column({ length: "120" })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const verifyPass = getRounds(this.password);
    if (!verifyPass) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule;
}
