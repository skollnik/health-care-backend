import { Inject } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { IImageUploadService } from 'src/application/shared/interfaces/image-upload-service.interface';
import { IMAGE_UPLOAD_SERVICE } from 'src/application/shared/shared.constants';
import { InvalidFileTypeException } from 'src/domain/post/exceptions/invalid-file-type.exception';
import { IPostRepository } from 'src/domain/post/interfaces/post-repository.interface';
import { Post } from 'src/domain/post/model/post';
import { POST_REPOSITORY } from '../../post.constants';
import { CreatePostCommand } from './create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: IPostRepository,
    private readonly eventBus: EventPublisher,
    private readonly eventPublisher: EventBus,
    @Inject(IMAGE_UPLOAD_SERVICE)
    private readonly imageUploadService: IImageUploadService,
  ) {}
  async execute({
    doctorId,
    file,
    title,
    body,
  }: CreatePostCommand): Promise<any> {
    const uploadedImage = await this.imageUploadService
      .uploadImage(file)
      .catch(() => {
        throw new InvalidFileTypeException();
      });

    const post = Post.create({
      doctorId,
      imgUrl: uploadedImage.url,
      title,
      body,
    });

    const createdPost = this.eventBus.mergeObjectContext(
      await this.postRepository.create(post),
    );
    createdPost.commit();

    return createdPost;
  }
}
