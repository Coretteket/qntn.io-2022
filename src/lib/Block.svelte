<script>
  export let id, background, corners, size, onClick;
  $: radius = corners.map((i) => (i ? '50%' : '0')).join(' ');
</script>

<div style:background style:width={size + 'vh'} style:border-radius={radius} on:mouseover={onClick} on:focus={onClick} />

<style>
  div {
    transition: background 1s ease, border-radius 0.5s ease;
    position: relative;
    vertical-align: top;
    aspect-ratio: 1;
    /* display: inline-block; */
    float: right;
  }
</style>
