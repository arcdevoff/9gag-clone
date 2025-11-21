import { IsEnum, IsNotEmpty } from 'class-validator';
import { VoteTypes } from 'generated/prisma';

export class VotePostDto {
  @IsNotEmpty()
  @IsEnum(VoteTypes)
  type: VoteTypes;
}
