import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { PostsService } from './posts.service';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PostsController],
  providers: [PrismaService, PostsService, OptionalJwtAuthGuard],
})
export class PostsModule {}
