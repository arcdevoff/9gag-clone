import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string): Promise<Topic | null> {
    return this.topicsService.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateTopicDto): Promise<Topic> {
    return this.topicsService.create(dto);
  }

  @Post(':id/follow')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  follow(@Req() req: Request, @Param('id') id: string) {
    return this.topicsService.follow(req.user, Number(id));
  }

  @Delete(':id/unfollow')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  unfollow(@Req() req: Request, @Param('id') id: string) {
    return this.topicsService.unfollow(req.user, Number(id));
  }
}
