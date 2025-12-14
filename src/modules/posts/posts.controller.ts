import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/response-post.dto';

@Controller('posts')
export class PostsController extends BaseController<
  Post,
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto
> {
  constructor(private readonly postService: PostsService) {
    super(postService);
  }
}
