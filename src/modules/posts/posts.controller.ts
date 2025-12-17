import { Controller, Get, Param, Query } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/response-post.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PostFilterDto } from './dto/filter-post.dto';

@Controller('posts')
export class PostsController extends BaseController<
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto
> {
  constructor(private readonly postService: PostsService) {
    super(postService);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: PostFilterDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
