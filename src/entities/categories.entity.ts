import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("categories")
class Category {
@PrimaryGeneratedColumn('increment')
id: number;

@Column({ type: "varchar", length: 45, unique: true })
name: string;
  realEstates: any;

}

export { Category };