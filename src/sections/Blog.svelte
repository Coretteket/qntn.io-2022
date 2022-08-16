<section id="blog">
  <h2>Some stuff I've written</h2>

  <div class="list">
    <div class="post">
      <h3>How I built this website from scratch</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
    </div>
    <div class="post blue">
      <h3>Beter dan Hugo: Post-Mortem</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
    </div>
    <div class="post yellow">
      <h3>Het parlementair jaar in 2 miljoen woorden</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dicta, ratione laborum ipsum
        saepe inventore quas totam ullam, officiis, architecto quos animi. Modi doloremque nihil cum
        libero, enim iste voluptatibus!
      </p>
    </div>
  </div>
</section>

<style>
  .list {
    display: flex;
    gap: 3rem;

    @media (--MD) {
      flex-direction: column;
    }
  }

  .post {
    width: 100%;
    padding: 2rem;
    min-height: 30rem;
    border-radius: --radius;
  }

  .blue {
    background-color: --blue-10;
  }

  .yellow {
    background-color: --yllw-10;
  }

  h3 {
    font-size: 1.3rem;
  }
</style>
