import { Length } from 'class-validator';

export class CreateEventDto {
  @Length(5, 40)
  name: string;

  @Length(0, 20)
  price?: string;

  @Length(40, 2000)
  description: string;

  start: Date;

  end: Date;

  categoryId: number;
}
