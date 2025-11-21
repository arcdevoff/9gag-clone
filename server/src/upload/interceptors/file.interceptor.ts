import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'crypto';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

interface FileInterceptorOptions {
  fieldName: string;
  allowedMimeTypes: string[];
  maxSizeMb: number;
}

export function createFileInterceptor({
  fieldName,
  allowedMimeTypes,
  maxSizeMb,
}: FileInterceptorOptions) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: (req, file, cb) => {
        try {
          const randomPath = Array.from({ length: 3 })
            .map(() => randomBytes(2).toString('hex'))
            .join('/');

          const uploadPath = join(process.cwd(), 'uploads', randomPath);

          mkdirSync(uploadPath, { recursive: true });

          cb(null, uploadPath);
        } catch (error) {
          cb(error, '');
        }
      },
      filename: (req, file, cb) => {
        const fileExt = extname(file.originalname);
        const fileName = `${randomBytes(4).toString('hex')}${fileExt}`;
        cb(null, fileName);
      },
    }),
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
    fileFilter(req, file, cb) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new BadRequestException('File type not allowed!'), false);
      }

      cb(null, true);
    },
  });
}
