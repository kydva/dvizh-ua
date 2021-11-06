import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Get(':name(*)')
  @Header('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60)
  async getFile(@Param('name') name: string, @Res() res: Response) {
    const data = await this.storageService.getFile(name);
    if (!data) {
      throw new NotFoundException();
    }
    data.pipe(res);
  }
}
