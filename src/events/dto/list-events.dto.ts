import { Min, Max } from 'class-validator';
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

  @Type(() => Boolean)
  moderation?: boolean;
}
