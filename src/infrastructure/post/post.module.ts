import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { POST_REPOSITORY } from 'src/application/post/post.constants';
import { PostRepository } from './repositories/post.repository';
import { PostMapperFactory } from './factories/post-mapper.factory';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { PostController } from './post.controller';
import { CreatePostCommandHandler } from 'src/application/post/commands/create-post/create-post-command.handler';
import { GetAllPostsQueryHandler } from 'src/application/post/queries/get-all-posts/get-all-posts-query.handler';

const commandHandlers: Provider[] = [CreatePostCommandHandler];

const queries: Provider[] = [GetAllPostsQueryHandler];

const events: Provider[] = [];

const providers: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useClass: PostRepository,
  },
  PostMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [PostController],
  providers: [...commandHandlers, ...queries, ...events, ...providers],
  exports: [POST_REPOSITORY],
})
export class PostModule {}
