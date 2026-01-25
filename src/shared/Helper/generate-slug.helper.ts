import slugify from 'slugify';

export function generateSlug(name: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const slug: string = slugify(name, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  }) as string;

  return slug;
}
