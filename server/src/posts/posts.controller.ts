import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { PostsService } from './posts.service';
import { GetPostsDto } from './dto/get-posts.dto';
import { VotePostDto } from './dto/vote-post.dto';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { PostsFormatInterceptor } from './interceptors/posts-format.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.postsService.create(dto, req.user);
  }

  @Get('/popular')
  @UseGuards(OptionalJwtAuthGuard)
  @UseInterceptors(PostsFormatInterceptor)
  findPopular(@Query() dto: GetPostsDto) {
    return this.postsService.findPopular(dto);
  }

  @Get('/new')
  @UseGuards(OptionalJwtAuthGuard)
  @UseInterceptors(PostsFormatInterceptor)
  findNew(@Query() dto: GetPostsDto) {
    return this.postsService.findNew(dto);
  }

  @Post('/:id/vote')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  vote(
    @Body() dto: VotePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    return this.postsService.vote(dto, id, req.user);
  }

  @Get('/:id')
  @UseGuards(OptionalJwtAuthGuard)
  @UseInterceptors(PostsFormatInterceptor)
  findById(@Param('id', ParseIntPipe) id: number) {
    console.log(new Date(), 'dsds');
    return this.postsService.findById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.postsService.delete(id, req.user);
  }
}
