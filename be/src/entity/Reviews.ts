import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne
} from "typeorm";
import { Restaurant } from './Restaurant';

@Entity('reviews')
@Unique(["id"])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('enum', { name: 'rating', enum: [1, 2, 3, 4, 5] })
  rating: string;

  @ManyToOne(type => Restaurant, restaurant => restaurant.reviews)
  restaurant: Restaurant;

}