import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedule.entity";


@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Address, (address: { realEstates: any; }) => address.realEstates)
  @JoinColumn({ name: "addressId" })
  address: Address;

  @ManyToOne(() => Category, category => category.realEstates)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(() => Schedule, schedule => schedule.realEstate)
  schedules: Schedule[];
}

export { RealEstate };