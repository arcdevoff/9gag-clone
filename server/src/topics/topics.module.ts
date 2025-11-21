import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { PrismaService } from 'src/prisma.service';
import { TopicsService } from './topics.service';

@Module({
  providers: [PrismaService, TopicsService],
  controllers: [TopicsController],
})
export class TopicsModule {}
