import { getRounds, hashSync } from "bcryptjs";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", nullable: true })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  schedules: any;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
      const isEncrypted = getRounds(this.password)
      if(!isEncrypted){
          this.password = hashSync(this.password, 10)
      }
  }
}

export { User };