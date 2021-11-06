import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket: string;

  constructor(configService: ConfigService) {
    this.bucket = configService.get('S3_BUCKET_NAME');
    this.s3 = new S3Client({
      region: configService.get('S3_BUCKET_REGION'),
    });
  }

  /* Moves a file to a bucket and returns the file name */
  async moveFileToBucket(
    file: Express.Multer.File,
    directory = '',
  ): Promise<string> {
    try {
      const fileStream = fs.createReadStream(file.path);
      const filename = path.join(directory, file.filename);
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: filename,
          Body: fileStream,
        }),
      );
      return filename;
    } finally {
      await fs.promises.rm(file.path);
    }
  }

  async getFile(filename: string): Promise<Readable | null> {
    try {
      const data = await this.s3.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: filename,
        }),
      );

      return data.Body as Readable;
    } catch (e) {
      return null;
    }
  }
}
