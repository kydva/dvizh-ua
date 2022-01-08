import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  create(name: string): Promise<City> {
    const city = new City();
    city.name = name;
    return this.cityRepository.save(city);
  }

  all(): Promise<City[]> {
    return this.cityRepository.find();
  }
}
