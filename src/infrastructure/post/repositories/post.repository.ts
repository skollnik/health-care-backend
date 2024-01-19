import { Injectable } from '@nestjs/common';
import { IPostRepository } from 'src/domain/post/interfaces/post-repository.interface';
import { Post } from 'src/domain/post/model/post';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PostMapperFactory } from '../factories/post-mapper.factory';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postMapperFactory: PostMapperFactory,
  ) {}

  async create({ doctorId, imgUrl, title, body }: Post): Promise<Post> {
    const saved = await this.prisma.postEntity.create({
      data: {
        doctorId,
        imgUrl,
        title,
        body,
      },
      include: {
        doctor: true,
      },
    });

    return this.postMapperFactory.fromEntity(saved);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.postEntity.findMany({
      include: {
        doctor: true,
      },
      orderBy: { id: 'desc' },
    });

    return posts.map((post) => this.postMapperFactory.fromEntity(post));
  }
}
