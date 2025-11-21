import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtPayload } from 'src/@types/auth';
import { GetPostsDto } from './dto/get-posts.dto';
import { VotePostDto } from './dto/vote-post.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreatePostDto, user: JwtPayload) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        image: dto.image,
        video: dto.video,
        author: {
          connect: { id: user.id },
        },
        topic: {
          connect: { id: dto.topicId },
        },
        tags: dto.tags?.length
          ? {
              connectOrCreate: dto.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      select: {
        id: true,
      },
    });
  }

  async findPopular(dto: GetPostsDto) {
    const { page, limit, topicId, tagName, userId } = dto;
    const skip = (page - 1) * limit;

    const hours = this.configService.get('feed').popularPostsHours;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const count = await this.prisma.post.count({
      where: {
        tags: { ...(tagName ? { some: { name: tagName } } : undefined) },
        topicId: topicId ?? undefined,
        authorId: userId ?? undefined,
        createdAt: { gte: since },
      },
    });

    const posts = await this.prisma.post.findMany({
      where: {
        tags: { ...(tagName ? { some: { name: tagName } } : undefined) },
        topicId: topicId ?? undefined,
        authorId: userId ?? undefined,
        createdAt: { gte: since },
      },
      include: {
        tags: { select: { name: true } },
        topic: true,
        author: { select: { username: true } },
        votes: true,
      },
      skip,
      take: limit,
    });

    const sorted = posts.sort(
      (a, b) =>
        b.votes.filter((v) => v.type === 'like').length -
        a.votes.filter((v) => v.type === 'like').length,
    );

    const pages = Math.ceil(count / limit);
    const nextPage = page + 1 > pages ? null : page + 1;

    return { data: sorted, nextPage };
  }

  async findNew(dto: GetPostsDto) {
    const { page, limit, topicId, tagName, userId } = dto;
    const skip = (page - 1) * limit;

    const count = await this.prisma.post.count({
      where: {
        tags: { ...(tagName ? { some: { name: tagName } } : undefined) },
        topicId: topicId ?? undefined,
        authorId: userId ?? undefined,
      },
    });

    const posts = await this.prisma.post.findMany({
      where: {
        topicId: topicId ?? undefined,
        authorId: userId ?? undefined,
        tags: { ...(tagName ? { some: { name: tagName } } : undefined) },
      },
      orderBy: {
        id: 'desc',
      },
      skip,
      take: limit,
      include: {
        tags: { select: { name: true } },
        author: { select: { username: true } },
        topic: true,
        votes: true,
      },
    });

    const pages = Math.ceil(count / limit);
    const nextPage = page + 1 > pages ? null : page + 1;

    return { data: posts, nextPage };
  }

  async findById(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            username: true,
          },
        },
        topic: true,
        votes: true,
      },
    });
  }

  async vote(dto: VotePostDto, postId: number, user: JwtPayload) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_postId: {
          postId,
          userId: user.id,
        },
      },
    });

    if (existingVote && existingVote.type === dto.type) {
      await this.prisma.vote.delete({
        where: {
          userId_postId: {
            postId,
            userId: user.id,
          },
        },
      });
    } else {
      await this.prisma.vote.upsert({
        where: {
          userId_postId: {
            postId,
            userId: user.id,
          },
        },
        update: {
          type: dto.type,
        },
        create: {
          userId: user.id,
          postId,
          type: dto.type,
        },
      });
    }
  }

  async delete(postId: number, user: JwtPayload) {
    await this.prisma.post.delete({
      where: {
        id: postId,
        authorId: user.id,
      },
    });
  }
}
