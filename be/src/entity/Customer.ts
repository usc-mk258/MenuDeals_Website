import { Order } from './Order';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index
} from "typeorm";

@Entity('customer')
@Unique(["id"])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile_token: string;

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true
  })
  @Index({ spatial: true })
  point: any;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}