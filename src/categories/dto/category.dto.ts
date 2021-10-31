import { Length } from 'class-validator';

export class CategoryDto {
  @Length(4, 20)
  name: string;
}
