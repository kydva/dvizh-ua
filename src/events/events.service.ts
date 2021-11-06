import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    private storageService: StorageService,
  ) {}

  async find() {
    return this.eventsRepository.find();
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
    return event.author.id === user.id || user.isAdmin();
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
