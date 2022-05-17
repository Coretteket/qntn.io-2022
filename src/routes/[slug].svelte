<script context="module">
  const redir = {
    twitter: 'https://twitter.com/coretteket',
    github: 'https://github.com/coretteket',
    linkedin: 'https://www.linkedin.com/in/qcoret/',
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
