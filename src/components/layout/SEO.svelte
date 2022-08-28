<script>
  import dict from '../../i18n/en/home';
  import { page } from '$app/stores';

  const title = `${dict.home.title} ${dict.home.subtitle}`;
  const description = dict.home.intro;
  const url = $page.url.origin;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="abstract" content={description} />
  <meta name="summary" content={description} />
  <meta name="author" content="Quinten Coret" />
  <meta name="url" content={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="{url}/og.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="{url}/og.png" />
</svelte:head>
