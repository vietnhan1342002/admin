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
  author?: {
    id: string;
    name: string;
    email: string;
  };

  createdAt: Date;
  updatedAt: Date;
}
