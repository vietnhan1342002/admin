import { NewsStatus } from '../enum/news-status.enum';

export class IdNameResponseDto {
  id: string;
  name: string | null;
}

export class ResponseNewsDto {
  id: string;
  author: IdNameResponseDto | null;
  title: string;
  shortDesc: string;
  content: string;
  category: IdNameResponseDto | null;
  tags: string[];
  metaTitle: string | null;
  metaDesc: string | null;
  status: NewsStatus;
  thumbnail: string | null;
  view: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
