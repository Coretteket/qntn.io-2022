const { BDH_API_URL, TWITTER_API_URL, TWITTER_BEARER_TOKEN } = import.meta.env;

/** Gets the current play count from the Beter dan Hugo API. */
export const getPlayCount = async (): Promise<number> => {
  const result = await fetch(BDH_API_URL).then((response) => response.json())
  return result.count;
}

/** Gets the current Nieuw in de Kamer follower count from the Twitter API. */
export const getFollowers = async (): Promise<number> => {
  const headers = { Authorization: TWITTER_BEARER_TOKEN };
  const result = await fetch(TWITTER_API_URL, { headers }).then((response) => response.json());
  return result.data.public_metrics.followers_count;
}