<button type="button" on:click {...$$restProps}><slot /></button>

<style lang="scss">
  button {
    display: flex;
    gap: 0.5rem;
    background: var(--gray-2);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0;
    font: inherit;
    font-weight: 700;
    color: var(--gray-7);
    cursor: pointer;
    height: 2.25rem;
    min-width: 2.25rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      box-shadow: 0 0 0 2px var(--gray-3);
    }
  }
</style>
