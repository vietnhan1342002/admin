import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { AuditableBaseService } from 'src/common/base/base.auditableService';
import { UserContextService } from 'src/common/base/user.context';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { PostResponseDto } from './dto/response-post.dto';
import { PostMapper } from './mapper/post.mapper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';

@Injectable()
export class PostsService extends AuditableBaseService<
  Post,
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto
> {
  constructor(
    private readonly repo: PostRepository,
    userContext: UserContextService,
    mapper: PostMapper,
  ) {
    super(repo, userContext, mapper);
  }

  /**
   * Hook trước khi tạo post
   */
  protected async beforeCreate(data: CreatePostDto): Promise<void> {
    const existed = await this.repo.findBySlug(data.slug);
    if (existed) {
      throw new ConflictException(
        buildCrudMessage(Resource.POST, CrudAction.ALREADY_EXISTS),
      );
    }
  }

  /**
   * Hook trước khi update post
   */
  protected async beforeUpdate(id: string, data: UpdatePostDto): Promise<void> {
    const post = await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.POST, CrudAction.NOT_FOUND),
    );

    // Nếu update slug → phải check unique
    if (data.slug && data.slug !== post.slug) {
      const existed = await this.repo.findBySlug(data.slug);
      if (existed) {
        throw new ConflictException(Resource.POST, CrudAction.ALREADY_EXISTS);
      }
    }
  }

  /**
   * Hook trước khi delete (soft delete)
   */
  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.POST, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
    // Ví dụ: không cho xóa post đã publish
    // if (post.status === PostStatus.PUBLISHED) {
    //   throw new BadRequestException('Cannot delete published post');
    // }
  }

  /**
   * Ví dụ custom business method (ngoài CRUD)
   */
}
