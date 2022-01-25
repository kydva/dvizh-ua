import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { User } from 'src/users/user.entity';
import { Equal, FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { ListEventsDto } from './dto/list-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    private storageService: StorageService,
  ) {}

  async find(query: ListEventsDto) {
    let qb = this.eventsRepository
      .createQueryBuilder('event')
      .skip(query.skip)
      .take(query.take)
      .where('approved = :approved', { approved: !query.moderation })
      .andWhere('event.end >= :start', { start: query.start || new Date() })
      .orderBy('event.start', 'ASC')
      .leftJoinAndSelect('event.category', 'category')
      .leftJoinAndSelect('event.city', 'city');

    if (query.end) {
      qb = qb.andWhere('event.start <= :end', {
        end: query.end,
      });
    }

    if (query.search) {
      qb = qb.andWhere(
        '(event.name like :query OR event.description like :query)',
        {
          query: `%${query.search}%`,
        },
      );
    }

    if (query.city) {
      qb = qb.andWhere('event.cityId = :id', { id: query.city });
    }

    if (query.category) {
      qb = qb.andWhere('event.categoryId = :id', { id: query.category });
    }

    const [events, total] = await qb.getManyAndCount();

    return {
      events,
      total,
    };
  }

  async create(
    dto: CreateEventDto,
    picture: Express.Multer.File,
    author: User,
  ) {
    const event = Object.assign(new Event(), dto);
    event.author = author;
    event.picture = await this.storageService.moveFileToBucket(
      picture,
      'events',
    );
    return this.eventsRepository.save(event);
  }

  async findById(id: number): Promise<Event> {
    const event = this.eventsRepository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async delete(eventId: number, user: User) {
    const event = await this.findById(eventId);
    const canDelete = event.author.id === user.id || user.isAdmin();

    if (canDelete) {
      await this.eventsRepository.delete(eventId);
    }
  }

  async approve(id: number) {
    const { affected } = await this.eventsRepository.update(
      { id },
      { approved: true },
    );
    if (!affected) {
      throw new NotFoundException();
    }
  }
}
