import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @UpdateDateColumn()
  updateDate: Date;
}
