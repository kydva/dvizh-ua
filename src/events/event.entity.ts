import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne((type) => Category)
  @JoinColumn()
  category: Category;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  author: User;
  event: { id: number };
}
