import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from 'generated/prisma';
import { JwtPayload } from 'src/@types/auth';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Topic[]> {
    return this.prisma.topic.findMany();
  }

  findBySlug(slug: string) {
    return this.prisma.topic.findUnique({
      where: {
        slug,
      },
    });
  }

  create(dto: CreateTopicDto): Promise<Topic> {
    return this.prisma.topic.create({
      data: {
        ...dto,
      },
    });
  }

  follow(user: JwtPayload, topicId: number) {
    return this.prisma.userTopicFollow.upsert({
      where: {
        userId_topicId: {
          userId: user.id,
          topicId,
        },
      },
      create: {
        userId: user.id,
        topicId,
      },
      update: {},
    });
  }

  unfollow(user: JwtPayload, topicId: number) {
    return this.prisma.userTopicFollow.delete({
      where: {
        userId_topicId: {
          userId: user.id,
          topicId,
        },
      },
    });
  }
}
