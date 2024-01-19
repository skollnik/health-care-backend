import { Post } from '../model/post';

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
}
