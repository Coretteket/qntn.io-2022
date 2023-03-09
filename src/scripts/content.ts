import { locales, matchLocale } from './types';
import type { MarkdownInstance } from 'astro';
import { state } from './translate';
import config from '#/config';
import type { z } from 'zod';

/** Uses schemas defined in `/content/schemas.ts` to parse frontmatter. */
export const parseContent = <T extends keyof typeof config>(frontmatter: Record<string, any>, type: T) => {
  return config[type].passthrough().parse(frontmatter) as Frontmatter<T>;
};

/** Gets useful meta-information about content. */
export const getContentMeta = <T extends Record<string, any>>(content: MarkdownInstance<T>) => {
  const [slug, loc] = content.file.replace(/.*\/(.+)\.mdx*/, '$1').split('.') as [Slug, string];
  const path = content.file.replace(/.*\/content\/(.+).[a-z]{2}\.mdx*/, '$1').replace('page/', '');
  const type = content.file.replace(/.*\/content\/(.+)\/.*\.mdx*/, '$1') as Collection;
  const locale = matchLocale(loc) ?? 'en';
  return { path, slug, locale, type };
};

/** Gets content of any or a specific collection, and parses it. */
export function getCollection(): Content[];
export function getCollection<T extends Collection>(type: T): Content<T>[];
export function getCollection<T extends Collection>(type?: T) {
  const files = Object.values(import.meta.glob(`/content/*/*.md*`, { eager: true })) as MD<'*'>[];

  const collection = files
    .filter((c) => !c.frontmatter.draft)
    .map((c) => {
      const meta = getContentMeta(c);
      return { ...c, ...meta, frontmatter: parseContent(c.frontmatter, meta.type) };
    });

  if (type === undefined) return collection;

  return collection
    .filter((c) => c.type === type)
    .map((c) => {
      return { ...c, frontmatter: parseContent(c.frontmatter, type) };
    });
}

/** Gets a specific piece of content from a slug and content type. */
export const getEntry = <T extends string, K extends Collection>(slug: T, type: K): Content<K> | (T extends Slug ? never : undefined) => {
  const collection = getCollection(type).filter((c) => (c.slug as string) === slug);
  return collection.find((c) => c.locale === state.locale) ?? collection[0];
};

/** Takes content and returns paths for all localizations, and checking frontmatter. */
export const getContentPaths = async () => {
  const paths = getCollection().map((post) => ({
    params: { locale: post.locale, content: post.path },
    props: { slug: post.slug, type: post.type },
  }));

  paths.forEach((path) => {
    const otherLocales = locales.filter((l) => l !== path.params.locale);
    otherLocales.forEach((locale) => {
      if (!paths.find(({ params: p }) => p.locale === locale && p.content === path.params.content)) {
        paths.push({ params: { ...path.params, locale }, props: path.props });
      }
    });
  });

  return paths;
};

/** Sorts blog posts by date, and returns the first `num` (defaults to all). */
export const sortContent = <T extends Collection>(post: Content<T>[], num?: number) => {
  let content = post.filter((c) => !c.frontmatter.draft);
  content = content.sort((a, b) => b.frontmatter.date!.valueOf() - a.frontmatter.date!.valueOf());
  return content.slice(0, num) as Content<T>[];
};

/** Gets localized content, and falls back to unlocalized content. */
export const getLocalized = <T extends Collection>(content: Content<T>[]) => {
  let localized: Content<T>[] = [];
  content.forEach((c) => c.locale === state.locale && localized.push(c));
  content.forEach((c) => !localized.find((o) => c.slug === getContentMeta(o).slug) && localized.push(c));
  return localized;
};

/** Gets last `num` pieces of content, prioritizing localization, and checking frontmatter. */
export const getLatest = <T extends Collection>(collection: T, num?: number) => {
  const localized = getLocalized(getCollection(collection));
  return sortContent(localized, num);
};

export type MD<T extends Collection | '*'> = MarkdownInstance<Frontmatter<T extends '*' ? Collection : T>>;
export type Content<T extends Collection = Collection> = MD<T> & ReturnType<typeof getContentMeta> & { type: T };
export type Paths = Awaited<ReturnType<typeof getContentPaths>>[number];
export type Slug = string & { __type: 'slug' };
export type Collection = keyof typeof config;
export type Frontmatter<T extends Collection = Collection> = z.infer<typeof config[T]>;
