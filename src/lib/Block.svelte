<script>
  export let id, background, corners, y, onClick;
  $: radius = corners.map((i) => (i ? '50%' : '0')).join(' ');
</script>

<div style:background style:width={100/y+'vh'} style:border-radius={radius} on:mouseover={onClick} on:focus={onClick} />

<style>
  div {
    transition: background 1s ease, border-radius 0.5s ease;
    position: relative;
    display: inline-block;
    vertical-align: top;
    aspect-ratio: 1;
  }
</style>
