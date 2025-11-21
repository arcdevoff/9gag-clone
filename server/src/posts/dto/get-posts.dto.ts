import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetPostsDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  topicId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;

  @IsOptional()
  @IsString()
  tagName?: string;
}
