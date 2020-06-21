import { Restaurant } from './Restaurant';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Order } from './Order';

@Entity('deal')
@Unique(["id"])
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(type => Restaurant, restaurant => restaurant.deals)
  restaurant: Restaurant;

  @OneToMany(type => Order, order => order.deal)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
