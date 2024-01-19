import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostCommand } from 'src/application/post/commands/create-post/create-post.command';
import { GetAllPostsQuery } from 'src/application/post/queries/get-all-posts/get-all-posts.query';
import { UserRole } from 'src/domain/auth/role.enum';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqWithUser, RolesGuard } from '../auth/guards/roles.guard';
import { NewPostDto } from './dto/new-post.dto';
import { PostPresenter } from './presenters/post.presenter';

@Controller('post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getPosts() {
    const posts = await this.queryBus.execute(new GetAllPostsQuery());
    return posts.map((post) => new PostPresenter(post));
  }

  @Roles(UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async newPost(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() { title, body }: NewPostDto,
    @Req() { user }: ReqWithUser,
  ) {
    const post = await this.commandBus.execute(
      new CreatePostCommand(user.doctor.id, file, title, body),
    );

    return new PostPresenter(post);
  }
}
