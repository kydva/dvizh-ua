import { Min, Max, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListEventsDto {
  skip: number;

  @Type(() => Number)
  @Min(1)
  @Max(30)
  take: number;

  city?: number;

  category?: number;

  search?: string;

  @IsOptional()
  @IsDateString()
  start?: Date;

  @IsOptional()
  @IsDateString()
  end?: Date;

  @Type(() => Boolean)
  moderation?: boolean;
}
