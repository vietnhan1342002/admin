import { User } from 'src/modules/users/entities/user.entity';
import { PostCategory, PostStatus } from '../enum/post.enum';

export class PostResponseDto {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  thumbnail?: string;
  status: PostStatus;
  category?: PostCategory;
  views: number;
  publishedAt?: Date;
  author?: User;

  createdAt: Date;
  updatedAt: Date;
}
