import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PostsFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      map((response) => {
        if (response?.data !== undefined) {
          if (Array.isArray(response.data)) {
            return {
              ...response,
              data: response.data.map((post) => this.formatPost(post, user)),
            };
          }

          return {
            ...response,
            data: this.formatPost(response.data, user),
          };
        }

        return this.formatPost(response, user);
      }),
    );
  }

  private formatPost(post: any, user: any) {
    const likes = post.votes.filter((v) => v.type === 'like').length;
    const dislikes = post.votes.filter((v) => v.type === 'dislike').length;

    const vote = user?.id
      ? post.votes.find((v) => v.userId === user.id)?.type
      : null;

    return {
      ...post,
      vote,
      isOwnPost: user?.id === post.authorId,
      votes: { likes, dislikes },
    };
  }
}
