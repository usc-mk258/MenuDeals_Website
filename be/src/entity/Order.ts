import { Customer } from './Customer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Deal } from './Deal';

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELIVERED = 'DELIVERED',
  RECEIVED = 'RECEIVED',
  REJECTED = 'REJECTED',
}

@Entity('order')
@Unique(["id"])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { name: 'status', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: true })
  eta: string;

  @ManyToOne(type => Customer, customer => customer.orders)
  customer: Customer;

  @ManyToOne(type => Deal, deal => deal.orders)
  deal: Deal;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

}