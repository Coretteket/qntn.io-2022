<div class="block">
  <div class="t1">Had jij het beter gedaan dan Hugo de Jonge? Check het met dit ludieke spel</div>
  <div class="t2">
    nos stories<br />
    Een half jaar lang was Quinten avonden bezig om de game te bouwen. Om 'm te maken, heeft hij naar
    allerlei data van de eerste coronagolf gekeken.<br />
    428.2k views
  </div>
  <div class="t3">Kun jij beter beleid maken dan Hugo de Jonge? Online-spel is een hit</div>
  <div class="t4">Quinten (17) maakte game om te testen of jij het beter kan dan Hugo de Jonge</div>
</div>

<style>
  .block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    height: 85%;
    width: 90%;
    @media (--md) {
      grid-template-columns: 4fr 4fr 1fr;
      grid-template-rows: 1fr 5fr 5fr;
    }
  }

  .block div {
    border: 2px solid --ntrl-40;
    padding: 0.8rem;
    /* font-size: 0.95rem; */
    line-height: 1.1;
    border-radius: --radius;
    background-color: --ntrl-60;
  }

  .t1 {
    visibility: hidden;
    @media (--md) {
      visibility: visible;
      grid-area: 2 / 1 / 3 / 2;
    }
  }

  .t2 {
    grid-area: 1 / 1 / 2 / 3;
    @media (--md) {
      grid-area: 1 / 2 / 3 / 4;
    }
  }

  .t3 {
    grid-area: 2 / 1 / 3 / 2;
    @media (--md) {
      grid-area: 3 / 1 / 4 / 2;
    }
  }

  .t4 {
    grid-area: 2 / 2 / 3 / 3;
    @media (--md) {
      grid-area: 3 / 2 / 4 / 3;
    }
  }
</style>
