import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import { City } from 'src/cities/city.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column({ nullable: true })
  price: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne((type) => Category, { eager: true })
  @JoinColumn()
  category: Category;

  @ManyToOne((type) => City, { eager: true })
  @JoinColumn()
  city: City;

  @ManyToOne((type) => User, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  author: User;
}
