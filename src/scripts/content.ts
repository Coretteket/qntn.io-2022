import { Locale, locales, matchLocale } from './types';
import type { MarkdownInstance } from 'astro';
import { z } from 'zod';

const datify = (d: unknown) => (typeof d === 'string' ? new Date(d) : d);
const contentSchema = z.object({ title: z.string(), raw: z.string() });
const blogSchema = contentSchema.extend({ date: z.preprocess(datify, z.date()).transform((d) => d.toString()) });
const projectSchema = blogSchema.extend({ stat: z.string() });

export type Frontmatters = {
  pages: z.infer<typeof contentSchema>;
  blog: z.infer<typeof blogSchema>;
  project: z.infer<typeof projectSchema>;
};

export type Frontmatter = Frontmatters[keyof Frontmatters];
export type MD<T extends keyof Frontmatters> = MarkdownInstance<Frontmatters[T]>;

/** Parses and error logs content frontmatter according to schema. */
export const parseContent = <T extends Record<string, any>>(post: MarkdownInstance<T>, meta = getContentMeta(post)) => {
  z.setErrorMap((_, ctx) => ({ message: ctx.defaultError + ` on '${meta.path}'` }));
  if (meta.type === 'blog') return blogSchema.parse(post.frontmatter);
  if (meta.type === 'project') return projectSchema.parse(post.frontmatter);
  return contentSchema.parse(post.frontmatter);
};

/** Gets useful meta-information about content. */
export const getContentMeta = <T extends Record<string, any>>(content: MarkdownInstance<T>) => {
  const [slug, loc] = content.file.replace(/.*\/(.+)\.mdx*/, '$1').split('.');
  const path = content.file.replace(/.*\/content\/(.+).[a-z]{2}\.mdx*/, '$1').replace('pages/', '');
  const type = content.file.replace(/.*\/content\/(.+)\/.*\.mdx*/, '$1');
  const locale = matchLocale(loc) ?? undefined;
  return { path, slug, locale, type };
};

/** Takes content and returns paths for all localizations, and checking frontmatter. */
export const getContentPaths = async (posts: Record<string, any>[]) => {
  const paths = (posts as MD<'pages'>[]).map((post) => {
    const meta = getContentMeta(post);
    parseContent(post, meta); // error boundary
    const { locale, path: content } = meta;
    return { params: { locale, content }, props: { post, meta } };
  });

  paths.forEach((post) => {
    const otherLocales = locales.filter((l) => l !== post.params.locale);
    otherLocales.forEach((locale) => {
      if (!paths.find(({ params: p }) => p.locale === locale && p.content === post.params.content)) {
        paths.push({ params: { ...post.params, locale }, props: post.props });
      }
    });
  });

  return paths;
};

export type Paths = Awaited<ReturnType<typeof getContentPaths>>[number];

/** Gets date of content in various types. */
export const getContentDate = <T extends Record<string, any>>(post: MarkdownInstance<T>) => {
  if (!post.frontmatter.date) return;
  const rawDate = new Date(post.frontmatter.date);
  const numDate = rawDate.valueOf();
  const formattedDate = (locale: Locale) => rawDate.toLocaleDateString(locale, { dateStyle: 'medium' });
  return { rawDate, numDate, formattedDate };
};

/** Sorts blog posts by date, and returns the first `num` (defaults to all). */
export const sortContent = <T extends Record<string, any>>(content: MarkdownInstance<T>[], num?: number) => {
  return content.sort((a, b) => getContentDate(b)!.numDate - getContentDate(a)!.numDate).slice(0, num) as MarkdownInstance<T>[];
};

/** Gets last two pieces of content, prioritising localization, and checking frontmatter. */
export const getFeatured = <T extends Record<string, any>>(content: MarkdownInstance<T>[], locale: Locale) => {
  content.forEach((c) => parseContent(c)); // error boundary
  const parts = content.reduce(([pass, fail], c) => (getContentMeta(c).locale === locale ? [[...pass, c], fail] : [pass, [...fail, c]]), [[], []] as typeof content[]);
  const localized = sortContent(parts[0], 2);
  const unlocalized = sortContent(parts[1], 2).reverse();
  while (localized.length < 2 && unlocalized.length > 0) localized.push(unlocalized.pop()!);
  return localized;
};
