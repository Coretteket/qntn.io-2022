<script context="module">
  const redir = {
    twitter: 'https://twitter.com/coretteket',
    feit: 'https://docs.google.com/document/d/1UeTlVLlBv6X6TB_nUJgCZukggSW8raRi5yoGkP_IvvY/edit',
  };

  export async function load({ params }) {
    if (params.slug in redir) {
      return { status: 302, redirect: redir[params.slug] };
    } else {
      return { status: 404 };
    }
  }
</script>
