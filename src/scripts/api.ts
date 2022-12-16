import z from 'zod';
import { panic, switcher } from './utils';

const { BDH_API_URL, TWITTER_API_URL, TWITTER_BEARER_TOKEN } = import.meta.env;

/** Gets the current play count from the Beter dan Hugo API. */
export const getPlayCount = async (): Promise<number> => {
  const result = await fetch(BDH_API_URL).then((response) => response.json());
  const schema = z.object({ count: z.string() });
  return parseInt(schema.parse(result).count);
};

/** Gets the current Nieuw in de Kamer follower count from the Twitter API. */
export const getFollowers = async (): Promise<number> => {
  const headers = { Authorization: TWITTER_BEARER_TOKEN };
  const result = await fetch(TWITTER_API_URL, { headers }).then((response) => response.json());
  const schema = z.object({ data: z.object({ public_metrics: z.object({ followers_count: z.number() }) }) });
  return schema.parse(result).data.public_metrics.followers_count;
};

/** Gets statistic for a given project, and panics if none found. */
export const getProjectStat = (slug: string) =>
  switcher(slug, {
    beterdanhugo: getPlayCount(),
    nieuwindekamer: getFollowers(),
  }) ?? panic(`No statistic for project '${slug}'.`);
