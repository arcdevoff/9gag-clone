import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(280)
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
