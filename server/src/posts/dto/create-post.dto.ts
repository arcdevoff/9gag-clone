import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

const isDev = process.env.NODE_ENV === 'development';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt({ message: 'Please select a topic' })
  topicId: number;

  @IsOptional()
  @IsString()
  @IsUrl(
    {
      require_tld: !isDev,
    },
    { message: 'image must be a valid URL' },
  )
  image?: string;

  @IsOptional()
  @IsString()
  @IsUrl(
    {
      require_tld: !isDev,
    },
    { message: 'video must be a valid URL' },
  )
  video?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => v.toLocaleLowerCase()) : value,
  )
  tags?: string[];
}
