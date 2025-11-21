import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message:
      'Username can only contain English letters, numbers, and underscores',
  })
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
