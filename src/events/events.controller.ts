import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/auth.decorator';
import { User } from 'src/users/user.decorator';
import { Role, User as UserEntity } from 'src/users/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { ListEventsDto } from './dto/list-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async find(@Query() query: ListEventsDto) {
    return await this.eventsService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  async delete(@Param('id') eventId: number, @User() user: UserEntity) {
    await this.eventsService.delete(eventId, user);
  }

  @Put(':id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(Role.Admin)
  async approve(@Param('id') id: number) {
    await this.eventsService.approve(id);
  }

  @Post()
  @HttpCode(201)
  @Auth()
  @UseInterceptors(
    FileInterceptor('picture', {
      dest: '/tmp',
    }),
  )
  async create(
    @Body() event: CreateEventDto,
    @UploadedFile() picture: Express.Multer.File,
    @User() author: UserEntity,
  ) {
    const result = await this.eventsService.create(event, picture, author);
    return { event: result };
  }
}
