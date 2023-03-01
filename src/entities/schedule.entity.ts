import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { RealEstate } from "./realState.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date"})
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => RealEstate, realEstate => realEstate.schedules)
  @JoinColumn({ name: "realEstateId" })
  realEstate: RealEstate;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: "userId" })
  user: User;
}

export { Schedule };