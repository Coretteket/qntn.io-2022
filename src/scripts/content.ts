import { locales, matchLocale } from './types';
import type { MarkdownInstance } from 'astro';
import { switcher } from './utils';
import { state } from './translate';
import schemas from '#/schemas';
import type { z } from 'zod';

export const parseContent = <T extends keyof typeof schemas>(frontmatter: Record<string, any>, type: T) => {
  return schemas[type].parse(frontmatter) as Frontmatters[T];
};

export const getCollections = () => {
  const globs = Object.values(import.meta.glob(`/content/*/*.md*`, { eager: true })) as MD<'*'>[];
  return globs.map((collection) => ({
    ...collection,
    ...getContentMeta(collection),
    frontmatter: schemas.pages.passthrough().parse(collection.frontmatter),
  }));
};

export const getCollection = <T extends Collection>(name: T) => {
  return getCollections()
    .filter((collection) => collection.type === name)
    .map((collection) => ({
      ...collection,
      ...getContentMeta(collection),
      type: name,
      frontmatter: parseContent(collection.frontmatter, name),
    }));
};

export const getEntry = <T extends Collection>(slug: string, type?: T) => {
  return getCollections().find((c) => c.slug === slug);
};

/** Gets useful meta-information about content. */
export const getContentMeta = <T extends Record<string, any>>(content: MarkdownInstance<T>) => {
  const [slug, loc] = content.file.replace(/.*\/(.+)\.mdx*/, '$1').split('.');
  const path = content.file.replace(/.*\/content\/(.+).[a-z]{2}\.mdx*/, '$1').replace('pages/', '');
  const type = content.file.replace(/.*\/content\/(.+)\/.*\.mdx*/, '$1') as Collection;
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


/** Gets formatted date of content. */
export const getContentDate = <T extends Collection>(post: MD<T>) => {
  return post.frontmatter.date?.toLocaleDateString(state.locale, { dateStyle: 'medium' });
};

/** Sorts blog posts by date, and returns the first `num` (defaults to all). */
export const sortContent = <T extends Collection>(post: Content<T>[], num?: number) => {
  let content = post.filter((c) => !c.frontmatter.draft);
  if (content.filter((c) => c.frontmatter.date).length === content.length) {
    content = content.sort((a, b) => b.frontmatter.date!.valueOf() - a.frontmatter.date!.valueOf());
  }
  return content.slice(0, num) as Content<T>[];
};

/** Gets localized content, and falls back to unlocalized content. */
export const getLocalized = <T extends Collection>(content: Content<T>[]) => {
  let localized: Content<T>[] = [];
  content.forEach((c) => c.locale === state.locale && localized.push(c));
  content.forEach((c) => !localized.find((o) => c.slug === getContentMeta(o).slug) && localized.push(c));
  return localized;
};

/** Gets last two pieces of content, prioritising localization, and checking frontmatter. */
export const getLatest = <T extends Collection>(collection: T, num?: number) => {
  const localized = getLocalized(getCollection(collection));
  return sortContent(localized, num);
};

export type Content<T extends Collection> = ReturnType<typeof getCollection<T>>[number];
export type Paths = Awaited<ReturnType<typeof getContentPaths>>[number];
export type Collection = keyof typeof schemas;
export type Frontmatters = { [o in Collection]: z.infer<typeof schemas[o]> };
export type Frontmatter = Frontmatters[Collection];
export type MD<T extends Collection | '*'> = MarkdownInstance<Frontmatters[T extends '*' ? Collection : T]>;
