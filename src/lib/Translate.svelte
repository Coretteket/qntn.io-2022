<script lang="ts">
  import { t } from '../i18n';
  import { page } from '$app/stores';

  export let key: string;
  export let g = false;

  const { routeId } = $page;
  const route = routeId === '' ? 'home' : routeId;
  const prefix = g ? 'menu.' : route + '.';
</script>

{$t(prefix + key)}
