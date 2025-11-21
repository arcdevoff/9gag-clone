import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ConfirmDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  token: string;
}
