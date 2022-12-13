import { locales, matchLocale } from './types';
import type { MarkdownInstance } from 'astro';
import { switcher } from './utils';
import { state } from './translate';
import schemas from '#/schemas';
import type { z } from 'zod';

export type Collection = keyof typeof schemas;
export type Frontmatters = { [o in Collection]: z.infer<typeof schemas[o]> };
export type Frontmatter = Frontmatters[Collection];
export type MD<T extends Collection | '*'> = MarkdownInstance<Frontmatters[T extends '*' ? Collection : T]>;

export const getCollections = () => {
  const globs = Object.values(import.meta.glob(`/content/*/*.md*`, { eager: true })) as MD<'*'>[];
  return globs.map((glob) => ({
    ...glob,
    ...getContentMeta(glob),
    frontmatter: schemas.pages.passthrough().parse(glob.frontmatter),
  }));
};

export const parseContent = <T extends keyof typeof schemas>(frontmatter: Record<string, any>, type: T) => {
  return schemas[type].parse(frontmatter) as Frontmatters[T];
};

export const glob = <T extends Collection>(name: T) => {
  return switcher<Collection, Record<string, MD<T>>>(name, {
    pages: import.meta.glob(`/content/pages/*.md*`, { eager: true }),
    blog: import.meta.glob(`/content/blog/*.md*`, { eager: true }),
    project: import.meta.glob(`/content/project/*.md*`, { eager: true }),
  })!;
};

export const getCollection = <T extends Collection>(name: T) => {
  return Object.values(glob(name)).map((glob, _, globs) => ({
    ...glob,
    ...getContentMeta(glob),
    frontmatter: parseContent(glob.frontmatter, name),
  }));
};

export type Content<T extends Collection> = ReturnType<typeof getCollection<T>>;

export const getEntry = (slug: string) => {
  return getCollections().find((c) => c.slug === slug);
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
export const getContentPaths = async () => {
  const content = getCollections();

  const paths = content
    .filter((post) => !post.frontmatter.draft)
    .map((post) => {
      return { params: { locale: post.locale, content: post.path }, props: { slug: post.slug } };
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

/** Gets formatted date of content. */
export const getContentDate = <T extends Collection>(post: MD<T>) => {
  return post.frontmatter.date?.toLocaleDateString(state.locale, { dateStyle: 'medium' });
};

/** Sorts blog posts by date, and returns the first `num` (defaults to all). */
export const sortContent = <T extends Collection>(post: Content<T>, num?: number) => {
  let content = post.filter((c) => !c.frontmatter.draft);
  if (content.filter((c) => c.frontmatter.date).length === content.length) {
    content = content.sort((a, b) => b.frontmatter.date!.valueOf() - a.frontmatter.date!.valueOf());
  }
  return content.slice(0, num) as Content<T>;
};

/** Gets localized content, and falls back to unlocalized content. */
export const getLocalized = <T extends Collection>(content: Content<T>) => {
  let [localized, unlocalized]: typeof content[] = [[], []];
  content.forEach((c) => c.locale === state.locale && localized.push(c));
  content.forEach((c) => !localized.find((o) => c.slug === getContentMeta(o).slug) && unlocalized.push(c));
  return [localized, unlocalized];
};

/** Gets last two pieces of content, prioritising localization, and checking frontmatter. */
export const getFeatured = <T extends Collection>(collection:T) => {
  const [localized, unlocalized] = getLocalized(getCollection(collection));
  let featured = sortContent([...localized, ...unlocalized], 2);
  if (state.locale === 'en') featured = sortContent(localized, 2);
  while (featured.length < 2 && unlocalized.length > 0) featured.push(unlocalized.pop()!);
  return featured;
};
