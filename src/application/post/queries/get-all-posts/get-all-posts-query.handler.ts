import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllPostsQuery } from './get-all-posts.query';
import { POST_REPOSITORY } from '../../post.constants';
import { IPostRepository } from 'src/domain/post/interfaces/post-repository.interface';

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsQueryHandler
  implements IQueryHandler<GetAllPostsQuery>
{
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(): Promise<any> {
    const posts = await this.postRepository.findAll();
    return posts;
  }
}
