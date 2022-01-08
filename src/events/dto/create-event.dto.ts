import { IsDate, IsNumberString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @Length(5, 100)
  name: string;

  @Length(0, 20)
  price?: string;

  @Length(0, 80)
  location?: string;

  @Length(40, 2000)
  description: string;

  @Type(() => Date)
  @IsDate({ message: 'Будь ласка, вкажіть дату проведення заходу' })
  start: Date;

  @Type(() => Date)
  @IsDate({ message: 'Будь ласка, вкажіть дату проведення заходу' })
  end: Date;

  @IsNumberString()
  category: any;

  @IsNumberString()
  city: any;
}
