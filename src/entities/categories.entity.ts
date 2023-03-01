import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("categories")
class Category {
@PrimaryGeneratedColumn()
id: number;

@Column({ type: "varchar", length: 45, unique: true })
name: string;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
    realEstates: any;
}

export { Category };