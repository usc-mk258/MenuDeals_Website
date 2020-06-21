import { DataTypes } from 'sequelize';
import { Deal } from './Deal';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Review } from './Reviews';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Column("varchar", { array: true, nullable: true })
  image_url: string[];

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true
  })
  @Index({ spatial: true })
  point: any;

  @OneToMany(() => Deal, deal => deal.restaurant)
  deals: Deal[];

  @OneToMany(() => Review, review => review.restaurant)
  reviews: Review[];

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

}