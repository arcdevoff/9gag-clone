import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser, PublicUser } from 'src/@types/user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Req() req: Request) {
    return this.usersService.findMe(req.user.id);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
