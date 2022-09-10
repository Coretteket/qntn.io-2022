<script lang="ts">
  import Icon from '@iconify/svelte';

  import language from '@iconify-icons/ion/language';
  import moon from '@iconify-icons/tabler/moon';
  import sun from '@iconify-icons/tabler/sun-high';
  import linkedin from '@iconify-icons/tabler/brand-linkedin';
  import twitter from '@iconify-icons/tabler/brand-twitter';
  import github from '@iconify-icons/tabler/brand-github';
  import telegram from '@iconify-icons/tabler/brand-telegram';

  const icons = { language, moon, sun, linkedin, twitter, github, telegram };

  export let name: keyof typeof icons;
</script>

<Icon icon={icons[name]} {...$$restProps} />
