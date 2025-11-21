import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { createFileInterceptor } from './interceptors/file.interceptor';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

  @Post()
  @UseInterceptors(
    createFileInterceptor({
      fieldName: 'file',
      allowedMimeTypes: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'video/mp4',
        'video/webm',
      ],
      maxSizeMb: 50,
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    const idx = file.path.lastIndexOf('uploads');
    const publicPath =
      idx !== -1 ? '/' + file.path.slice(idx).replace(/\\/g, '/') : null;

    const url = this.configService.get('app').url + publicPath;
    return { url };
  }
}
