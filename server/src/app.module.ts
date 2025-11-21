import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TopicsService } from './topics/topics.service';
import { TopicsController } from './topics/topics.controller';
import { TopicsModule } from './topics/topics.module';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    TopicsModule,
    UploadModule,
    PostsModule,
  ],
  providers: [
    PrismaService,
    UsersService,
    TopicsService,
    UploadService,
    PostsService,
  ],
  controllers: [UsersController, TopicsController, UploadController],
})
export class AppModule {}
