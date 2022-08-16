<div class="tweetcontainer">
  <div class="tweet">
    <slot />
  </div>
</div>

<style>
  .tweetcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tweet {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0.5rem;
    height: 10rem;
    width: 20rem;
  }
</style>
