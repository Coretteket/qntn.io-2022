<script lang="ts">
  import { t } from '../../i18n';
  import type { Dict } from 'src/scripts/types';

  export let key: keyof Dict;
  export let params: Record<string, string> = {};
</script>

{$t(key, params)}
